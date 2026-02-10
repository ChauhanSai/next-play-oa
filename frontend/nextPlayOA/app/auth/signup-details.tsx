import { Image } from "expo-image";
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from "react-native";

import { Link } from "expo-router";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />

      <View style={styles.centerContent}>
        <Text style={styles.welcomeText}>Hello, Sai</Text>

        <TextInput
          style={styles.nameInput}
          placeholder="Username"
          placeholderTextColor="#999999"
        />
        <TextInput
          style={styles.nameInput}
          placeholder="Email"
          placeholderTextColor="#999999"
        />

        <Link href="/auth/signup-password" asChild>
          <TouchableOpacity>
            <Image
              source={require("@/assets/images/arrow_forward.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar} />
        <View style={styles.progressBarComplete} />
      </View>
    </View>
  );
}

const SIZE = 850;
const OVERLAP = 150;
const LEFT = -400;
const TOP = -1700;

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
    backgroundColor: "#6177EA",
    marginLeft: LEFT,
    marginTop: TOP,
    zIndex: 3,
  },
  circle2: {
    backgroundColor: "#6177EA",
    marginLeft: LEFT - OVERLAP * 3,
    marginTop: TOP + OVERLAP * 1.75,
    zIndex: 2,
  },
  circle3: {
    backgroundColor: "#A8C0FF",
    marginLeft: LEFT - OVERLAP * 3,
    marginTop: TOP + OVERLAP * 3.5,
    zIndex: 1,
  },
  centerContent: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    marginBottom: 12,
  },
  nameInput: {
    marginTop: 16,
    width: "80%",
    backgroundColor: "#D9D9D9",
    color: "#898989",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: "800",
  },
  arrow: {
    marginTop: 78,
    width: 60,
    aspectRatio: 1,
  },
  progressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: "#D2DEFF",
    zIndex: 10,
  },
  progressBar: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#D2DEFF",
    width: "100%",
  },
  progressBarComplete: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#3646C6",
    width: "50%", // Change this value to update completion
  },
});
