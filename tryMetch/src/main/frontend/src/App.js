import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MapTest from './components/map/MapTest'

export default function App() {
    const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
            .then(response => setHello(response.data))
            .catch(error => console.log(error))
    }, []);


    return (
        <div>
            <MapTest/>
        </div>
    );
}

export default App;