import React, {useState, useEffect } from 'react'
// import {BrowserRouter} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import Map from './components/map/map'

function App() {

  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
    })
  }, []);

  return (
    <div className='h-full flex-1' style={{ height: '100vh', width: '100vw' }}>
      <Grid container spacing={3}>
          <Map
              setCoordinates={setCoordinates}
              coordinates={coordinates}
          />
      </Grid> 
  </div>
    
  )
}

export default App