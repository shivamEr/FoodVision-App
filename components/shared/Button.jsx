import Colors from '@/shared/Colors'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

export default function Button({ title, onPress, loading = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={{
        padding: 13,
        backgroundColor: Colors.PRIMARY,
        width: "100%",
        borderRadius: 15
      }}>
      {loading ? <ActivityIndicator color={Colors.WHITE} /> :
        <Text style={{
          fontSize: 18,
          color: Colors.WHITE,
          textAlign: "center"
        }}>{title}</Text>
      }
    </TouchableOpacity>
  )
}
