/* global kakao */
import React, { useEffect, useState } from 'react';
import axios from "axios";

const { kakao } = window;

const MapTest = () => {
    const [map,setMap] = useState(null);
    const [data, setData] = useState([]);

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


                    var iwContent = `<div style="padding:5px;"> 제목: ${mapData[i].city} <br>
                                      위치: ${mapData[i].spot}</div> `

                    var infowindow = new kakao.maps.InfoWindow({
                        content: iwContent,
                        xAnchor: 0.3,
                        yAnchor: 0.91,
                    });

                    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
                    // 이벤트 리스너로는 클로저를 만들어 등록합니다
                    // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
                    kakao.maps.event.addListener(
                        marker,
                        "mouseover",
                        makeOverListener(kakaoMap, marker, infowindow)
                    );
                    kakao.maps.event.addListener(
                        marker,
                        "mouseout",
                        makeOutListener(infowindow)
                    );

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