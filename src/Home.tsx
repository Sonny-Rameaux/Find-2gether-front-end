import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {markers} from './Markers'
type RootStackParamList = {
  Login: undefined;
  Home: { userName: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ route, navigation }: Props) {
  const { userName } = route.params;
  
  const [region, setRegion] = useState<Region>({
    latitude: 47.316666, // Valeurs par défaut
    longitude: 5.016667,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 2,
        longitudeDelta: 2,
      });
    };

    getLocation();
    navigation.setOptions({ title: `Welcome, ${userName}` });
  }, [navigation, userName]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation
        >
          {markers.map((marker, index) =>(
            <Marker key={index} coordinate={marker}>

            </Marker>
          )
          )}
        </MapView>
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
  map: {
    width: '100%',
    height: '100%',
  },
});
