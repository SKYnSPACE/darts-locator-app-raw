import React, {useState} from "react";
import { View, Text, Button, Image, FlatList, StyleSheet } from "react-native";

import Drone from '../components/Drone';

const HomeScreen = ({navigation}) => {

  const [drone1, setDrone1] = useState({id:1, homePos:'52S CF 93515 81121', targetPos:'52S CF 99803 80999', batt:100, gpsErr:false, targetErr:false, distErr:false});
  const [drone2, setDrone2] = useState({id:2, homePos:'52S CF 93515 81121', targetPos:'-', batt:69, gpsErr:false, targetErr:true, distErr:true});
  const [drone3, setDrone3] = useState({id:3, homePos:'52S CF 93515 81121', targetPos:'52S CF 99803 80999', batt:30, gpsErr:true, targetErr:false, distErr:true});
  const [drone4, setDrone4] = useState({id:4, homePos:'52S CF 93515 81121', targetPos:'52S CF 99803 80999', batt:11, gpsErr:true, targetErr:true, distErr:false});


  return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'transparent'}}>
    {/* <Button title="네!" onPress={()=>navigation.navigate('Details')}/> */}
    

      <Drone state={drone1} navigation={navigation}/>
      <Drone state={drone2} navigation={navigation}/>
      <Drone state={drone3} navigation={navigation}/>
      <Drone state={drone4} navigation={navigation}/>

      <Image source={require('../../assets/darts.png')} style={styles.logoStyle}/>

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