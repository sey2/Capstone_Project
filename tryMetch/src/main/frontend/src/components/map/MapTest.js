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


                    var content = `<div class="card" style="width:150px; height:170px">
                                            <img src= ${mapData[i].img} style="width:150px; height:120px" class="card-img-top" alt="...">
                                            <div class="container">
                                              <p style="font-size:10px;>${mapData[i].city}</p>
                                              <p style="font-size:10px;>${mapData[i].spot}</p>
                                           </div>
                                           </div>`

                    // 마커 위에 커스텀오버레이를 표시합니다
                    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
                    var overlay = new kakao.maps.CustomOverlay({
                        content: content,
                        position: marker.getPosition()
                    });

                    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
                    kakao.maps.event.addListener(marker, 'click', function() {
                        overlay.setMap(kakaoMap);
                    });

                    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
                    function closeOverlay() {
                        setMap(null);
                    }

                    setMap(marker)
                }

                // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
                function makeOverListener(map, marker, infowindow) {
                    return function () {
                        infowindow.open(map, marker);
                    };
                }

                // 인포윈도우를 닫는 클로저를 만드는 함수입니다
                function makeOutListener(infowindow) {
                    return function () {
                        infowindow.close();
                    };
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