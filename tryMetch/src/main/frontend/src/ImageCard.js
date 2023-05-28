import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function ImageCard() {
    const [mapData, setMapData] = useState([]);

    useEffect(() => {
        axios.get('/api/map')
            .then(response => {
                setMapData(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className='card-flex'>
                    {mapData.length > 0 ? (
                        mapData.map((data, index) => (
                            <div key={index} className="col-md-3 col-sm-12 card card-img-brightness">
                                <img src={data.img} className="rounded mx-auto d-block" alt="..." />
                                {data.city}
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImageCard;
