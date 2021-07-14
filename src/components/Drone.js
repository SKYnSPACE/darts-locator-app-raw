import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLOR_GREEN = '#4cd137';
const COLOR_DARK = '#1e272e';
const BORDER_COLOR = '#7f8fa6';

const Drone = ({state, setter, navigation}) => {
    const {id, homePos, targetPos, isFired, battStat, imuStat, gpsStat, targetingStat, distStat} = state

  return (<View style={styles.containerStyle}>
      <TouchableOpacity underlayColor="white" onPress={()=>navigation.navigate('Locator', {state:state, setter:setter})} style={styles.iconBoxStyle}>
      {/* <View style={styles.iconBoxStyle}> */}
        <MaterialCommunityIcons name="quadcopter" style={styles.headerIconStyle} /> 
        <Text style={styles.headerFontStyle}> {id}</Text>
      {/* </View> */}
      </TouchableOpacity>
      <View style={styles.detailBoxStyle}>
          <View style={styles.takeoffSiteStyle}>
            <MaterialCommunityIcons name="airplane-takeoff" style={styles.iconStyle} />
            <Text style={styles.textStyle}> {homePos}</Text>
          </View>
          <View style={styles.landingSiteStyle}>
            <MaterialCommunityIcons name="skull-crossbones" style={styles.iconStyle} />
            <Text style={styles.textStyle}> {targetPos}</Text>
          </View>
          <View style={styles.warningBoxesStyle}>
              <View style={styles.batteryWaningBoxStyle}>
                {battStat? <MaterialCommunityIcons name="battery-low" style={styles.iconStyleDark} /> : <MaterialCommunityIcons name="battery-low" style={styles.iconStyleDanger} />}
              </View>
              <View style={styles.imuWaningBoxStyle}>
                {imuStat? <MaterialCommunityIcons name="compass-off-outline" style={styles.iconStyleDark} /> : <MaterialCommunityIcons name="compass-off-outline" style={styles.iconStyleDanger} />}
              </View>
              <View style={styles.gpsWaningBoxStyle}>
                {gpsStat? <MaterialCommunityIcons name="map-marker-off" style={styles.iconStyleDark} /> : <MaterialCommunityIcons name="map-marker-off" style={styles.iconStyleDanger} />}
              </View>
              <View style={styles.targetWaningBoxStyle}>
                {targetingStat? <MaterialCommunityIcons name="crosshairs-question" style={styles.iconStyleDark} /> : <MaterialCommunityIcons name="crosshairs-question" style={styles.iconStyleDanger} />}
                
              </View>
              <View style={styles.distWaningBoxStyle}>
                {distStat? <MaterialCommunityIcons name="arrow-expand" style={styles.iconStyleDark} /> : <MaterialCommunityIcons name="arrow-expand" style={styles.iconStyleDanger} />}
                
              </View>
              <TouchableOpacity disabled={isFired} underlayColor="white" onPress={()=>navigation.navigate('Fire', {state:state, setter:setter})} style={styles.fireBoxStyle}>
                {isFired ? <Text style={styles.fireTextStyle}> </Text> : <MaterialCommunityIcons name="upload" style={styles.fireTextStyle} />}
                {isFired ? <Text style={styles.fireTextStyle}>- - - - -</Text> : <Text style={styles.fireTextStyle}>FIRE</Text>}
              </TouchableOpacity>
          </View>
      </View>
      
    </View>
    );
};

const styles = StyleSheet.create({
  containerStyle: {
      flexDirection: 'row',
      margin: 5,
      marginVertical: 10,
      borderRadius: 5,
      height: 100,
      
  },

  iconBoxStyle:{
      backgroundColor: '#192a56',
      flex: 1,
      borderWidth: 1,
      borderColor: BORDER_COLOR,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },

  headerIconStyle:{
      fontSize: 45,
      color: 'white',
      
  },

  iconStyle:{
      fontSize: 20,
      color: 'white',
  },

  iconStyleGood:{
    fontSize: 20,
    color: COLOR_GREEN,
  },

  iconStyleWarning:{
    fontSize: 20,
    color: 'yellow',
  },

  iconStyleDanger:{
    fontSize: 20,
    color: 'tomato',
  },

  iconStyleDark:{
    fontSize: 20,
    color: COLOR_DARK,
  },

  textStyle:{
    fontSize: 16,
    color: 'white',
  },
  textStyleDanger:{
    fontSize: 16,
    color: 'tomato',
  },
  textStyleWarning:{
    fontSize: 16,
    color: 'yellow',
  },
  textStyleGood:{
    fontSize: 16,
    color: COLOR_GREEN,
  },

  headerFontStyle:{
    fontSize: 30,
    color: 'white',
    
  },

  detailBoxStyle:{
      backgroundColor: 'transparent',
      flex: 3,

      
      
  },

  takeoffSiteStyle:{
    borderWidth:1,
    borderColor:BORDER_COLOR,
    borderTopRightRadius: 5,

    flex: 1,

    alignItems: 'center',
    
    flexDirection: 'row',
  },

  landingSiteStyle:{
    borderWidth:1,
    borderColor:BORDER_COLOR,

    flex: 1,

    alignItems: 'center',

    flexDirection: 'row',
  },

  warningBoxesStyle:{
      borderWidth:1,
      borderColor: BORDER_COLOR,
      borderBottomRightRadius: 5,

      flex: 1,

      flexDirection: 'row',
      
  },

  batteryWaningBoxStyle:{
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    
  },
  imuWaningBoxStyle:{
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    
  },
  gpsWaningBoxStyle:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetWaningBoxStyle:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  distWaningBoxStyle:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  fireBoxStyle:{
    backgroundColor: '#e84118',
    borderBottomRightRadius: 5,

    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  fireTextStyle:{
      fontSize: 20,
      color: 'white',
  }


});

export default Drone;