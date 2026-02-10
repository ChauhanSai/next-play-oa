import { Image } from "expo-image";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { Link } from "expo-router";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />
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
});
