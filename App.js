import React from 'react';
import { Text, View } from 'react-native';
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/utils/FireBase";




export default function App() {
  return (
    <Navigation/>
  );
}