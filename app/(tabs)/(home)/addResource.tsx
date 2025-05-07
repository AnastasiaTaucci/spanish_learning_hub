import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function AddResource () {
  const router = useRouter();
  
  return (
    <View>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text>addResource</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  backText: {
    fontSize: 16,
    color: '#333',
  },
});
