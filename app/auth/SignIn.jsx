import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';
import { Link, router } from 'expo-router';
import { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/FirebasConfig';
import { useConvex } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // Access Convex client
    const convex = useConvex();

    // Global user state
    const { setUser } = useContext(UserContext);

    const onSignIn = async () => {
        // Basic frontend validation
        if (!email || !password) {
            Alert.alert("Missing fields!", "Enter all field values!");
            return;
        }

        try {
            // Sign in using Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;
            console.log("User signed in:", user);

            // Fetch the stored user record from Convex
            // Convex uses email to locate the correct user document
            const userData = await convex.query(api.Users.GetUser, {
                email: email
            });

            console.log("Convex signIn:", userData);

            // Save user info in global context
            setUser(userData);
            router.replace('/(tabs)/Home');

            return { success: true, user };
        } catch (error) {
            console.log("Sign-in error:", error.message);

            Alert.alert(
                "Incorrect Email or Password",
                "Please enter a valid email and password."
            );

            return { success: false, error: error.message };
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
