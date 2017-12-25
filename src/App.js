import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Section1 from './components/Section1/Section1';
import Section2 from './components/Section2/Section2';
import Header from './components/Header/Header';
import Dashboard from './components/Admin/Dashboard/Dashboard';
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
//var surveyId=0;
firebase.initializeApp(config);
class App extends Component {
  constructor(props){
    //surveyId+=1;
    super(props);
    this.state={
      id:uuid.v1(),
      //sId:surveyId,
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
      //2nd state // section2
      user=<span>
        <h2>Hi {this.state.name},Please answer the following questions for</h2>

      </span>
      questions=<Section2
                  answers={this.state.answers}
                  onSubmit={this.section2Submit.bind(this)}
                />

    }else if(!this.state.name && this.state.submitted === false){
      //1st state,new user //section 1
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
        <Header />
        <header className="App-header text-center">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BIED Surveys</h1>
        </header>
        <Switch>

        <Route exact path='/' render={()=>(
          <span>
            <div className="text-center">
                {user}
            </div>
            <div className="questionContainer">
                {questions}
            </div>
          </span>
        )}/>
        <Route exact path='/Dashboard' render={()=>(
          <Dashboard/>
        )}/>
        


        </Switch>

      </div>

    );
  }
}

export default App;
