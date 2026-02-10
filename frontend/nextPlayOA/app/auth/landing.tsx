import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Animated,
} from "react-native";
import { useState, useRef, useEffect } from "react";

import { Link } from "expo-router";

export default function LandingScreen() {
  const [showSignInSheet, setShowSignInSheet] = useState(false);
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
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />

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
        style={[
          styles.fadeOverlay,
          { opacity: fadeAnim },
        ]}
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
            <Text style={styles.sheetTitle}>Sign In</Text>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    minHeight: "50%",
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3646C6",
    marginTop: 16,
  },
});
