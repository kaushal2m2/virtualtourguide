import React, {useState, useEffect } from 'react'
import {BrowserRouter} from 'react-router-dom'
import Map from './components/map/map'
import Guide from './components/guide/guide'

function App() {

  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
    })
  }, []);

  return (
    <BrowserRouter>
      <div className='relative flex w-screen h-screen'>
        <Map
            setCoordinates={setCoordinates}
            coordinates={coordinates}
        />
        < Guide />
    </div>
  </BrowserRouter>
    
  )
}

export default App