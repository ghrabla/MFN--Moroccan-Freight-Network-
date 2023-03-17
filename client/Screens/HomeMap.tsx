import {View, StyleSheet, Button, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWVkb3gtcyIsImEiOiJjbGV5NGo3Z2cwOWQxM3lvNTRwOXh0N2NlIn0.0LJp5QXaKFxIhb4gMqmXag',
);
const HomeMap = ({navigation}: any) => {
  const initialCamera = {
    centerCoordinate: [-9.2353665, 32.2935008], // San Francisco
    zoomLevel: 4,
  };
  const isFocused = useIsFocused();
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    getAllCompanies();
    requestLocationPermission();
  }, []);


  const getAllCompanies = async () => {
    setCompanies([]);
    await axios('http://192.168.9.25:3000/users')
      .then(res => {
        if (res.data) {
          res.data.users.map((element: any) =>
            setCompanies(prevState => [...prevState, element]),
          );
        }
      })
      .catch(err => console.log(err.message));
  };

  // if (isFocused) {
  //   getAllCompanies()
  // }

  const getUserPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true},
    );
  };
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to show your current location on the map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted.');
        getUserPosition();
      } else {
        console.log('Location permission denied.');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  const handleMapLongPress = (event: any) => {
    console.log(event.geometry.coordinates);
  };
  return (
    <View>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} onLongPress={handleMapLongPress}>
          <MapboxGL.Camera {...initialCamera} />
          {companies?.map((company:any,index) => (
            <MapboxGL.PointAnnotation
              id={company._id}
              key={index}
              coordinate={[company.coords[0].lang, company.coords[0].lat]}>
              <MapboxGL.Callout style={styles.callout}>
                <View>
                  <Text style={styles.companyName}>
                    Name : {company.STE}
                  </Text>
                  <Text style={styles.companyInfo}>
                    Manager:{company.Manager}
                  </Text>
                  <Text style={styles.companyInfo}>
                    NUM:{company.NUM}
                  </Text>
                </View>
              </MapboxGL.Callout>
            </MapboxGL.PointAnnotation>
          ))}
        </MapboxGL.MapView>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CompaniesList')}>
              <Text style={styles.buttonText}>Companies list</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '90%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
  },
  button: {
    backgroundColor: '#008080',
    borderRadius: 10,
    marginTop:6,
    paddingVertical: 12,
    width:'50%',
    alignSelf:'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  callout: {
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyInfo: {
    fontSize: 16,
    color: 'grey',
  },
});
