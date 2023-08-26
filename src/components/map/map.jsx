import React from 'react'
import GoogleMapReact from 'google-map-react';

import mapstyles from './mapstyles';

const Map= ({ setCoordinates, coordinates }) => {
      return (
        <div style={{ height: '100vh', width: '70%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY }}
            defaultCenter={{lat: 0, lng: 0}}
            center={coordinates}
            margin={[50, 50, 50, 50]}
            defaultZoom={14}
            options={{
                disableDefaultUI: true,
                zoomControl: true,
                styles: mapstyles
            }}
            onChange={(e) => {
                setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            }}
          >
            <div
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      );
    }

export default Map;