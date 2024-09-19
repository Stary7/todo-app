import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://backend-todo-suoo.onrender.com/api/auth/register', {
        username,
        email,
        password,
      });

      Alert.alert('Success', 'Registration complete');
      router.push('/screens/LoginScreen'); // Navigate to LoginScreen after successful registration
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        if (error.response.data.msg === 'User already exists') {
          Alert.alert(
            'User Already Exists',
            'This email is already registered. Would you like to log in?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Login',
                onPress: () => router.push('/screens/LoginScreen'),
              },
            ]
          );
        } else {
          Alert.alert('Error', error.response.data.msg);
        }
      } else {
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Already have an account? Login"
        onPress={() => router.push('/screens/LoginScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9fafd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
  },
});

export default RegisterScreen;
