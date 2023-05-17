import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MapTest from './components/map/MapTest'

export default function App() {
    const [hello, setHello] = useState('')
    const [travelArr, setTravelArr] = useState([])

    useEffect(() => {
        axios.get('/api/hello')
            .then(response => setHello(response.data))
            .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        axios.get('/api/map')
            .then(response => setTravelArr(response.data))
            .catch(error => console.log(error))
    }, []);


    return (
        <div>
            <MapTest/>

            백엔드에서 가져온 데이터입니다 : {hello}
        </div>
    );
}