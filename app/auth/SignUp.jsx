import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';
import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/FirebasConfig';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';

export default function SignUp({ navigation }) {
    // Local states for form input fields
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // Convex mutation to create user record in database
    const createNewUser = useMutation(api.Users.CreateNewUser);

    // Global user state shared across the app
    const { user, setUser } = useContext(UserContext);

    const onSignUp = async () => {
        // Validate required fields
        if (!name || !email || !password) {
            Alert.alert("Missing fields!", "Enter all field values!");
            return;
        }

        try {
            // 🔹 1. Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;
            console.log("Firebase user created:", user);

            // 🔹 2. If Firebase successful → create user record in Convex DB
            if (user) {
                const result = await createNewUser({
                    name: name,   // Use input name
                    email: email  // Use input email
                });

                console.log("Convex user created:", result);

                // 🔹 3. Store new user in global context
                setUser(result);
                Alert.alert('Success!', 'Registration Completed!')

                // 🔹 4. Navigation to dashboard can go here
                // navigation.navigate("Dashboard");
            }

            return { success: true, user };
        } catch (error) {
            console.log("Signup error:", error.message);
            return { success: false, error: error.message };
        }
    };

    return (
        <View style={styles.container}>
            {/* App logo */}
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
            />

            <Text style={styles.title}>Create New Account</Text>

            {/* Input fields */}
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" onChangeText={setName} />
                <Input placeholder="Email" onChangeText={setEmail} />
                <Input placeholder="Password" password={true} onChangeText={setPassword} />
            </View>

            {/* Buttons + navigation links */}
            <View style={styles.actionContainer}>
                <Button title="Create Account" onPress={onSignUp} />

                <View style={styles.row}>
                    <Text style={styles.text}>Already have an account?</Text>
                    <Link href={"/auth/SignIn"}>
                        <Text style={styles.link}> Sign In Here</Text>
                    </Link>
                </View>
            </View>
        </View>
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
