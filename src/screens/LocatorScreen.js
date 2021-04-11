import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BORDER_COLOR = "#7f8fa6";

function LocatorScreen({ navigation }) {
  const [text, setText] = useState("");

  return (
    <View style={styles.containerStyle}>
      <View style={styles.latLonBox}>
        <View style={styles.titleBox}>
          <Text style={styles.latLonTitle}>Latitude / Longitude</Text>
        </View>

        <View style={styles.latBox}>
            <Text style={styles.subTitle}>Latitude: </Text>

            <View style={styles.latLonInputs}>
            <TextInput
                style={{width: 30, height: 25, color: 'white', borderBottomWidth: 1, borderColor: 'white'}}
                onChangeText={(text) => setText(text)}
                defaultValue={text}
                textAlign={'right'}
                maxLength = {2}
            />
            <Text style={styles.subTitle}>.</Text>
            <TextInput
                style={{ width: 70, height: 25, color: 'white', borderBottomWidth: 1,borderColor: 'white' }}
                onChangeText={(text) => setText(text)}
                defaultValue={text}
                maxLength = {7}
            />
            </View>
        </View>

        <View style={styles.lonBox}>
            <Text style={styles.subTitle}>Longitude: </Text>

            <View style={styles.latLonInputs}>
            <TextInput
                style={{ width: 30, height: 25, color: 'white', borderBottomWidth: 1,borderColor: 'white' }}
                onChangeText={(text) => setText(text)}
                defaultValue={text}
                textAlign={'right'}
                maxLength = {3}
            />
            <Text style={{ color: "white" }}>.</Text>
            <TextInput
                style={{ width: 70, height: 25, color: 'white', borderBottomWidth: 1,borderColor: 'white' }}
                onChangeText={(text) => setText(text)}
                defaultValue={text}
                maxLength = {7}
            />
            </View>
        </View>

      </View>

      <View style={styles.converterButtonBox}>
        <TouchableOpacity
          underlayColor="white"
          onPress={() => navigation.navigate("Status")}
          style={styles.converterButton}
        >
          <MaterialCommunityIcons
            name="arrow-expand-down"
            style={styles.buttonFontStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          underlayColor="white"
          onPress={() => navigation.navigate("Status")}
          style={styles.converterButton}
        >
          <MaterialCommunityIcons
            name="arrow-expand-up"
            style={styles.buttonFontStyle}
          />
        </TouchableOpacity>
      </View>




      <View style={styles.mgrsBox}>
        <View style={styles.titleBox}>
          <Text style={styles.latLonTitle}>MGRS</Text>
        </View>

        <View style={styles.gzdBox}>
            <Text style={styles.subTitle}>Grid Zone Designator: </Text>
            <View style={styles.mgrsInputs}>
            <TextInput
                style={{ width: 30, height: 25, color: 'white', borderBottomWidth: 1,borderColor: 'white' }}
                onChangeText={(text) => setText(text)}
                defaultValue={text}
                textAlign={'center'}
                maxLength = {2}
            />
            </View>
        </View>

        <View style={styles.gsidBox}>
            <Text style={styles.subTitle}>100km Grid Square ID: </Text>
            <View style={styles.mgrsInputs}>
            <TextInput
                style={{ width: 30, height: 25, color: 'white', borderBottomWidth: 1,borderColor: 'white' }}
                onChangeText={(text) => setText(text)}
                defaultValue={text}
                textAlign={'center'}
                maxLength = {2}
            />
            </View>
        </View>
        <View style={styles.eastingBox}>
            <Text style={styles.subTitle}>Easting: </Text>
            <View style={styles.mgrsInputs}>
            <TextInput
                style={{ width: 50, height: 25, color: 'white', borderBottomWidth: 1,borderColor: 'white' }}
                onChangeText={(text) => setText(text)}
                defaultValue={text}
                textAlign={'center'}
                maxLength = {5}
            />
            </View>
        </View>
        <View style={styles.northingBox}>
            <Text style={styles.subTitle}>Northing: </Text>
            <View style={styles.mgrsInputs}>
            <TextInput
                style={{ width: 50, height: 25, color: 'white', borderBottomWidth: 1,borderColor: 'white' }}
                onChangeText={(text) => setText(text)}
                defaultValue={text}
                textAlign={'center'}
                maxLength = {5}
            />
            </View>
        </View>
      </View>




      <View style={styles.confirmButtonBox}>
        <TouchableOpacity
          underlayColor="white"
          onPress={() => navigation.navigate("Status")}
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
          onPress={() => navigation.navigate("Status")}
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
  latBox:{
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  lonBox:{
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  titleBox:{
      alignItems:"center"
  },
  latLonTitle: {
      color:'white',
      fontSize: 20,
  },
  subTitle: {
        color: "white", 
        fontSize: 18,
  },
  latLonInputs:{
      height: 30,
      flexDirection: 'row',
      alignItems:'baseline'
  },
  converterButtonBox: {
    // borderWidth: 1,
    borderColor: BORDER_COLOR,
    flex: 1,
    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    margin:10,
  },
  converterButton: {
    backgroundColor: "gray",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    borderRadius: 5,
    margin : 30,
  },

  mgrsBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 5,
    flex: 7,
    marginHorizontal: 10,
  },
  mgrsInputs:{
    height: 30,
    flexDirection: 'row',
    alignItems:'baseline'
},
  gzdBox:{
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  gsidBox:{
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  eastingBox:{
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  northingBox:{
    flexDirection: 'row',
    alignItems: 'baseline'
  },

  confirmButtonBox: {
    // borderWidth: 1,
    borderColor: BORDER_COLOR,
    flex: 1,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin:10,
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
