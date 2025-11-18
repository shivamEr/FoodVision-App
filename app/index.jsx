import { Dimensions, Image, Text, View } from "react-native";
import Colors from '../shared/Colors'
import Button from './../components/shared/Button'
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={require('../assets/images/landing.png')} style={{
        width: "100%",
        height: Dimensions.get("screen").height,
      }} />

      <View style={{
        position: "absolute",
        height: Dimensions.get("screen").height,
        backgroundColor: "#0707075e",
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: 20
      }}>

        <Image source={require('../assets/images/logo.png')}
          style={{
            width: 170,
            height: 150,
            marginTop: 160
          }}
        />

        <Text style={{
          fontSize: 30,
          fontWeight: "bold",
          color: Colors.WHITE
        }}>Ai Diet Planner</Text>

        <Text style={{
          textAlign: "center",
          marginHorizontal: 20,
          color: Colors.WHITE,
          fontSize: 20,
          marginTop: 15,
          opacity: 0.8
        }}>
          Craft delecious, Healthy, Mean plans tailored just for you. Achieve your goal with ease!
        </Text>
      </View>

      <View style={{
        position:'absolute',
        width:"100%",
        bottom: 50,
        padding: 20
      }}>
        <Button title={'Get Started'}
        onPress={() => router.push('/auth/SignIn')}
        />
      </View>
    </View>
  );
}
