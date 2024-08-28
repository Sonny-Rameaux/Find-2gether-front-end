import * as React from 'react';
import { Button, StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [text, onChangeText] = React.useState('');
  const [Toprint, setToprint] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={onChangeText}
        placeholder="username"
      />
      <Button title='Increment' onPress={() => { setToprint(text); navigation.navigate('Details', { userName: text }); }} />
      <Text>{Toprint.toString()}</Text>
    </SafeAreaView>
  );
}

function DetailsScreen({ route, navigation }) {
  const { userName } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome, {userName}!</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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

