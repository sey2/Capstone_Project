/* global kakao */
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Map.css'
import axios from "axios";

const { kakao } = window;

const MapTest = () => {
    const [map,setMap] = useState(null);
    const [data, setData] = useState([]);

    var curLatLng

    // 마커를 담을 배열입니다
    var markers = [];

    var container
    var options
    var kakaoMap
    var ps


    var option = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(position) {
        console.log('위도 : ' + position.coords.latitude);
        console.log('경도: ' + position.coords.longitude);

        curLatLng = new kakao.maps.LatLng(position.coords.latitude,position.coords.longitude)
    };

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, option);

    //처음 지도 그리기
    useEffect(()=>{
       container = document.getElementById('map');
       options = { center: new kakao.maps.LatLng(37.5924523515, 127.0406812854) };
       kakaoMap = new kakao.maps.Map(container, options);
       setMap(kakaoMap)

        ps = new kakao.maps.services.Places();

        axios.get('/api/map')
            .then(response => {
                setData(response.data)

                const mapData = response.data
                console.log(mapData.length)

                // 카카오맵 마커 표시
                for(let i=0; i<mapData.length; i++){
                    console.log("city: " + mapData[i].city)

                    // 마커가 표시 될 위치
                    let markerPosition = new kakao.maps.LatLng(
                        mapData[i].mapY, mapData[i].mapX
                    )

                    // 마커를 생성
                    let marker = new kakao.maps.Marker({
                        map: kakaoMap,
                        position: markerPosition,
                        title: mapData[i].city,
                    });


                    let cardContainer = document.createElement('div');
                    cardContainer.className = 'card';
                    cardContainer.style.width = '18rem';

                    let cardImage = document.createElement('img');
                    cardImage.className = 'card-img-top';
                    cardImage.src = mapData[i].img;
                    cardImage.alt = 'Card image cap';
                    cardContainer.appendChild(cardImage);

                    let cardBody = document.createElement('div');
                    cardBody.className = 'card-body';
                    cardContainer.appendChild(cardBody);

                    let cityParagraph = document.createElement('p');
                    cityParagraph.className = 'card-text';
                    let cityText = document.createElement('b');
                    cityText.textContent =  mapData[i].city;
                    cityParagraph.appendChild(cityText);
                    cardBody.appendChild(cityParagraph);

                    let spotParagraph = document.createElement('p');
                    spotParagraph.className = 'desc-text';
                    spotParagraph.textContent = '주소: ' + mapData[i].spot;
                    cardBody.appendChild(spotParagraph);

                    let bottomItem = document.createElement('div')
                    bottomItem.className = 'bottom-item'

                    let telParagraph = document.createElement('p');
                    telParagraph.className = 'desc-text-tel';

                    if(mapData[i].tel === "")
                        telParagraph.textContent = '번호: 없음 ';
                    else
                        telParagraph.textContent = '번호: ' +mapData[i].tel;

                    // cardBody.appendChild(telParagraph);
                    cardBody.appendChild(bottomItem)
                    bottomItem.appendChild(telParagraph)

                    let closeButton = document.createElement('button');
                    closeButton.className = 'btn';
                    closeButton.textContent = '닫기';
                    closeButton.onclick = function(){
                        overlay.setMap(null);
                    };
                    // cardBody.appendChild(closeButton);
                    bottomItem.appendChild(closeButton)



                    // 마커 위에 커스텀오버레이를 표시합니다
                    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
                    let overlay = new kakao.maps.CustomOverlay({
                        content: cardContainer,
                        position: marker.getPosition()
                    });

                    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
                    kakao.maps.event.addListener(marker, 'click', function() {
                        overlay.setMap(kakaoMap);
                    });

                    setMap(marker)
                }

                kakaoMap.panTo(curLatLng)

                // 키워드로 장소를 검색합니다
                searchPlaces();
            })
            .catch(error => console.log(error))

    },[])

    return (
        <div id="map_wrap"
            style={{
                width: '100%',
                display: 'inline-block',
                marginLeft: '5px',
                marginRight: '5px',
            }}
        >
            <div id="map" style={{ width: '99%', height: '1000px' }}></div>

            <div id="menu_wrap" className="bg_white">
                <div className="option">
                    <div>
                        <form onSubmit={searchPlaces} return={false}>
                            검색 <input type="text" value="이태원 맛집" id="keyword" size="15"/>
                            <button type="submit" className="search-btn"> 검색하기 </button>
                        </form>
                    </div>
                </div>
                    <ul id="placesList"></ul>
                    <div id="pagination"></div>
            </div>
        </div>
    );

    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces() {

       // var keyword = document.getElementById('keyword').value;

        // if (!keyword.replace(/^\s+|\s+$/g, '')) {
        //     alert('키워드를 입력해주세요!');
        //     return false;
        // }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch( '홍대', placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {

            // // 정상적으로 검색이 완료됐으면
            // // 검색 목록과 마커를 표출합니다
             displayPlaces(data);

            // // 페이지 번호를 표출합니다
             displayPagination(pagination);

            console.log(data)

        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

            alert('검색 결과가 존재하지 않습니다.');
            return;

        } else if (status === kakao.maps.services.Status.ERROR) {

            alert('검색 결과 중 오류가 발생했습니다.');
            return;

        }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {

        var listEl = document.getElementById('placesList'),
            menuEl = document.getElementById('menu_wrap'),
            fragment = document.createDocumentFragment(),
            bounds = new kakao.maps.LatLngBounds(),
            listStr = '';

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for ( var i=0; i<places.length; i++ ) {

            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                marker = addMarker(placePosition, i),
                itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        kakaoMap.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {

        var el = document.createElement('li'),
            itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

        if (places.road_address_name) {
            itemStr += '    <span>' + places.road_address_name + '</span>' +
                '   <span class="jibun gray">' +  places.address_name  + '</span>';
        } else {
            itemStr += '    <span>' +  places.address_name  + '</span>';
        }

        itemStr += '  <span class="tel">' + places.phone  + '</span>' +
            '</div>';

        el.innerHTML = itemStr;
        el.className = 'item';

        return el;
    }

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions =  {
                spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage
            });

        marker.setMap(kakaoMap); // 지도 위에 마커를 표출합니다
        markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
        for ( var i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
        var paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild (paginationEl.lastChild);
        }

        for (i=1; i<=pagination.last; i++) {
            var el = document.createElement('a');
            el.href = "#";
            el.innerHTML = i;

            if (i===pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function(i) {
                    return function() {
                        pagination.gotoPage(i);
                    }
                })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    }


    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
            el.removeChild (el.lastChild);
        }
    }

};

export default MapTest;