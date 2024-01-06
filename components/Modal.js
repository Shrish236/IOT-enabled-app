import React, { useState} from 'react';
import {Button, View, StyleSheet, Pressable, Text} from 'react-native';
import Modal from 'react-native-modal';
import PickerDemo from './Picker.js';
import axios from 'axios';
const ModalDemo = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nValue, setNValue] = useState(0);
  const [pValue, setPValue] = useState(0);
  const [kValue, setKValue] = useState(0);
  const [pHValue, setpHValue] = useState(0);
  const retrieval = async() =>{
    axios.get('https://api.thingspeak.com/channels/2229009/feeds.json?api_key=33XEX95R8CGGJ2XQ&results=1',{})
    .catch((error) => {
        console.log("jgjhgjh")
        console.log(error)
      })
      .then(function(response){
      console.log("Complaint")
      if(response.data.feeds.length === 0){
        console.log("sddssd")
        alert("Place the sensor correctly to obtain nutrient contents of soil!")
      }
      else{
        console.log(response.data)
        setpHValue(response.data.feeds[0].field1)
        setNValue(response.data.feeds[0].field2)
        setPValue(response.data.feeds[0].field3)
        setKValue(response.data.feeds[0].field4)
        setIsModalVisible(!isModalVisible);
      }
    })
  }

  const toggleModal = () => {
    retrieval();
  };
  return (
<View style={styles.container}>
    <Pressable onPress={toggleModal}>
        {/* {alert('Place the sensor correctly to obtain accurate nutrient content of the soil!')} */}
        <Text style={styles.italicText}>Place the sensor on the soil to obtain NPK values</Text> 
        <View style = {styles.buttonViews}>
        <Pressable style={[{backgroundColor:"#471335"},styles.buttonTwo]} onPress={toggleModal}>
            <Text style={styles.text}>Click</Text>
        </Pressable>
        <Text style={styles.italicText}> to obtain predictions</Text>  
        </View>  
    </Pressable> 
    <Modal
      animationInTiming={2000}
      animationOutTiming={1500}
      animationOut={'slideOutUp'}
      isVisible={isModalVisible}>
      <View style={{backgroundColor: "#2d6b2a"}}>
        <PickerDemo n={nValue} p={pValue} k={kValue} pH={pHValue}/>
        <View style={{marginTop: 10}}>
        <Pressable style={styles.button} onPress={toggleModal}>
            <Text style={styles.text}>Home</Text>
        </Pressable>
        </View>
      </View>
    </Modal>
  </View>
  );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  italicText:{
    color: '#37859b',
    fontStyle: 'italic',
    alignItems:'center',
    textAlign:'center',
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  buttonTwo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    marginRight:10,
    marginTop:10,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  buttonViews: {
    flexDirection:'row',
    paddingHorizontal:30,
    alignItems:'center',
    justifyContent: 'center',
  }
});
export default ModalDemo;