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

function ToHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

const PackFireSignal = (droneId) => {
  let buffer = new Uint8Array(7);

  buffer[0] = 255;
  buffer[1] = 251;
  
  buffer[2] = (droneId-1) << 6;
  buffer[3] = 253;
  buffer[4] = 254;
  buffer[5] = 255;
  buffer[6] = 221;
  
  // console.log(ToHexString(buffer))
}

function SuspendedMessage() {
  alert("Fire suspended due to timeout.");
}

function FireScreen({ navigation, route }) {

  const droneId = route.params?.state.id;
  const battStat = route.params?.state.battStat;
  const imuStat = route.params?.state.imuStat;
  const gpsStat = route.params?.state.gpsStat;
  const targetingStat = route.params?.state.targetingStat;
  const distStat = route.params?.state.distStat;

  return (
    <View style={styles.container}>
      <View style={styles.disclaimerBox}>
        <View>
          <Text style={styles.textHeaderStyle}>WRAITH #{droneId}</Text>
        </View>
        <View>
          {battStat? <Text style={styles.textConfirmedStyle}>BATTERY STATUS CHECKED.</Text> : <Text style={styles.textWarningStyle}>LOW BATTERY ALERT</Text>}
          {imuStat? <Text style={styles.textConfirmedStyle}>IMU STATUS CHECKED.</Text> : <Text style={styles.textWarningStyle}>IMU FAILURE</Text>}
          {gpsStat? <Text style={styles.textConfirmedStyle}>GPS STATUS CHECKED.</Text> : <Text style={styles.textWarningStyle}>BAD GPS RECEPTION</Text>}
          {targetingStat? <Text style={styles.textConfirmedStyle}>DESTINATION CHECKED.</Text> : <Text style={styles.textWarningStyle}>UNKNOWN DESTINATION</Text>}
          {distStat? <Text style={styles.textConfirmedStyle}>FIRING DISTANCE CHECKED.</Text> : <Text style={styles.textWarningStyle}>FIRING DISTANCE ALERT</Text>}
        </View>
      </View>

      <View style={styles.resultBox}>
        {battStat&&imuStat&&gpsStat&&targetingStat&&distStat ? <Text style={styles.textConfirmedHeaderStyle}>[READY TO FIRE]</Text> : <Text style={styles.textWarningHeaderStyle}>[INSECURE SYSTEM]</Text>}
      </View>

      <View style={styles.buttonBox}>
        <TouchableOpacity
          underlayColor="white"
          onPress={() => {
            try{
              route.params?.setter({...route.params?.state, sendFireMsg:1})
            } catch(e){
              
            } finally{
              navigation.navigate("Status")
            }}
          }
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

  disclaimerBox:
  {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  textHeaderStyle:{
    fontSize: 48,
    color: 'white',
  },
  textConfirmedHeaderStyle:{
    fontSize: 32,
    color: 'skyblue',
  },
  textWarningHeaderStyle:{
    fontSize: 32,
    color: 'tomato',
  },

  textConfirmedStyle:{
    fontSize: 18,
    color: 'skyblue',
  },

  resultBox:
  {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    borderColor: "white"
  },

  textWarningStyle:{
    fontSize: 18,
    color: 'tomato',
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
    flex: 1,
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
