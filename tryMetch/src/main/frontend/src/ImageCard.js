import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Row, Col } from 'react-bootstrap';

function ImageCard({ onImageClick }) {
    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [randomOrder, setRandomOrder] = useState([]);

    useEffect(() => {
        axios.get('/api/map')
        .then(response => {
            setMapData(response.data);
            setLoading(false); // 데이터 로딩이 완료되면 로딩 상태 변경
        })
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (!loading && mapData.length > 0) {
        const order = generateRandomOrder(mapData.length);
        setRandomOrder(order);
        }
    }, [loading, mapData]);

    const generateRandomOrder = (length) => {
        const order = [];
        for (let i = 0; i < length; i++) {
        order.push(i);
        }
        return shuffleArray(order);
    };

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    return (
        <div className="container mt-5 mb-5">
        <Row>
            {mapData.length > 0 && !loading ? (
            randomOrder.map((index) => {
                const data = mapData[index];
                return (
                <Col key={index} md={4} sm={12} className="mb-4">
                    <div className="card card-img-brightness card-img-hover" onClick={() => onImageClick(data.city)}>
                    <img src={data.img} className="rounded mx-auto d-block" alt="..." />
                    {data.city}
                    </div>
                </Col>
                );
            })
            ) : (
                <Spinner animation="border" role="status" className="spinner-display">
                <span className="visually-hidden spinner-display">Loading...</span>
                </Spinner>
            )}
        </Row>
        </div>
    );
}

export default ImageCard;
