import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput,Image} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { askAsync } from 'expo-permissions';
export default class BookTransactionScreen extends React.Component{
    constructor(){
        super()
        this.state = {
        hasCameraPermissions:'',
        scanned:false,
        scannedBookID:'',
        scannedStudentID:'',
        buttonState:'normal' 
    }
    }
    handleScanData=async({type,data})=>{
        const {buttonState} = this.state
        if (buttonState==="BookID"){
    this.setState({
        scanned:true,
        scannedBookID:data,
        buttonState:'normal',
    })}
    else if (buttonState==="StudentID"){
        this.setState({
            scanned:true,
            scannedStudentID:data,
            buttonState:'normal',
        })
    }
    }
   getPermission=async(ID)=>{
   const {status} = await Permissions.askAsync(Permissions.CAMERA)
   this.setState({
       hasCameraPermissions:status==="granted",
        buttonState:ID,
        scanned:false    
    })
   } 
    render (){
        if (this.state.buttonState!=="normal" && this.state.hasCameraPermissions===true){
        return(
            <BarCodeScanner onBarCodeScanned={this.state.scanned===true?undefined:this.handleScanData}/>
        )
        }
else if (this.state.buttonState==='normal'){


        return (
            <View style={styles.container}>
                <Image source = {require("../assets/booklogo.jpg") }style = {styles.logoStyle}/>
                                    <View style = {styles.boxStyle}>
                        <TextInput placeholder = "BookID" style={styles.textInputStyle}value = {this.state.scannedBookID}/>
                        <TouchableOpacity onPress= {this.getPermission("BookID")} style = {styles.scanningButton}>
                        <Text style = {styles.buttonText}>
                            Scan Book ID
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.boxStyle}>
                            <TextInput placeholder = "Student ID" style={styles.textInputStyle} value = {this.state.scannedStudentID}/>
                            
                            
                    <TouchableOpacity onPress= {this.getPermission("StudentID")} style = {styles.scanningButton}>
                        <Text style = {styles.buttonText}>
                            Scan Student ID 
                            </Text>
                            </TouchableOpacity>
                            </View>
                </View>
        )
        } 
        }
}
const styles = StyleSheet.create ({
    scanningButton:{
    backgroundColor:"black",
    height:100,
    width:150,
    justifyContent:'center',
    alignItems:'center',   
    alignSelf:'center',
    borderRadius:12,
    borderColor:'grey'
    },
    buttonText:{
    color:'white',
    fontSize:30,
    fontStyle:'italic',
    },
    container:{
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    },
    boxStyle:{
      flexDirection:"row",
      margin:20,
                          
    },
    textInputStyle:{
        width: 200,
        height:40,
        borderWidth:1,
        fontSize:20,
        backgroundColor:'white',
    },
    logoStyle:{
        width:100,
        height:100,
    }
})