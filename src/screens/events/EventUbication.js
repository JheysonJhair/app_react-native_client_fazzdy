import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

function EventUbication({ route }) {
  const { latitude, longitude } = route.params;
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     const getLocationPermission = async () => {
//       try {
//         let permission;

//         if (Platform.OS === 'android') {
//           permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
//         } else {
//           permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
//         }

//         const result = await check(permission);

//         if (result === RESULTS.GRANTED) {
//           getUserLocation();
//         } else {
//           const requestResult = await request(permission);
//           if (requestResult === RESULTS.GRANTED) {
//             getUserLocation();
//           } else {
//             setError('Permiso denegado');
//           }
//         }
//       } catch (err) {
//         console.error('Error checking location permission:', err);
//         setError(err.message);
//       }
//     };

//     const getUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error('Error getting user location:', error);
//           setError(error.message);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     };

//     getLocationPermission();
//   }, []);

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   if (!userLocation) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -13.6394,
        longitude: -72.8814,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}>
    
      <Marker
        coordinate={{ latitude, longitude }}
        title="Event Location"
        description="Ubicación del evento"
        pinColor="blue"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});


export default EventUbication;



