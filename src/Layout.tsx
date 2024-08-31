import React, { useState } from 'react';
import { Button, Text, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';

type RootStackParamList = {
  Login: undefined;
  Home: { userName: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  return <Stack/>;
}