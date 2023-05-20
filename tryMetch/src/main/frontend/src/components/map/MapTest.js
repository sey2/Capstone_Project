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

    var options = {
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

    navigator.geolocation.getCurrentPosition(success, error, options);

    //처음 지도 그리기
    useEffect(()=>{
        const container = document.getElementById('map');
        const options = { center: new kakao.maps.LatLng(37.5924523515, 127.0406812854) };
        const kakaoMap = new kakao.maps.Map(container, options);

        setMap(kakaoMap)

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

            })
            .catch(error => console.log(error))

    },[])

    return (
        <div
            style={{
                width: '100%',
                display: 'inline-block',
                marginLeft: '5px',
                marginRight: '5px',
            }}
        >
            <div id="map" style={{ width: '99%', height: '1000px' }}></div>
        </div>
    );

};

export default MapTest;