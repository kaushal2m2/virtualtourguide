import React from 'react'
import GoogleMapReact from 'google-map-react';

import {marker} from '../../assets';
import mapstyles from './mapstyles';

const Map= ({ setCoordinates, coordinates, curr}) => {
    return (
    <div className='h-full w-[70%]'>
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
            <img src={marker} lat={curr.lat} lng={curr.lng} />
        </GoogleMapReact>
    </div>
    );
}

export default Map;