import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, MarkerClustererF } from '@react-google-maps/api';
import { db } from '../../firebaseConfig';
import { ref, set, onValue, remove, update } from 'firebase/database';
import Button from '../../components/Button/Button';
import './style.css';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MapLocation() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetchMarkers();
  }, []);

  const fetchMarkers = async () => {
    const markersRef = ref(db, "markers");
      onValue(markersRef, (snapshot) => {
      const newMarkers = [];
      snapshot.forEach(childSnapshot => {
        const markerData = childSnapshot.val();
        newMarkers.push({
          position: markerData.position,
          id: childSnapshot.key
        });
      });
      setMarkers(newMarkers);
    });
  };

  const handleMapClick = async (event) => {
    const newMarkerRef = ref(db, `markers/${Date.now()}`);
    const timestamp = new Date().toISOString();
    const newMarker = {
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      timestamp: timestamp
    };
    await set(newMarkerRef, newMarker);
  };

  const updateMarkerPosition = async (markerId, newPosition) => {
    const markerRef = ref(db, `markers/${markerId}`);
    await update(markerRef, { position: newPosition });
  };

  const removeMarker = async (markerId) => {
    await remove(ref(db, `markers/${markerId}`));
  };

  const removeAllMarkers = async () => {
    const markersRef = ref(db, "markers");
    await remove(markersRef);
    setMarkers([]);
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyC9NgjahFNUuA54P3KU3rD_T-IC4h85SCA">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onClick={handleMapClick}>
          { markers.length > 0 && <MarkerClustererF>
            {(clusterer) =>
              markers?.map((marker, index) => (
                <MarkerF 
                  key={marker?.id}
                  clusterer={clusterer}
                  label={String(index + 1)}
                  position={marker?.position}
                  draggable={true}
                  onDragEnd={(event) => {
                    const updatedPosition = {
                      lat: event.latLng.lat(),
                      lng: event.latLng.lng()
                    };
                    updateMarkerPosition(marker?.id, updatedPosition);
                  }}
                  onClick={() => removeMarker(marker?.id)}
                />
              ))
            }
            </MarkerClustererF> 
          }

          <div className='button-container'>
            <Button onClick={removeAllMarkers} className="map-location-button" content="Delete all markers" />
          </div>
        </GoogleMap>
      </LoadScript>
              
    </div>
  );
}

export default MapLocation;