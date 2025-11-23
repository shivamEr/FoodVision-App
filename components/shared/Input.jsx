import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function Input({ placeholder, onChangeText, password = false, label }) {
  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>{label}</Text>
      <TextInput placeholder={placeholder}
        secureTextEntry={password}
        onChangeText={(value) => onChangeText(value)}
        style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 10,
          width: "100%",
          paddingVertical: 20,
          fontSize: 18,
          marginTop: 15
        }} />
    </View>
  )
}