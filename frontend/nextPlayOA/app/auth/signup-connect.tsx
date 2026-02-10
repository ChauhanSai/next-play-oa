import { Image } from "expo-image";
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Linking } from "react-native";

export default function SignUpScreen() {
  const handleSpotifyPress = async () => {
    try {
      await Linking.openURL("https://spotify.com");
    } catch (error) {
      console.error("Failed to open Spotify:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />

      <View style={styles.centerContent}>
        <Text style={styles.welcomeText}>Connect your</Text>
        <Text style={styles.welcomeText}>account</Text>

        <Image
          source={require("@/assets/images/spotify_icon.png")}
          style={styles.icon}
        />

        <View style={styles.buttonContainerGreen}>
          <TouchableOpacity 
            style={styles.signInButtonGreen}
            onPress={handleSpotifyPress}
          >
            <Text style={styles.signInButtonTextGreen}>Open in Spotify</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#789f8b",
    marginLeft: LEFT,
    marginTop: TOP,
    zIndex: 3,
  },
  circle2: {
    backgroundColor: "#789f8b",
    marginLeft: LEFT - OVERLAP * 3,
    marginTop: TOP + OVERLAP * 1.75,
    zIndex: 2,
  },
  circle3: {
    backgroundColor: "#BDE1CE",
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
  },
  welcomeSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#898989",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  icon: {
    width: 125,
    aspectRatio: 1,
    marginTop: 16,
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
  progressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: "#BDE1CE",
    zIndex: 10,
  },
  progressBar: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#BDE1CE",
    width: "100%",
  },
  progressBarComplete: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#335D47",
    width: "100%", // Change this value to update completion
  },
});
