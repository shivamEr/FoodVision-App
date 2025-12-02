import Colors from '@/shared/Colors'
import { Text, TouchableOpacity } from 'react-native'

export default function Button({title, onPress}) {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style = {{
        padding:13,
        backgroundColor:Colors.PRIMARY,
        width:"100%",
        borderRadius:15
    }}>
        <Text style={{
            fontSize:18,
            color:Colors.WHITE,
            textAlign:"center"
        }}>{title}</Text>
    </TouchableOpacity>
  )
}
