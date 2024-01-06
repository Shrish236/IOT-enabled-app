import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, Pressable, ActivityIndicator} from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { Avatar, Card } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';

const soilTypes = [
    { label: 'Alluvial Soil', value: '0' },
    { label: 'Black Soil', value: '1' },
    { label: 'Clayey Soil', value: '2' },
    { label: 'Laterite Soil', value: '3' },
    { label: 'Loamy Soil', value: '4' },
    { label: 'Red Soil', value: '5' },
    { label: 'Sandy Soil', value: '6' },
  ];
const seasonTypes = [
    { label: 'Kharif', value: '0' },
    { label: 'Rabi', value: '1' },
  ];
const districts = [
    { label: "Ariyalur", value: "Ariyalur" },
    { label: "Chengalpattu", value: "Chengalpattu" },
    { label: "Chennai", value: "Chennai" },
    { label: "Coimbatore", value: "Coimbatore" },
    { label: "Cuddalore", value: "Cuddalore" },
    { label: "Dharmapuri", value: "Dharmapuri" },
    { label: "Dindigul", value: "Dindigul" },
    { label: "Erode", value: "Erode" },
    { label: "Kallakurichi", value: "Kallakurichi" },
    { label: "Kancheepuram", value: "Kancheepuram" },
    { label: "Kanniyakumari", value: "Kanniyakumari" },
    { label: "Karur", value: "Karur" },
    { label: "Krishnagiri", value: "Krishnagiri" },
    { label: "Madurai", value: "Madurai" },
    { label: "Nagapattinam", value: "Nagapattinam" },
    { label: "Namakkal", value: "Namakkal" },
    { label: "Nilgiris", value: "Nilgiris" },
    { label: "Perambalur", value: "Perambalur" },
    { label: "Pudukkottai", value: "Pudukkottai" },
    { label: "Ramanathapuram", value: "Ramanathapuram" },
    { label: "Ranipet", value: "Ranipet" },
    { label: "Salem", value: "Salem" },
    { label: "Sivaganga", value: "Sivaganga" },
    { label: "Tenkasi", value: "Tenkasi" },
    { label: "Thanjavur", value: "Thanjavur" },
    { label: "Theni", value: "Theni" },
    { label: "Thoothukudi", value: "Thoothukudi" },
    { label: "Tiruchirappalli", value: "Tiruchirappalli" },
    { label: "Tirunelveli", value: "Tirunelveli" },
    { label: "Tirupathur", value: "Tirupathur" },
    { label: "Tiruppur", value: "Tiruppur" },
    { label: "Tiruvallur", value: "Tiruvallur" },
    { label: "Tiruvannamalai", value: "Tiruvannamalai" },
    { label: "Tiruvarur", value: "Tiruvarur" },
    { label: "Vellore", value: "Vellore" },
    { label: "Viluppuram", value: "Viluppuram" },
    { label: "Virudhunagar", value: "Virudhunagar" }
  ];
  
const PickerDemo = (props) => {
    const [landAreaValue, setLandAreaValue] = useState(null);
    const [soilTypeValue, setSoilTypeValue] = useState(null);
    const [seasonValue, setSeasonValue] = useState(null);
    const [districtValue, setDistrictValue] = useState(null);
    const [phValue, setPhValue] = useState(props.pH);
    const [nitrogenValue, setNitrogenValue] = useState(props.n);
    const [phosphorusValue, setPhosphorusValue] = useState(props.p);
    const [potassiumValue, setPotassiumValue] = useState(props.k);
    
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false)

    const [predictions, setPredictions] = useState([])
    const predict = async() =>{
      axios.post('http://192.168.101.114:90/home',{
          area: landAreaValue,
          soil_type: soilTypeValue,
          season: seasonValue,
          district: districtValue,
          ph: phValue,
          nitrogen: nitrogenValue,
          phosphorus: phosphorusValue,
          potassium: potassiumValue
        })
        .catch((error) => {
          console.log("jgjhgjh")
          console.log(error)
        })
        .then(function(response){
        console.log("Complaint")
        if(response.data === null){
          console.log("sddssd")
          alert("Enter correct details and try again")
        }
        else{
          console.log(response.data)
          setLoading1(false);
          setPredictions(response.data)
          alert("Predicted Crop: " + response.data.Crop + "\n\nPredicted Yield (Tons): " + response.data.Yield)
          // router.push({
          //   pathname: "userDashboard",
          // });
          // setComplaintDetails(response.data)
          // setLoading2(false);
        }
      })
    }

    const reset = () =>{
      setLandAreaValue(null);
      setDistrictValue(null);
      setSoilTypeValue(null);
      setSeasonValue(null);
      setPhValue(0);
      setNitrogenValue(0);
      setPhosphorusValue(0);
      setPotassiumValue(0);
    }

  if(setLoading1===true){
    return (
      <View style={{marginTop:10, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator size="large">{}</ActivityIndicator>
      </View>
    );
  }
  return (
    <ScrollView>
    <View style={styles.design}>
      <View>
        <Card style = {{marginTop:10,}}>
            <Card.Title titleStyle={styles.cardTitle} title="Your Soil Details"/>
            <Card.Content>
            <Text style={styles.cardText} variant="titleLarge">Nitrogen (Kg/Ha): {nitrogenValue}</Text>
            <Text style={styles.cardText} variant="titleLarge">Phosphorus (Kg/Ha): {phosphorusValue}</Text>
            <Text style={styles.cardText} variant="titleLarge">Potassium (Kg/Ha): {potassiumValue}</Text>
            <Text style={styles.cardText} variant="titleLarge">pH: {phValue}</Text>
            </Card.Content>
            {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
            {/* <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
            </Card.Actions> */}
        </Card>
        <Text style={styles.formLabel}> Enter the following Details </Text>
        <TextInput placeholder="Land Area (Ha)" style={styles.inputStyle}
        placeholderTextColor='black' 
        keyboardType='numeric'
        onChangeText={text => setLandAreaValue(text)}
        value={landAreaValue} 
        />
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={soilTypes}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Soil Type"
        searchPlaceholder="Search..."
        value={soilTypeValue}
        onChange={item => {
          setSoilTypeValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        />
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={seasonTypes}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Season Type"
        searchPlaceholder="Search..."
        value={seasonValue}
        onChange={item => {
          setSeasonValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        />
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={districts}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select District"
        searchPlaceholder="Search..."
        dropdownPosition='top'
        value={districtValue}
        onChange={item => {
          setDistrictValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        />
        <View style = {styles.buttonViews}>
        <Pressable style={[{backgroundColor:"#ebe836"},styles.button]} onPress= {() =>{
          setLoading1(true);
          predict();
        }}>
            <Text style={[styles.text,{color:'black'}]}>Submit</Text>
        </Pressable>
        <Pressable style={[{backgroundColor:"#471335"},styles.button]} onPress={reset}>
            <Text style={styles.text}>Reset</Text>
        </Pressable>
       </View>
       </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#356859',
  },
  design:{
    alignItems: 'center',
    justifyContent: 'center',
  },

  formLabel: {
    textAlign:'center',
    marginTop:10,
    marginBottom:10,
    fontSize: 20,
    color: '#fff',
  },
  inputStyle: {
    marginTop: 10,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#b9e4c9',
    marginBottom:10,
    color:'black',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  cardTitle:{
    fontStyle: 'italic',
    fontSize:20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardText:{
    marginTop:5,
    marginBottom:5,
    fontSize: 15, 
    fontStyle: 'italic'
  },
  dropdown: {
    marginBottom:10,
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: '#b9e4c9',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
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
    flexDirection:'row-reverse',
    paddingHorizontal:30,
    alignItems:'center',
    justifyContent: 'center',
  }
});

export default PickerDemo;