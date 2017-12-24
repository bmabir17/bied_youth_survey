import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Section1 from './components/Section1/Section1';
import Section2 from './components/Section2/Section2';
var uuid = require('uuid');
// Initialize Firebase
var firebase=require('firebase');
var config = {
  apiKey: "AIzaSyCRLPV54LXeJ3drZl4HMin6Bcl5kPIXxQM",
  authDomain: "bied-survey.firebaseapp.com",
  databaseURL: "https://bied-survey.firebaseio.com",
  projectId: "bied-survey",
  storageBucket: "bied-survey.appspot.com",
  messagingSenderId: "418768995032"
};
firebase.initializeApp(config);
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      id:uuid.v1(),
      name:'',
      email:'',
      org:'',
      answers:{
        q1:'',
        q2:''
      },
      date:Date().toString(),
      submitted: false
    }

  }

  handleSurveySubmit(){

    firebase.database().ref('youth_surveys/'+this.state.id).set({
      name: this.state.name,
      answers:this.state.answers,
      date:this.state.date
    });
    this.setState({submitted:true},function () {
      console.log("question submitted");
    });
  }

  nameChange(name,email,org){
    this.setState({name:name},function(){
      console.log(this.state);
    });
    this.setState({email:email},function(){
      console.log(this.state);
    });
    this.setState({org:org},function(){
      console.log(this.state);
    });
    //event.preventDefault();
  }
  section2Submit(answers){
    this.setState({answers:answers},function () {
      console.log(this.state);
    });
    this.handleSurveySubmit();
  }

  render() {
    var user;
    var questions;
    if(this.state.name && this.state.submitted === false){
      //2nd state
      user=<span>
        <h2>Hi {this.state.name}</h2>
        <h3>Please answer the following questions</h3>
      </span>
      questions=<Section2
                  answers={this.state.answers}
                  onSubmit={this.section2Submit.bind(this)}
                />

    }else if(!this.state.name && this.state.submitted === false){
      //1st state,new user
      user= <span>
        <Section1 name={this.state.name}
          email={this.state.email}
          org={this.state.org}
          onChange={this.nameChange.bind(this)}
        />
      </span>;
      questions="";
    }else if(this.state.name && this.state.submitted === true){
      //submitted state
      user=<span>
        <h3>Thank you {this.state.name} for your time </h3>
      </span>

    }
    return (
      <div className="App ">
        <header className="App-header text-center">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BIED Surveys</h1>
        </header>
        <div className="text-center">
            {user}

        </div>
        <div className="questionContainer">
            {questions}
        </div>

      </div>

    );
  }
}

export default App;
