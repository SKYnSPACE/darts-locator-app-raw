import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const timerProps = {
  isPlaying: true,
  size: 30,
  strokeWidth: 3,
};

function SuspendedMessage() {
  alert("Fire suspended due to timeout.");
}

function FireScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.disclaimerBox}>
            <Text style={styles.textStyle}>LOW BATTERY</Text>
            <Text style={styles.textStyle}>BAD GPS RECEPTION</Text>
            <Text style={styles.textStyle}>UNKNOWN DESTINATION</Text>
            <Text style={styles.textStyle}>DISTANCE ALERT</Text>
        </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity
          underlayColor="white"
          onPress={() => navigation.navigate("Status")}
          style={styles.fireButtonStyle}
        >
          <MaterialCommunityIcons name="upload" style={styles.fireFontStyle} />
          <Text style={styles.fireFontStyle}> FIRE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          underlayColor="white"
          onPress={() => navigation.navigate("Status")}
          style={styles.abortButtonStyle}
        >
          <CountdownCircleTimer
            {...timerProps}
            duration={10}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            onComplete={() => {
              navigation.navigate("Status");
              SuspendedMessage();
            }}
          >
            {({ remainingTime, animatedColor }) => (
              <Animated.Text
                style={{
                  ...styles.remainingTime,
                  color: animatedColor,
                  fontSize: 20,
                }}
              >
                {remainingTime}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
          <Text style={styles.abortFontStyle}> ABORT</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoBox}>
        <Image
          source={require("../../assets/darts.png")}
          style={styles.logoStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },


  textStyle:{
    fontSize: 16,
    color: 'white',
  },

  fireButtonStyle: {
    backgroundColor: "tomato",
    width: 110,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
    margin: 10,
  },
  fireFontStyle: {
    color: "white",
    fontSize: 28,
  },
  abortButtonStyle: {
    backgroundColor: "skyblue",
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
    margin: 10,
  },
  abortFontStyle: {
    color: "white",
    fontSize: 30,
  },
  buttonBox: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
  },
  remainingTime: {
    fontSize: 46,
  },
  logoBox: {
    flex: 1,
  },
  logoStyle: {
    flex: 1,
    width: 300,
    marginVertical: 10,
    height: undefined,
    aspectRatio: 2,
  },

});

export default FireScreen;
