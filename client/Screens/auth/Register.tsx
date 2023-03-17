import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  PermissionsAndroid,
  ImageBackground,
  ToastAndroid
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import Map from '../../components/MapModal';

interface coodsProps {
  lang: number;
  lat: number;
}
const RegisterScreen = ({navigation}: any) => {
  const handleInputChange = (key: string, value: string) => {
    setFormData({...formData, [key]: value}); // Update the form state with the new input value
  };
  const [modalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    STE: '',
    ICE: '',
    Manager: '',
    NUM: '',
    Password: '',
  });
  const [coords, setCoords] = useState<coodsProps>({lang: 0, lat: 0});

  //////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    console.log('in the Register ', coords);
  }, [coords]);

  useEffect(() => {
    requestLocationPermission();
  }, [isEnabled]);

  const getUserPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCoords({...coords, lat: latitude, lang: longitude});
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
  //////////////////////////////////////////////////////////////////////////////////////
  const updateCoords = (newCoords: coodsProps) => {
    setCoords(newCoords);
  };
  // const
  // const {STE,Manager,NUM,Coords,ICE,Password}=formData

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (!isEnabled) {
      setModalVisible(true);
    }
  };
  ///////////////////////////////////////////////////////////////////////

  const handleRegister = async () => {
    await axios
      .post('http://192.168.9.25:3000/auth/Register', {...formData, coords})
      .then(res => {
        if (res.data) {
          ToastAndroid.showWithGravity(
            'Registred Successfully',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
          );
          navigation.navigate('Home');
        }
      })
      .catch(err =>
        ToastAndroid.showWithGravity(
          `error : ${err.message}`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        )
      );
  };

  return (
    <ImageBackground source={require('../../utils/images/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.title}>Create an account</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="STE"
                value={formData.STE || ''}
                onChangeText={value => handleInputChange('STE', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ICE"
                value={formData.ICE || ''}
                onChangeText={value => handleInputChange('ICE', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Manager"
                value={formData.Manager || ''}
                onChangeText={value => handleInputChange('Manager', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="NUM"
                value={formData.NUM || ''}
                onChangeText={value => handleInputChange('NUM', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Password"
                value={formData.Password || ''}
                onChangeText={value => handleInputChange('Password', value)}
              />
            </View>
            <View
              style={[
                styles.inputContainer,
                // eslint-disable-next-line react-native/no-inline-styles
                isEnabled ? null : {backgroundColor: 'grey'},
              ]}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              {isEnabled ? (
                <Text> Selected position</Text>
              ) : (
                <Text> Current position</Text>
              )}
            </View>

            <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Map
          modalVisible={modalVisible}
          Close={() => setModalVisible(false)}
          Coords={coords}
          updateCoords={updateCoords}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '100%',
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
  },
  button: {
    backgroundColor: '#008080',
    borderRadius: 10,
    width:'100%',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegisterScreen;
