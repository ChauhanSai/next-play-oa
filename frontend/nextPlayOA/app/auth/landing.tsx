import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Animated,
  TextInput,
} from "react-native";
import { useState, useRef, useEffect } from "react";

import { Link } from "expo-router";

export default function LandingScreen() {
  const [showSignInSheet, setShowSignInSheet] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showSignInSheet) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [showSignInSheet]);

  return (
    <View style={styles.container}>
      {!showSignInSheet && <View style={[styles.circle, styles.circle1]} />}
      {!showSignInSheet && <View style={[styles.circle, styles.circle2]} />}
      {!showSignInSheet && <View style={[styles.circle, styles.circle3]} />}
      {showSignInSheet && <View style={[styles.circle, styles.circle1green]} />}
      {showSignInSheet && <View style={[styles.circle, styles.circle2green]} />}
      {showSignInSheet && <View style={[styles.circle, styles.circle3green]} />}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => setShowSignInSheet(true)}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Link href="/auth/signup" asChild>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>

        <Image
          source={require("@/assets/images/Nostalgio..png")}
          style={styles.logo}
        />
      </View>

      <Animated.View
        style={[styles.fadeOverlay, { opacity: fadeAnim }]}
        pointerEvents={showSignInSheet ? "auto" : "none"}
      >
        <TouchableOpacity
          style={styles.fadeOverlayTouchable}
          activeOpacity={1}
          onPress={() => setShowSignInSheet(false)}
        />
      </Animated.View>

      <Modal
        visible={showSignInSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSignInSheet(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSignInSheet(false)}
        >
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Welcome Back</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />

            <View style={styles.buttonContainerGreen}>
              <TouchableOpacity style={styles.signInButtonGreen}>
                <Text style={styles.signInButtonTextGreen}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const SIZE = 850;
const OVERLAP = 150;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
  },
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  circle1: {
    backgroundColor: "#3646C6",
    marginLeft: -400,
    marginTop: -1300,
    zIndex: 3,
  },
  circle2: {
    backgroundColor: "#6177EA",
    marginLeft: -400 - OVERLAP * 3,
    marginTop: -1300 + OVERLAP * 1.75,
    zIndex: 2,
  },
  circle3: {
    backgroundColor: "#A8C0FF",
    marginLeft: -400 - OVERLAP * 3,
    marginTop: -1300 + OVERLAP * 3.5,
    zIndex: 1,
  },
  circle1green: {
    backgroundColor: "#335D47",
    marginLeft: -400,
    marginTop: -1300,
    zIndex: 3,
  },
  circle2green: {
    backgroundColor: "#789f8b",
    marginLeft: -400 - OVERLAP * 3,
    marginTop: -1300 + OVERLAP * 1.75,
    zIndex: 2,
  },
  circle3green: {
    backgroundColor: "#BDE1CE",
    marginLeft: -400 - OVERLAP * 3,
    marginTop: -1300 + OVERLAP * 3.5,
    zIndex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "25%",
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 16,
    zIndex: 10,
  },
  signInButton: {
    backgroundColor: "#3646C6",
    paddingVertical: 16,
    paddingHorizontal: 80,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "#A8C0FF",
    paddingVertical: 16,
    paddingHorizontal: 80,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  signUpButtonText: {
    color: "#3646C6",
    fontSize: 18,
    fontWeight: "700",
  },
  buttonContainerGreen: {
    alignItems: "center",
  },
  signInButtonGreen: {
    backgroundColor: "#335D47",
    paddingVertical: 16,
    paddingHorizontal: 80,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    marginTop: 32,
  },
  signInButtonTextGreen: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  logo: {
    width: 200,
    height: 60,
    marginTop: -60,
    bottom: -120,
  },
  fadeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 5,
  },
  fadeOverlayTouchable: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingBottom: 40,
    minHeight: "50%",
  },
  sheetTitle: {
    fontSize: 38,
    fontWeight: "700",
    color: "#000000",
    marginTop: 32,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#D9D9D9",
    color: "#898989",
    borderRadius: 18,
    padding: 12,
    marginTop: 24,
    fontSize: 16,
    fontWeight: "800",
  },
  forgotPassword: {
    color: "#898989",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 24,
    textAlign: "center",
  },
});
