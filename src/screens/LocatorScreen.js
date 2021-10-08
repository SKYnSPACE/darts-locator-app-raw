import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Mgrs, { LatLon } from "../geodesy/mgrs";

const BORDER_COLOR = "#7f8fa6";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

let _appendBuffer = function (buffer1, buffer2) {
  let tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};

const IntToUint8 = function (intVal) {
  return [
    (intVal >> 24) & 255,
    (intVal >> 16) & 255,
    (intVal >> 8) & 255,
    intVal & 255,
  ];
};

const swap32 = function (val) {
  return (
    ((val & 0xff) << 24) |
    ((val & 0xff00) << 8) |
    ((val >> 8) & 0xff00) |
    ((val >> 24) & 0xff)
  );
};

const swap16 = function (val) {
  return ((val & 0xff) << 8) | ((val >> 8) & 0xff);
};

function ToHexString(byteArray) {
  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

function CreateChecksum(data) {
  let checksum = 0;
  data.forEach((element) => {
    checksum += element;
  });

  return checksum % 256;
}

const PackTargetInfo = (droneId, lat, latFine, lon, lonFine, alt, testMode) => {
  let buffer = new Uint8Array(25);

  buffer[0] = 255;
  buffer[1] = 250;

  buffer[2] = (droneId - 1) << 6;

  if (testMode) {
    buffer.set(IntToUint8(swap32(parseInt(lat) + 100)), 3);
  } else {
    buffer.set(IntToUint8(swap32(lat)), 3);
  }

  buffer.set(IntToUint8(swap32(latFine.slice(0, 6))), 7);
  buffer.set(IntToUint8(swap32(lon)), 11);
  buffer.set(IntToUint8(swap32(lonFine.slice(0, 6))), 15);
  buffer.set(IntToUint8(swap32(alt)), 19);

  buffer[23] = CreateChecksum(buffer.slice(2, 23));
  buffer[24] = 221;

  // console.log(ToHexString(buffer))
  return ToHexString(buffer);
};

const onPressLatLon2MGRS = ({
  lat,
  latFine,
  lon,
  lonFine,
  setGzd,
  setGsid,
  setEasting,
  setNorthing,
}) => {
  try {
    const p = LatLon.parse(lat.concat(".", latFine, ", ", lon, ".", lonFine));
    // console.log(p)
    const { zone, band, e100k, n100k, easting, northing } = p.toUtm().toMgrs();
    // console.log(zone, band, e100k, n100k, Math.round(easting), Math.round(northing))
    setGzd(zone.toString().concat(band));
    setGsid(e100k.concat(n100k));
    setEasting(Math.round(easting).toString().padStart(5, "0"));
    setNorthing(Math.round(northing).toString().padStart(5, "0"));
  } catch (e) {
    alert("Wrong Lat/Lon Coordinates.");
  }
};

const onPressMGRS2LatLon = ({
  droneId,
  gzd,
  gsid,
  easting,
  northing,
  setLat,
  setLatFine,
  setLon,
  setLonFine,
  alt,
  testMode,
}) => {
  try {
    const mgrs = Mgrs.parse(gzd.concat(" ", gsid, " ", easting, " ", northing));
    const latlon = mgrs.toUtm().toLatLon();
    // console.log(latlon._lat, latlon._lon)

    const [lat, latFine] = latlon._lat.toString().split(".");
    const [lon, lonFine] = latlon._lon.toString().split(".");

    setLat(lat);
    setLatFine(latFine);
    setLon(lon);
    setLonFine(lonFine);

    if (alt == "" || alt == 0) throw "ALT ERROR: Alt. cannot be 0 or none.";

    const message = PackTargetInfo(
      droneId,
      lat,
      latFine,
      lon,
      lonFine,
      alt,
      testMode
    );

    return message;
  } catch (e) {
    alert("Wrong MGRS Coordinates.");
    return -1;
  }
};

const onPressLoad = ({
  targetMgrs,
  setLat,
  setLatFine,
  setLon,
  setLonFine,
  setGzd,
  setGsid,
  setEasting,
  setNorthing,
  setAlt,
}) => {
  try {
    // console.log(route.params?.state.targetPos)
    // const mgrs = Mgrs.parse(targetMgrs);
    const [gzd, gsid, easting, northing, alt] = targetMgrs.split(" ");

    // const latlon = mgrs.toUtm().toLatLon()

    // const [lat,latFine] = latlon._lat.toString().split('.')
    // const [lon,lonFine] = latlon._lon.toString().split('.')

    // setLat(lat);
    // setLatFine(latFine);
    // setLon(lon);
    // setLonFine(lonFine);

    setGzd(gzd);
    setGsid(gsid);
    setEasting(easting);
    setNorthing(northing);
    setAlt(alt);
  } catch (e) {
    alert("Nothing to Load.");
  }
};

function LocatorScreen({ navigation, route }) {
  // console.log(route.params?.state)
  const targetMgrs = route.params?.state.targetPos;
  const droneId = route.params?.state.id;
  // console.log(route.params?.state.targetPos)
  const testMode = route.params?.testMode;

  const [lat, setLat] = useState("");
  const [latFine, setLatFine] = useState("");
  const [lon, setLon] = useState("");
  const [lonFine, setLonFine] = useState("");

  const [gzd, setGzd] = useState("");
  const [gsid, setGsid] = useState("");
  const [easting, setEasting] = useState("");
  const [northing, setNorthing] = useState("");

  const [alt, setAlt] = useState("");

  // deactivateKeepAwake();

  return (
    <View style={styles.containerStyle}>
      <View style={styles.latLonBox}>
        <ScrollView>
          <View style={styles.titleBox}>
            <Text style={styles.latLonTitle}>
              Target #{droneId}: Latitude / Longitude
            </Text>
          </View>
          <DismissKeyboard>
            <View style={styles.latBox}>
              <Text style={styles.subTitle}>Latitude: </Text>

              <View style={styles.latLonAltInputs}>
                <TextInput
                  style={{
                    width: 30,
                    height: 20,
                    color: "white",
                    borderBottomWidth: 1,
                    borderColor: "white",
                    padding: 0,
                  }}
                  onChangeText={(lat) => setLat(lat)}
                  defaultValue={lat}
                  keyboardType="number-pad"
                  textAlign={"right"}
                  maxLength={3}
                />
                <Text style={styles.subTitle}>.</Text>
                <TextInput
                  style={{
                    width: 70,
                    height: 20,
                    color: "white",
                    borderBottomWidth: 1,
                    borderColor: "white",
                    padding: 0,
                  }}
                  onChangeText={(latFine) => setLatFine(latFine)}
                  defaultValue={latFine}
                  keyboardType="number-pad"
                  textAlign={"left"}
                  maxLength={6}
                />
              </View>
            </View>
          </DismissKeyboard>

          <DismissKeyboard>
            <View style={styles.lonBox}>
              <Text style={styles.subTitle}>Longitude: </Text>

              <View style={styles.latLonAltInputs}>
                <TextInput
                  style={{
                    width: 30,
                    height: 20,
                    color: "white",
                    borderBottomWidth: 1,
                    borderColor: "white",
                    padding: 0,
                  }}
                  onChangeText={(lon) => setLon(lon)}
                  defaultValue={lon}
                  keyboardType="number-pad"
                  textAlign={"right"}
                  maxLength={4}
                />
                <Text style={styles.subTitle}>.</Text>
                <TextInput
                  style={{
                    width: 70,
                    height: 20,
                    color: "white",
                    borderBottomWidth: 1,
                    borderColor: "white",
                    padding: 0,
                  }}
                  onChangeText={(lonFine) => setLonFine(lonFine)}
                  defaultValue={lonFine}
                  keyboardType="number-pad"
                  textAlign={"left"}
                  maxLength={6}
                />
              </View>
            </View>
          </DismissKeyboard>

          <DismissKeyboard>
            <View style={styles.altBox}>
              <Text style={styles.subTitle}>Altitude: </Text>

              <View style={styles.latLonAltInputs}>
                <TextInput
                  style={{
                    width: 40,
                    height: 20,
                    color: "white",
                    borderBottomWidth: 1,
                    borderColor: "white",
                    padding: 0,
                  }}
                  onChangeText={(alt) => {
                    if (/^\d+$/.test(alt) || alt === "") {
                      setAlt(alt);
                    }
                  }}
                  defaultValue={alt}
                  keyboardType="number-pad"
                  textAlign={"right"}
                  maxLength={5}
                />
              </View>

              <Text style={styles.subTitle}> [m]</Text>
            </View>
          </DismissKeyboard>
        </ScrollView>
      </View>

      <View style={styles.converterButtonBox}>
        <TouchableOpacity
          underlayColor="white"
          onPress={() =>
            onPressLatLon2MGRS({
              lat,
              latFine,
              lon,
              lonFine,
              setGzd,
              setGsid,
              setEasting,
              setNorthing,
            })
          }
          style={styles.converterButton}
        >
          <MaterialCommunityIcons
            name="arrow-expand-down"
            style={styles.buttonFontStyle}
          />
        </TouchableOpacity>

        <TouchableOpacity
          underlayColor="white"
          onPress={() =>
            onPressLoad({
              targetMgrs,
              setLat,
              setLatFine,
              setLon,
              setLonFine,
              setGzd,
              setGsid,
              setEasting,
              setNorthing,
              setAlt,
            })
          }
          style={styles.converterButton}
        >
          <MaterialCommunityIcons
            name="file-download"
            style={styles.buttonFontStyle}
          />
        </TouchableOpacity>

        <TouchableOpacity
          underlayColor="white"
          onPress={() =>
            onPressMGRS2LatLon({
              droneId,
              gzd,
              gsid,
              easting,
              northing,
              setLat,
              setLatFine,
              setLon,
              setLonFine,
              alt,
              testMode,
            })
          }
          style={styles.converterButton}
        >
          <MaterialCommunityIcons
            name="arrow-expand-up"
            style={styles.buttonFontStyle}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.mgrsBox}>
        <ScrollView>
          <DismissKeyboard>
            <View style={styles.titleBox}>
              <Text style={styles.latLonTitle}>Target #{droneId}: MGRS</Text>
            </View>
          </DismissKeyboard>

          <DismissKeyboard>
            <View style={styles.gzdBox}>
              <Text style={styles.subTitle}>Grid Zone Designator: </Text>
              <View style={styles.mgrsInputs}>
                <TextInput
                  style={{
                    width: 35,
                    height: 25,
                    color: "white",
                    borderBottomWidth: 1,
                    borderColor: "white",
                    paddingVertical: 0,
                  }}
                  autoCapitalize="characters"
                  autoFocus={true}
                  onChangeText={(gzd) => setGzd(gzd)}
                  defaultValue={gzd}
                  textAlign={"center"}
                  maxLength={3}
                />
              </View>
            </View>
          </DismissKeyboard>

          <DismissKeyboard>
            <View style={styles.gsidBox}>
              <Text style={styles.subTitle}>100km Grid Square ID: </Text>
              <View style={styles.mgrsInputs}>
                <TextInput
                  style={{
                    width: 30,
                    height: 25,
                    color: "white",
                    borderBottomWidth: 1,
                    borderColor: "white",
                    paddingVertical: 0,
                  }}
                  autoCapitalize="characters"
                  onChangeText={(gsid) => setGsid(gsid)}
                  defaultValue={gsid}
                  textAlign={"center"}
                  maxLength={2}
                />
              </View>
            </View>
          </DismissKeyboard>
          <DismissKeyboard>
            <View style={styles.eastingBox}>
              <Text style={styles.subTitle}>Easting: </Text>
              <View style={styles.mgrsInputs}>
                <TextInput
                  style={{
                    width: 50,
                    height: 25,
                    color: "white",
                    borderBottomWidth: 1,
                    borderColor: "white",
                    paddingVertical: 0,
                  }}
                  onChangeText={(easting) => setEasting(easting)}
                  defaultValue={easting}
                  keyboardType="number-pad"
                  textAlign={"center"}
                  maxLength={5}
                />
              </View>
            </View>
          </DismissKeyboard>
          <DismissKeyboard>
            <View style={styles.northingBox}>
              <Text style={styles.subTitle}>Northing: </Text>

              <View style={styles.mgrsInputs}>
                <TextInput
                  style={{
                    width: 50,
                    height: 25,
                    color: "white",
                    borderBottomWidth: 1,
                    borderColor: "white",
                    paddingVertical: 0,
                  }}
                  onChangeText={(northing) => setNorthing(northing)}
                  defaultValue={northing}
                  keyboardType="number-pad"
                  textAlign={"center"}
                  maxLength={5}
                />
              </View>
            </View>
          </DismissKeyboard>

          <DismissKeyboard>
            <View style={styles.altBox}>
              <Text style={styles.subTitle}>Altitude: </Text>

              <View style={styles.mgrsInputs}>
                <TextInput
                  style={{
                    width: 40,
                    height: 20,
                    color: "white",
                    borderBottomWidth: 1,
                    borderColor: "white",
                    padding: 0,
                  }}
                  onChangeText={(alt) => {
                    if (/^\d+$/.test(alt) || alt === "") {
                      setAlt(alt);
                    }
                  }}
                  defaultValue={alt}
                  keyboardType="number-pad"
                  textAlign={"right"}
                  maxLength={5}
                />
              </View>
              <Text style={styles.subTitle}> [m]</Text>
            </View>
          </DismissKeyboard>
        </ScrollView>
      </View>

      <View style={styles.confirmButtonBox}>
        <TouchableOpacity
          underlayColor="white"
          onPress={() => {
            // activateKeepAwake();
            try {
              const message = onPressMGRS2LatLon({
                droneId,
                gzd,
                gsid,
                easting,
                northing,
                setLat,
                setLatFine,
                setLon,
                setLonFine,
                alt,
                testMode,
              }); //getLatLonInfo();

              if (message == -1) throw "Cannot Confirm!";

              route.params?.setter({
                ...route.params?.state,
                targetPos: gzd.concat(
                  " ",
                  gsid,
                  " ",
                  easting,
                  " ",
                  northing,
                  " ",
                  alt
                ),
                sendTargetMsg: 1,
                targetMsg: message,
              });

              navigation.navigate("Status");
            } catch (e) {
              alert(e);
            } finally {
              // navigation.navigate("Status");
            }
          }}
          style={styles.confirmButton}
        >
          <MaterialCommunityIcons
            name="check-bold"
            style={styles.buttonFontStyle}
          />
          <Text style={styles.buttonFontStyle}>CONFIRM</Text>
        </TouchableOpacity>

        <TouchableOpacity
          underlayColor="white"
          onPress={() => {
            // activateKeepAwake();
            navigation.navigate("Status");
          }}
          style={styles.cancelButton}
        >
          <MaterialCommunityIcons
            name="close-thick"
            style={styles.buttonFontStyle}
          />
          <Text style={styles.buttonFontStyle}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: 100,
  },
  latLonBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 5,
    flex: 4,
    marginHorizontal: 10,
  },
  latBox: {
    flexDirection: "row",
  },
  lonBox: {
    flexDirection: "row",
  },
  altBox: {
    flexDirection: "row",
  },
  titleBox: {
    alignItems: "center",
  },
  latLonTitle: {
    color: "white",
    fontSize: 20,
  },
  subTitle: {
    color: "white",
    fontSize: 18,
  },
  latLonAltInputs: {
    height: 30,
    flexDirection: "row",
  },
  converterButtonBox: {
    borderColor: BORDER_COLOR,
    flex: 1,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  converterButton: {
    backgroundColor: "gray",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    borderRadius: 5,
    margin: 30,
  },

  mgrsBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 5,
    flex: 7,
    marginHorizontal: 10,
  },
  mgrsInputs: {
    height: 30,
    flexDirection: "row",
  },
  gzdBox: {
    flexDirection: "row",
  },
  gsidBox: {
    flexDirection: "row",
  },
  eastingBox: {
    flexDirection: "row",
  },
  northingBox: {
    flexDirection: "row",
  },

  confirmButtonBox: {
    borderColor: BORDER_COLOR,
    flex: 1,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  confirmButton: {
    backgroundColor: "skyblue",
    width: 140,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "tomato",
    width: 140,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  buttonFontStyle: {
    color: "white",
    fontSize: 22,
  },
});

export default LocatorScreen;
