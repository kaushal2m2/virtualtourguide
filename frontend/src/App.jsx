import React, {useState, useEffect } from 'react'
import {BrowserRouter} from 'react-router-dom'
import Map from './components/map/map'
import Guide from './components/guide/guide'

function App() {

  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
  const [curr, setCurr] = useState({lat:0, lng:0});
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCurr({ lat: latitude, lng: longitude });
        setCoordinates({ lat: latitude, lng: longitude });
        console.log("change")
    })
  }, []);

  return (
    <BrowserRouter>
      <div className='relative flex w-screen h-screen'>
        {/* <Map
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            curr={curr}
        /> */}
        < Guide coordinates={coordinates}/>
    </div>
  </BrowserRouter>
    
  )
}

export default App