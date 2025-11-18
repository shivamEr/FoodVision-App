import { View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';
import { Link } from 'expo-router';
import { useState } from 'react';

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onSignIn = () => {
        if (!email || !password) {
            Alert.alert("Missing fields!", "Enter All field Value!");
            return;
        }
    };

    return (
        <View style={styles.container}>

            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
            />

            <Text style={styles.title}>Welcome Back</Text>

            <View style={styles.inputContainer}>
                <Input placeholder="Email" onChangeText={setEmail} />
                <Input placeholder="Password" onChangeText={setPassword} password={true} />
            </View>

            <View style={styles.actionContainer}>
                <Button title="Sign In" onPress={onSignIn} />

                <View style={styles.row}>
                    <Text style={styles.text}>Don't have an account?</Text>
                    <Link href={"/auth/SignUp"}>
                        <Text style={styles.link}> Create New Account</Text>
                    </Link>
                </View>
            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 60,
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        marginTop: 10,
    },
    inputContainer: {
        marginTop: 20,
        width: "100%",
    },
    actionContainer: {
        marginTop: 15,
        width: "100%",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
    text: {
        fontSize: 14,
        color: "#555",
    },
    link: {
        fontSize: 14,
        color: "#007AFF",
        fontWeight: "600",
    }
});
