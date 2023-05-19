import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MapTest from './components/map/MapTest'

export default function App() {
    const [travelArr, setTravelArr] = useState([])

    useEffect(() => {
        axios.get('/api/map')
            .then(response => setTravelArr(response.data))
            .catch(error => console.log(error))
    }, []);


    return (
        <div>
            <MapTest/>
        </div>
    );
}