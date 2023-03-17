import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: handle login logic here
    console.log("dddd");
  };

  return (
    <LinearGradient colors={['#3A83FF', '#4A4AE4']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Welcome back</Text>
          <Image style={styles.logo} source={require('../../utils/images/placeholder.png')}/>
          {/* <Text style={styles.logo}>Logo</Text> */}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.link} onPress={()=>navigation.navigate('Register')}>
          <Text style={styles.buttonLink}>Don't have an Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
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
  button: {
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#3A86FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoContainer: {
    width:150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20
  },
  logo:{
    width: 200, 
    height: 200
  },
  link:{
    alignSelf:'flex-end',
    padding:10,
  },
  buttonLink:{
    color:'white',
    textDecorationLine:'underline'
  }
});

export default LoginScreen;
