import * as React from 'react'
import {Image, StyleSheet} from 'react-native'
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SearchScreen from './Screens/SearchScreen';
import BookTransactionScreen from './Screens/BookTransactionScreen';

export default class App extends React.Component{
  render(){
    return (
 <AppContainer/>
    )}
   }
const TabNavigator = createBottomTabNavigator({
  Transaction:{screen:BookTransactionScreen},
  Search:{screen:SearchScreen}
},
{defaultNavigationOptions:({navigation})=>({
  tabBarIcon:()=>{
    const RouteName = navigation.state.routeName
    if (RouteName === 'Transaction'){
    return(<Image source = {require("./assets/book.png")}
    style = {styles.ImageStyle}/>  )
    }
    else if (RouteName==='Search'){
      return(<Image source = {require("./assets/searchingbook.png")}
      style = {styles.ImageStyle}/>)
    }
  }
})})
const AppContainer = createAppContainer(TabNavigator)
const styles = StyleSheet.create({
ImageStyle:{
  width:80,
  height:40,
}
})