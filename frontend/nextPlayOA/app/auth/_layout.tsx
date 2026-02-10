import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="signup-details" options={{ headerShown: false }} />
      <Stack.Screen name="signup-password" options={{ headerShown: false }} />
      <Stack.Screen name="signup-connect" options={{ headerShown: false }} />
    </Stack>
  );
}