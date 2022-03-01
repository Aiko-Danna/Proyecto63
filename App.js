import React, {Component} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';

export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      text:''
    }
  }

  getWord=(word)=>{
    var searchKeyword=word.toLowerCase();
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    return fetch(url)
    .then((data)=>{
      if(data.status===200){
        return data.json()
      }
      else{
        return null
      }
    })
    .then((response)=>{
      var responseObject = response
      if(responseObject){
        var wordData = responseObject.definitions[0]
        var definition = wordData.description
        var lexicalCategory = wordData.wordtype

        this.setState({
          "word": this.state.text,
          "definition": definition,
          "lexicalCategory": lexicalCategory
        })
      }
      else{
        this.setState({
          "word" : this.state.text,
          "definition": "Not Found",
          "lexicalCategory": "Not Found"
        })
      }
    })
  }

  render(){
    return(
      <View>

        <SafeAreaProvider>
          <Header
            backgroundColor={'#f5fe12'}
            centerComponent={{text:'Pocket Dictionary', style:{fontSize:20, padding:5, fontWeight:'bold'}}}
          />
        </SafeAreaProvider>
        
        <TextInput 
        style={styles.inputBox}
        onChangeText={text => {
          this.setState({
            text: text,
            isSearchPressed: false,
            word: "Loading...",
            lexicalCategory: '',
            examples: [],
            definition: ""
          });
        }}
        value={this.state.text}>
        </TextInput>

        <TouchableOpacity 
          style={styles.searchButton}
          onPress={()=>{
            this.setState({isSearchPressed: true});
            this.getWord(this.state.text);
          }}>
          <Text style={styles.words}>Search</Text>
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>
            Word: {" "}
          </Text>
          <Text style={{fontSize:18}}>
            {this.state.word}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>
            Type: {" "}
          </Text>
          <Text style={{fontSize:18}}>
            {this.state.lexicalCategory}
          </Text>
        </View>

        <View style={{marginLeft:15, marginRight:15}}>
          <Text style={styles.detailsTitle}>
            Definition: {" "}
          </Text>
          <Text style={{fontSize:18}}>
            {this.state.definition}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.listenButton}
          onPress={{}}>
          <Text style={{fontSize:18}}>{this.state.word}</Text>
        </TouchableOpacity>
        <Text style={{fontSize:25, marginTop:-37, marginLeft:70}}>🔊</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox:{
    borderWidth:3,
    alignSelf:'center',
    width:'70%',
    height:35,
    textAlign:'center',
    marginTop:50,
    borderRadius:5,
  },
  searchButton:{
    alignSelf:'center',
    justifyContent: 'center',
    borderWidth:2,
    width:115,
    height:35,
    borderRadius:10,
    marginTop:15,
    alignItems:'center',
    backgroundColor:'#a3dbfa',
    margin:50,
  },
  words:{
    fontWeight:'bold',
    fontSize:20,
  },
  detailsTitle:{
    color:'orange',
    fontSize:20,
    fontWeight:'bold',
  },
  detailsContainer:{
    marginLeft:15,
    flexDirection:'row',
  },
  listenButton:{
    alignSelf:'center',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#c5befe',
    borderWidth:2,
    width:170,
    height:35,
    borderRadius:10,
    marginLeft:40,
    marginTop:25,
  }
});