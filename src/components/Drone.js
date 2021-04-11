import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLOR_GREEN = '#4cd137';
const COLOR_DARK = '#1e272e';
const BORDER_COLOR = '#7f8fa6';

function _onPressButton() {
    alert('You tapped the button!')
  }


const Drone = ({state, navigation}) => {
    const {id, homePos, targetPos, batt, gpsErr, targetErr, distErr} = state

  return (<View style={styles.containerStyle}>
      <TouchableOpacity underlayColor="white" onPress={()=>navigation.navigate('Locator')} style={styles.iconBoxStyle}>
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
                  {batt > 69 ? <MaterialCommunityIcons name="battery-high" style={styles.iconStyleGood} /> : (batt > 33 ? <MaterialCommunityIcons name="battery-medium" style={styles.iconStyleWarning} /> : <MaterialCommunityIcons name="battery-low" style={styles.iconStyleDanger} />)}
                  {batt > 69 ? <Text style={styles.textStyleGood}>{batt}%</Text> : (batt > 33 ? <Text style={styles.textStyleWarning}>{batt}%</Text> : <Text style={styles.textStyleDanger}>{batt}%</Text>)}
              </View>
              <View style={styles.gpsWaningBoxStyle}>
                {gpsErr? <MaterialCommunityIcons name="map-marker-off" style={styles.iconStyleDanger} /> : <MaterialCommunityIcons name="map-marker-off" style={styles.iconStyleDark} />}
              </View>
              <View style={styles.targetWaningBoxStyle}>
                {targetErr? <MaterialCommunityIcons name="crosshairs-question" style={styles.iconStyleDanger} /> : <MaterialCommunityIcons name="crosshairs-question" style={styles.iconStyleDark} />}
                
              </View>
              <View style={styles.distWaningBoxStyle}>
                {distErr? <MaterialCommunityIcons name="arrow-expand" style={styles.iconStyleDanger} /> : <MaterialCommunityIcons name="arrow-expand" style={styles.iconStyleDark} />}
                
              </View>
              <TouchableOpacity underlayColor="white" onPress={()=>navigation.navigate('Fire')} style={styles.fireBoxStyle}>
                  <MaterialCommunityIcons name="upload" style={styles.fireTextStyle} />
                  <Text style={styles.fireTextStyle}>FIRE</Text>
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
    flex: 2,

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