// screens/HomeScreen.tsx
import React, { useState } from 'react';
import { Button, TextInput, SafeAreaView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: { userName: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [userName, onChangeName] = useState<string>('');
  const [passWord, onChangePW] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const postRegisterRequest = async (username: String, password: String) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      navigation.navigate('Login');
      return data; // You can return this to further use in your app
    } catch (error) {
      setErrorMessage('Error in registration: ' + error);
      // Handle error here, for example by showing an error message to the user
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
    {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={onChangeName}
        placeholder="username"
      />
      <TextInput
        style={styles.input}
        value={passWord}
        onChangeText={onChangePW}
        placeholder="password"
      />
      <Button
        title="register"
        onPress={() => {
          postRegisterRequest(userName, passWord);
          onChangeName('');
        }}
      />
      <Button
        title="connect"
        onPress={() => {
          navigation.navigate('Login');
          onChangeName('');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  errorText: {
    color: 'red',  // Style du texte d'erreur en rouge
    marginBottom: 20,
  },
});

export default RegisterScreen;
