import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import * as Application from 'expo-application';
import * as SecureStore from 'expo-secure-store';

export default function App() {
  const [uniqueId, setUniqueId] = useState(null);

  useEffect(() => {
    const getOrCreateStableId = async () => {
      try {
        // Try to retrieve the unique ID from SecureStore
        // await SecureStore.deleteItemAsync('uniqueDeviceId');
        let storedUniqueId = await SecureStore.getItemAsync('uniqueDeviceId');
        if (!storedUniqueId) {
          // If no ID is found, create one using Application.androidId or Application.iosIdForVendor
          storedUniqueId = Application.getAndroidId() || Application.getIosIdForVendorAsync()
          console.log(storedUniqueId)
          // Store the generated ID for future use
          await SecureStore.setItemAsync('uniqueDeviceId', storedUniqueId);
        }
        setUniqueId(storedUniqueId);
      } catch (error) {
        console.error("Error generating or retrieving the device ID:", error);
      }
    };

    getOrCreateStableId();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {uniqueId ? (
        <Text>Your Unique Device ID: {uniqueId}</Text>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
}
