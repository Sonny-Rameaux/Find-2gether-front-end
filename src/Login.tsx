// screens/HomeScreen.tsx
import React, { useState } from 'react';
import { Button, Text, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: { userName: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [userName, onChangeName] = useState<string>('');
  const [password, onChangePW] = useState<string>('');


  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={onChangeName}
        placeholder="username"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={onChangePW}
        placeholder="password"
      />
      <Button title='Increment' onPress={() => {
          navigation.navigate('Home', { userName: userName }); 
          onChangeName('');
        }
      } />
    </SafeAreaView>
  );
}

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
});
