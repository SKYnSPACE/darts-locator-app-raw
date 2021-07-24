import React, {useState} from "react";
import { View, Text, Button, Image, FlatList, Switch, StyleSheet } from "react-native";

import changeNavigationBarColor from 'react-native-navigation-bar-color';

import Drone from '../components/Drone';
import ManualConnection from './SerialTester'


const HomeScreen = ({navigation}) => {

  const [drone1, setDrone1] = useState({id:1, homePos:'NOT AVAILABLE', targetPos:'52S CF 99803 81999', isFired:0, battStat:1, imuStat:1, gpsStat:1, targetingStat:1, distStat:1, sendTargetMsg:0, targetMsg:'', sendFireMsg:0, fireMsg:'FFFB00FDFEFFDD'});
  const [drone2, setDrone2] = useState({id:2, homePos:'NOT AVAILABLE', targetPos:'52S CE 31126 99272', isFired:0, battStat:1, imuStat:1, gpsStat:0, targetingStat:0, distStat:0, sendTargetMsg:0, targetMsg:'', sendFireMsg:0, fireMsg:'FFFB40FDFEFFDD'});
  const [drone3, setDrone3] = useState({id:3, homePos:'NOT AVAILABLE', targetPos:'52S CF 99803 80999', isFired:0, battStat:0, imuStat:1, gpsStat:1, targetingStat:0, distStat:0, sendTargetMsg:0, targetMsg:'', sendFireMsg:0, fireMsg:'FFFB80FDFEFFDD'});
  const [drone4, setDrone4] = useState({id:4, homePos:'NOT AVAILABLE', targetPos:'', isFired:1, battStat:1, imuStat:0, gpsStat:0, targetingStat:0, distStat:0, sendTargetMsg:0, targetMsg:'', sendFireMsg:0, fireMsg:'FFFBC0FDFEFFDD'}); //false state: bad

  const [isEnabledTest, setIsEnabledTest] = useState(false);
  const toggleTestSwitch = () => setIsEnabledTest(currentState => !currentState);


  return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'transparent'}}>
    {/* <Button title="네!" onPress={()=>navigation.navigate('Details')}/> */}

      <Drone state={drone1} setter={setDrone1} navigation={navigation} testMode={isEnabledTest}/>
      <Drone state={drone2} setter={setDrone2} navigation={navigation} testMode={isEnabledTest}/>
      <Drone state={drone3} setter={setDrone3} navigation={navigation} testMode={isEnabledTest}/>
      <Drone state={drone4} setter={setDrone4} navigation={navigation} testMode={isEnabledTest}/>
      <ManualConnection states={{drone1, drone2, drone3, drone4}} setters={{setDrone1, setDrone2, setDrone3, setDrone4}}/>

      <Text style={{color:'white'}}>
          {isEnabledTest ? '>>> TRAINIG MODE <<<' : ''}
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "tomato" }}
        thumbColor={isEnabledTest ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleTestSwitch}
        value={isEnabledTest}
      />
      {/* <Image source={require('../../assets/darts.png')} style={styles.logoStyle}/> */}

    </View>
    );
};

const styles = StyleSheet.create({
  logoStyle: {
    width: 300,
    marginVertical: 10,
    height: undefined,
    aspectRatio: 2,
  },
  text: {
    fontSize: 30,
    color: "tomato"
  }
});

export default HomeScreen;