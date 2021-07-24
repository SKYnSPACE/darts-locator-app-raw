import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  DeviceEventEmitter
} from "react-native";
import { RNSerialport, definitions, actions } from "react-native-serialport";
//type Props = {};

const ParseDroneStatByte = (byte, drone1, drone2, drone3, drone4, setDrone1, setDrone2, setDrone3, setDrone4) => {
  const droneId = (byte >> 6);

  switch (droneId) {
    case 0:
      setDrone1({...drone1, distStat:(byte&(32)), imuStat:(byte&(16)), gpsStat:(byte&(8)), battStat:(byte&(4)), targetingStat:(byte&(2)), isFired:(byte&(1))});
      break;
    case 1:
      setDrone2({...drone2, distStat:(byte&(32)), imuStat:(byte&(16)), gpsStat:(byte&(8)), battStat:(byte&(4)), targetingStat:(byte&(2)), isFired:(byte&(1))});
      break;
    case 2:
      setDrone3({...drone3, distStat:(byte&(32)), imuStat:(byte&(16)), gpsStat:(byte&(8)), battStat:(byte&(4)), targetingStat:(byte&(2)), isFired:(byte&(1))});
      break;
    case 3:
      setDrone4({...drone4, distStat:(byte&(32)), imuStat:(byte&(16)), gpsStat:(byte&(8)), battStat:(byte&(4)), targetingStat:(byte&(2)), isFired:(byte&(1))});
      break;
    default:
      null;
  }
  
};


class ManualConnection extends Component {
  constructor(props) {
    super(props);

    this.drone1 = props.states.drone1;
    this.drone2 = props.states.drone2;
    this.drone3 = props.states.drone3;
    this.drone4 = props.states.drone4;

    this.myRef = React.createRef(this.drone1);

    this.setDrone1 = props.setters.setDrone1;
    this.setDrone2 = props.setters.setDrone2;
    this.setDrone3 = props.setters.setDrone3;
    this.setDrone4 = props.setters.setDrone4;

    this.state = {
      servisStarted: false,
      connected: false,
      usbAttached: false,
      output: "",
      outputArray: [],
      baudRate: "115200",
      interface: "-1",
      sendText: "HELLO WORLD!",
      returnedDataType: definitions.RETURNED_DATA_TYPES.HEXSTRING
    };

    this.startUsbListener = this.startUsbListener.bind(this);
    this.stopUsbListener = this.stopUsbListener.bind(this);
  }
  componentWillReceiveProps(nextProps) { //States in class does not update automatically. This will do the job!
    this.drone1 = nextProps.states.drone1;
    this.drone2 = nextProps.states.drone2;
    this.drone3 = nextProps.states.drone3;
    this.drone4 = nextProps.states.drone4;
  }

  GenerateRandomDroneStat()
  {
    if (this.drone1.sendTargetMsg == 1)
    {
      let byte = Math.round(255*Math.random());
      ParseDroneStatByte(byte, this.drone1, this.drone2, this.drone3, this.drone4, this.setDrone1, this.setDrone2, this.setDrone3, this.setDrone4);
      this.setDrone1({...this.drone1, sendTargetMsg:0});
      // setTimeout(() => { this.setDrone1({...this.drone1, sendTargetMsg:0}); }, 5000);
    }
    if (this.drone1.sendFireMsg == 1)
    {
      let byte = Math.round(255*Math.random());
      ParseDroneStatByte(byte, this.drone1, this.drone2, this.drone3, this.drone4, this.setDrone1, this.setDrone2, this.setDrone3, this.setDrone4);
      this.setDrone1({...this.drone1, sendFireMsg:0});
      // setTimeout(() => { this.setDrone1({...this.drone1, sendTargetMsg:0}); }, 5000);
    }
  }

  sendMessage()
  {
    if (this.drone1.sendTargetMsg == 1)
    {
      this.setDrone1({...this.drone1, sendTargetMsg:0});
      RNSerialport.writeHexString(this.drone1.targetMsg); // 5 byte
      // setTimeout(() => { this.setDrone1({...this.drone1, sendTargetMsg:0}); }, 5000);
      return 0;
    }
    if (this.drone1.sendFireMsg == 1)
    {
      this.setDrone1({...this.drone1, sendFireMsg:0});
       RNSerialport.writeHexString(this.drone1.fireMsg); // 5 byte
      // setTimeout(() => { this.setDrone1({...this.drone1, sendTargetMsg:0}); }, 5000);
      return 0;
    }
  }

  componentDidMount() {
    this.startUsbListener();
    // setInterval(() => {
    //   let byte = Math.round(255*Math.random());
    //   ParseDroneStatByte(byte, this.drone1, this.drone2, this.drone3, this.drone4, this.setDrone1, this.setDrone2, this.setDrone3, this.setDrone4);
    //   console.log(this.drone2.battStat, this.drone2.imuStat, this.drone2.distStat)
    // }, 2000);

    // setInterval(() => {
    //   // RNSerialport.writeHexString("48454C4C4F");
    //   this.GenerateRandomDroneStat();
    //   // this.setDrone1({...this.drone1, sendTargetMsg:0});
    //   // setTimeout(() => {GenerateRandomDroneStat}, 1000);
    //   // setTimeout(() => {GenerateRandomDroneStat}, 2000);
    //   // setTimeout(() => {GenerateRandomDroneStat}, 3000);
    //   // setTimeout(() => {GenerateRandomDroneStat}, 4000);
    //   // setTimeout(() => {GenerateRandomDroneStat}, 5000);
      
    //   // RNSerialport.writeHexString("48454C4C4F");
    // }, 2000);
  }

  componentDidUpdate() {  
    // const {battStat} = this.drone1;
    // const {battStat2} = this.myRef;
    // console.log(battStat, battStat2);
    // if (this.drone1.battStat == 1)
    // {
    //   let byte = Math.round(255*Math.random());
    //   ParseDroneStatByte(byte, this.drone1, this.drone2, this.drone3, this.drone4, this.setDrone1, this.setDrone2, this.setDrone3, this.setDrone4);
    //   this.setDrone1({...this.drone1, battStat:0});
    //   // setTimeout(() => { this.setDrone1({...this.drone1, sendTargetMsg:0}); }, 2000);
    // }
    // setTimeout(() => {
    //   // RNSerialport.writeHexString("48454C4C4F");
    //   this.GenerateRandomDroneStat();
    //   // this.setDrone1({...this.drone1, sendTargetMsg:0});
    //   // setTimeout(() => {GenerateRandomDroneStat}, 1000);
    //   // setTimeout(() => {GenerateRandomDroneStat}, 2000);
    //   // setTimeout(() => {GenerateRandomDroneStat}, 3000);
    //   // setTimeout(() => {GenerateRandomDroneStat}, 4000);
    //   // setTimeout(() => {GenerateRandomDroneStat}, 5000);
      
    //   // RNSerialport.writeHexString("48454C4C4F");
    // }, 2000);
  }

  componentWillUnmount() {
    this.stopUsbListener();
  }

  startUsbListener() {
    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STARTED,
      this.onServiceStarted,
      this
    );
    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STOPPED,
      this.onServiceStopped,
      this
    );
    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_ATTACHED,
      this.onDeviceAttached,
      this
    );
    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_DETACHED,
      this.onDeviceDetached,
      this
    );
    DeviceEventEmitter.addListener(actions.ON_ERROR, this.onError, this);
    DeviceEventEmitter.addListener(
      actions.ON_CONNECTED,
      this.onConnected,
      this
    );
    DeviceEventEmitter.addListener(
      actions.ON_DISCONNECTED,
      this.onDisconnected,
      this
    );
    DeviceEventEmitter.addListener(actions.ON_READ_DATA, this.onReadData, this);
    RNSerialport.setReturnedDataType(this.state.returnedDataType);
    RNSerialport.setAutoConnectBaudRate(parseInt(this.state.baudRate, 10));
    RNSerialport.setInterface(parseInt(this.state.interface, 10));
    RNSerialport.setAutoConnect(true);
    RNSerialport.startUsbService();
  };

  stopUsbListener = async () => {
    DeviceEventEmitter.removeAllListeners();
    const isOpen = await RNSerialport.isOpen();
    if (isOpen) {
      Alert.alert("isOpen", isOpen);
      RNSerialport.disconnect();
    }
    RNSerialport.stopUsbService();
  };

  onServiceStarted(response) {
    this.setState({ servisStarted: true });
    if (response.deviceAttached) {
      this.onDeviceAttached();
    }
  }
  onServiceStopped() {
    this.setState({ servisStarted: false });
  }
  onDeviceAttached() {
    this.setState({ usbAttached: true });
  }
  onDeviceDetached() {
    this.setState({ usbAttached: false });
  }
  onConnected() {
    this.setState({ connected: true });
    // 시리얼포트 연결 확인되면, 1초마다 한번씩 상태 점검해서 메시지 전송.
    setInterval(()=>{
      this.sendMessage();
    },1000); 

    // setInterval(() => {
    //   let byte = Math.round(255*Math.random());
    //   ParseDroneStatByte(byte, this.drone1, this.drone2, this.drone3, this.drone4, this.setDrone1, this.setDrone2, this.setDrone3, this.setDrone4);
    // }, 2000);
  }
  onDisconnected() {
    this.setState({ connected: false });
  }
  onReadData(data) {
    ParseDroneStatByte(data, this.drone1, this.drone2, this.drone3, this.drone4, this.setDrone1, this.setDrone2, this.setDrone3, this.setDrone4);
    if (
      this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY
    ) {
      const payload = RNSerialport.intArrayToUtf16(data.payload);
      this.setState({ output: this.state.output + payload });
    } else if (
      this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING
    ) {
      const payload = RNSerialport.hexToUtf16(data.payload);
      this.setState({ output: this.state.output + payload });
    }
  }

  onError(error) {
    console.error(error);
  }

  handleConvertButton() {
    // let byte = 0b00011111;
    let byte = Math.round(255*Math.random());
    ParseDroneStatByte(byte, this.drone1, this.drone2, this.drone3, this.drone4, this.setDrone1, this.setDrone2, this.setDrone3, this.setDrone4);
  }
   handleSendButton() {
     RNSerialport.writeString(this.state.sendText);
    //  RNSerialport.writeHexString("48454C4C4F"); // 5 byte
   }
  handleClearButton() {
    this.setState({ output: "" });
    this.setState({ outputArray: [] });
  }

  buttonStyle = status => {
    return status
      ? styles.button
      : Object.assign({}, styles.button, { backgroundColor: "#C0C0C0" });
  };

  render() {
    return (
      <ScrollView style={styles.body}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.line}>
              <Text style={styles.title}>Service:</Text>
              <Text style={styles.value}>
                {this.state.servisStarted ? "Started" : "Not Started"}
              </Text>
            </View>
            <View style={styles.line}>
              <Text style={styles.title}>Usb:</Text>
              <Text style={styles.value}>
                {this.state.usbAttached ? "Attached" : "Not Attached"}
              </Text>
            </View>
            <View style={styles.line}>
              <Text style={styles.title}>Connection:</Text>
              <Text style={styles.value}>
                {this.state.connected ? "Connected" : "Not Connected"}
              </Text>
            </View>
          </View>
          <ScrollView style={styles.output} nestedScrollEnabled={true}>
            <Text style={styles.full}>
              {this.state.output === "" ? "No Content" : this.state.output}
            </Text>
          </ScrollView>

          <View style={styles.inputContainer}>
            <Text>Send</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.setState({ sendText: text })}
              value={this.state.sendText}
              placeholder={"Send Text"}
            />
          </View>
          <View style={styles.line2}>
            <TouchableOpacity
              style={this.buttonStyle(this.state.connected)}
              onPress={() => this.handleSendButton()}
              disabled={!this.state.connected}
            >
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleClearButton()}
            >
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleConvertButton()}
            >
              <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1
  },
  body: {
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16
  },
  header: {
    display: "flex",
    justifyContent: "center"
    //alignItems: "center"
  },
  line: {
    display: "flex",
    flexDirection: "row"
  },
  line2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    color: 'white',
    width: 200,
  },
  value: {
    color: 'white',
    marginLeft: 20
  },
  output: {
    marginTop: 10,
    height: 100,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1
  },
  inputContainer: {
    marginTop: 10,
    borderBottomWidth: 2
  },
   textInput: {
     paddingLeft: 10,
     paddingRight: 10,
     height: 40,
     borderBottomWidth: 1,
     borderColor: 'white',
     color:'white',
   },
  button: {
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#147efb",
    borderRadius: 3
  },
  buttonText: {
    color: "#FFFFFF"
  }
});

export default ManualConnection;

//  import React, { Component } from "react";
//  import {
//    StyleSheet,
//    Text,
//    View,
//    TextInput,
//    Picker,
//    TouchableOpacity,
//    ScrollView,
//    Alert,
//    DeviceEventEmitter
//  } from "react-native";
//  import { RNSerialport, definitions, actions } from "react-native-serialport";
//  //type Props = {};
//  class ManualConnection extends Component {
//    constructor(props) {
//      super(props);
 
//      this.state = {
//        servisStarted: false,
//        connected: false,
//        usbAttached: false,
//        output: "",
//        outputArray: [],
//        baudRate: "115200",
//        interface: "-1",
//        selectedDevice: null,
//        deviceList: [{ name: "Device Not Found", placeholder: true }],
//        sendText: "HELLO",
//        returnedDataType: definitions.RETURNED_DATA_TYPES.HEXSTRING
//      };
 
//      this.startUsbListener = this.startUsbListener.bind(this);
//      this.stopUsbListener = this.stopUsbListener.bind(this);
//    }
 
//    componentDidMount() {
//      this.startUsbListener();
//    }
 
//    componentWillUnmount() {
//      this.stopUsbListener();
//    }
 
//    startUsbListener() {
//      DeviceEventEmitter.addListener(
//        actions.ON_SERVICE_STARTED,
//        this.onServiceStarted,
//        this
//      );
//      DeviceEventEmitter.addListener(
//        actions.ON_SERVICE_STOPPED,
//        this.onServiceStopped,
//        this
//      );
//      DeviceEventEmitter.addListener(
//        actions.ON_DEVICE_ATTACHED,
//        this.onDeviceAttached,
//        this
//      );
//      DeviceEventEmitter.addListener(
//        actions.ON_DEVICE_DETACHED,
//        this.onDeviceDetached,
//        this
//      );
//      DeviceEventEmitter.addListener(actions.ON_ERROR, this.onError, this);
//      DeviceEventEmitter.addListener(
//        actions.ON_CONNECTED,
//        this.onConnected,
//        this
//      );
//      DeviceEventEmitter.addListener(
//        actions.ON_DISCONNECTED,
//        this.onDisconnected,
//        this
//      );
//      DeviceEventEmitter.addListener(actions.ON_READ_DATA, this.onReadData, this);
//      RNSerialport.setReturnedDataType(this.state.returnedDataType);
//      RNSerialport.setAutoConnect(false);
//      RNSerialport.startUsbService();
//    };
 
//    stopUsbListener = async () => {
//      DeviceEventEmitter.removeAllListeners();
//      const isOpen = await RNSerialport.isOpen();
//      if (isOpen) {
//        Alert.alert("isOpen", isOpen);
//        RNSerialport.disconnect();
//      }
//      RNSerialport.stopUsbService();
//    };
 
//    onServiceStarted(response) {
//      this.setState({ servisStarted: true });
//      if (response.deviceAttached) {
//        this.onDeviceAttached();
//      }
//    }
//    onServiceStopped() {
//      this.setState({ servisStarted: false });
//      Alert.alert("service stopped");
//    }
//    onDeviceAttached() {
//      this.setState({ usbAttached: true });
//      this.fillDeviceList();
//    }
//    onDeviceDetached() {
//      this.setState({ usbAttached: false });
//      this.setState({ selectedDevice: null });
//      this.setState({
//        deviceList: [{ name: "Device Not Found", placeholder: true }]
//      });
//    }
//    onConnected() {
//      this.setState({ connected: true });
//    }
//    onDisconnected() {
//      this.setState({ connected: false });
//    }
//    onReadData(data) {
//      if (
//        this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY
//      ) {
//        const payload = RNSerialport.intArrayToUtf16(data.payload);
//        this.setState({ output: this.state.output + payload });
//      } else if (
//        this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING
//      ) {
//        const payload = RNSerialport.hexToUtf16(data.payload);
//        this.setState({ output: this.state.output + payload });
//      }
//    }
 
//    onError(error) {
//      console.error(error);
//    }
 
//    handleConvertButton() {
//      let data = "";
//      if (
//        this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING
//      ) {
//        data = RNSerialport.hexToUtf16(this.state.output);
//      } else if (
//        this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY
//      ) {
//        data = RNSerialport.intArrayToUtf16(this.state.outputArray);
//      } else {
//        return;
//      }
//      this.setState({ output: data });
//    }
//    fillDeviceList() {
//      RNSerialport.getDeviceList(response => {
//        if (response.status) {
//          this.setState({ deviceList: response.devices });
//        } else {
//          Alert.alert(
//            "Error from getDeviceList()",
//            response.errorCode + " " + response.errorMessage
//          );
//        }
//      });
//    }
//    devicePickerItems() {
//      return this.state.deviceList.map((device, index) =>
//        !device.placeholder ? (
//          <Picker.Item key={index} label={device.name} value={device} />
//        ) : (
//          <Picker.Item key={index} label={device.name} value={null} />
//        )
//      );
//    }
 
//    handleSendButton() {
//      RNSerialport.writeString(this.state.sendText);
//    }
//    handleClearButton() {
//      this.setState({ output: "" });
//      this.setState({ outputArray: [] });
//    }
 
//    checkSupport() {
//      if (
//        this.state.selectedDevice.name === undefined ||
//        this.state.selectedDevice === null
//      )
//        return;
//      RNSerialport.isSupported(this.state.selectedDevice.name)
//        .then(status => {
//          alert(status ? "Supported" : "Not Supported");
//        })
//        .catch(error => {
//          alert(JSON.stringify(error));
//        });
//    }
 
//    handleConnectButton = async () => {
//      const isOpen = await RNSerialport.isOpen();
//      if (isOpen) {
//        RNSerialport.disconnect();
//      } else {
//        if (!this.state.selectedDevice) {
//          alert("Please choose device");
//          return;
//        }
//        RNSerialport.setInterface(parseInt(this.state.interface, 10));
//        RNSerialport.connectDevice(
//          this.state.selectedDevice.name,
//          parseInt(this.state.baudRate, 10)
//        );
//      }
//    };
 
//    buttonStyle = status => {
//      return status
//        ? styles.button
//        : Object.assign({}, styles.button, { backgroundColor: "#C0C0C0" });
//    };
 
//    render() {
//      return (
//        <ScrollView style={styles.body}>
//          <View style={styles.container}>
//            <View style={styles.header}>
//              <View style={styles.line}>
//                <Text style={styles.title}>Service:</Text>
//                <Text style={styles.value}>
//                  {this.state.servisStarted ? "Started" : "Not Started"}
//                </Text>
//              </View>
//              <View style={styles.line}>
//                <Text style={styles.title}>Usb:</Text>
//                <Text style={styles.value}>
//                  {this.state.usbAttached ? "Attached" : "Not Attached"}
//                </Text>
//              </View>
//              <View style={styles.line}>
//                <Text style={styles.title}>Connection:</Text>
//                <Text style={styles.value}>
//                  {this.state.connected ? "Connected" : "Not Connected"}
//                </Text>
//              </View>
//            </View>
//            <ScrollView style={styles.output} nestedScrollEnabled={true}>
//              <Text style={styles.full}>
//                {this.state.output === "" ? "No Content" : this.state.output}
//              </Text>
//            </ScrollView>
 
//            <View style={styles.inputContainer}>
//              <Text>Send</Text>
//              <TextInput
//                style={styles.textInput}
//                onChangeText={text => this.setState({ sendText: text })}
//                value={this.state.sendText}
//                placeholder={"Send Text"}
//              />
//            </View>
//            <View style={styles.line2}>
//              <TouchableOpacity
//                style={this.buttonStyle(this.state.connected)}
//                onPress={() => this.handleSendButton()}
//                disabled={!this.state.connected}
//              >
//                <Text style={styles.buttonText}>Send</Text>
//              </TouchableOpacity>
//              <TouchableOpacity
//                style={styles.button}
//                onPress={() => this.handleClearButton()}
//              >
//                <Text style={styles.buttonText}>Clear</Text>
//              </TouchableOpacity>
//              <TouchableOpacity
//                style={styles.button}
//                onPress={() => this.handleConvertButton()}
//              >
//                <Text style={styles.buttonText}>Convert</Text>
//              </TouchableOpacity>
//            </View>
 
//            <View style={styles.line2}>
//              <View style={styles.inputContainer}>
//                <Text>Baud Rate</Text>
//                <TextInput
//                  style={styles.textInput}
//                  onChangeText={text => this.setState({ baudRate: text })}
//                  value={this.state.baudRate}
//                  placeholder={"Baud Rate"}
//                />
//              </View>
//              <View style={styles.inputContainer}>
//                <Text>Interface</Text>
//                <TextInput
//                  style={styles.textInput}
//                  onChangeText={text => this.setState({ interface: text })}
//                  value={this.state.interface}
//                  placeholder={"Interface"}
//                />
//              </View>
//            </View>
//            <View style={styles.inputContainer}>
//              <Text>Device List</Text>
//              <Picker
//                enabled={
//                  this.state.deviceList.length > 0 &&
//                  !this.state.deviceList[0].placeholder
//                }
//                selectedValue={this.state.selectedDevice}
//                onValueChange={(value, index) =>
//                  this.setState({ selectedDevice: value })
//                }
//              >
//                {this.devicePickerItems()}
//              </Picker>
//            </View>
//            <TouchableOpacity
//              style={this.buttonStyle(this.state.selectedDevice)}
//              disabled={!this.state.selectedDevice}
//              onPress={() => this.handleConnectButton()}
//            >
//              <Text style={styles.buttonText}>
//                {this.state.connected ? "Disconnect" : "Connect"}
//              </Text>
//            </TouchableOpacity>
//            <TouchableOpacity
//              style={this.buttonStyle(this.state.selectedDevice)}
//              disabled={!this.state.selectedDevice}
//              onPress={() => {
//                this.checkSupport();
//              }}
//            >
//              <Text style={styles.buttonText}>Check Support</Text>
//            </TouchableOpacity>
//          </View>
//        </ScrollView>
//      );
//    }
//  }
 
//  const styles = StyleSheet.create({
//    full: {
//      flex: 1
//    },
//    body: {
//      flex: 1
//    },
//    container: {
//      flex: 1,
//      marginTop: 20,
//      marginLeft: 16,
//      marginRight: 16
//    },
//    header: {
//      display: "flex",
//      justifyContent: "center"
//      //alignItems: "center"
//    },
//    line: {
//      display: "flex",
//      flexDirection: "row"
//    },
//    line2: {
//      display: "flex",
//      flexDirection: "row",
//      justifyContent: "space-between"
//    },
//    title: {
//      width: 100
//    },
//    value: {
//      marginLeft: 20
//    },
//    output: {
//      marginTop: 10,
//      height: 300,
//      padding: 10,
//      backgroundColor: "#FFFFFF",
//      borderWidth: 1
//    },
//    inputContainer: {
//      marginTop: 10,
//      borderBottomWidth: 2
//    },
//    textInput: {
//      paddingLeft: 10,
//      paddingRight: 10,
//      height: 40,
//      borderBottomWidth: 1,
//      borderColor: 'white',
//      color:'white',
//    },
//    button: {
//      marginTop: 16,
//      marginBottom: 16,
//      paddingLeft: 15,
//      paddingRight: 15,
//      height: 40,
//      justifyContent: "center",
//      alignItems: "center",
//      backgroundColor: "#147efb",
//      borderRadius: 3
//    },
//    buttonText: {
//      color: "#FFFFFF"
//    }
//  });
 
//  export default ManualConnection;