import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
    this.handleQuestionChange=this.handleQuestionChange.bind(this)
  }
  handleNameSubmit(event){
    var name=this.refs.name.value;
    this.setState({name:name},function () {
      console.log(this.state);
    });
    var email=this.refs.email.value;
    this.setState({email:email},function () {
      console.log(this.state);
    });
    var org=this.refs.org.value;
    this.setState({org:org},function () {
      console.log(this.state);
    });

    event.preventDefault();
  }
  handleQuestionSubmit(event){

    firebase.database().ref('youth_surveys/'+this.state.id).set({
      name: this.state.name,
      answers:this.state.answers,
      date:this.state.date
    });
    this.setState({submitted:true},function () {
      console.log("question submitted");
    });
    event.preventDefault();
  }
  handleQuestionChange(event){
    console.log(event.target.value);
    var answers=this.state.answers
    if(event.target.name ==="q1"){
      answers.q1=event.target.value;
    }else if (event.target.name ==="q2") {
      answers.q2=event.target.value;
    }
    this.setState({answers:answers},function () {
      console.log(this.state);
    });
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
      questions=<span>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
          <label>Q1) স্বচ্ছন্দ জীবন ও যথেষ্ট অর্থ উপার্জন জীবনের প্রধান উদ্দেশ্য; এটাই আমাদের চাহিদা পূরণ এবং সুখী জীবনের জন্য প্রয়োজন।</label>
          <br/>
          <input type="radio" name="q1" value="q1_1" onChange={this.handleQuestionChange} />
            আমি এই বিষয়টি নিয়ে ভাবিনি
          <br/>
          <input type="radio" name="q1" value="q1_2" onChange={this.handleQuestionChange}/>
            আমি এই বক্তব্য এর সাথে সম্পূর্ণ এক মত
          <br/>
          <input type="radio" name="q1" value="q1_3" onChange={this.handleQuestionChange}/>
          আমি এই বক্তব্য এর সাথে আংশিকভাবে একমত
          <br/>
          <input type="radio" name="q1" value="q1_4"onChange={this.handleQuestionChange}/>
          আমি এই বক্তব্য মোটেই সমর্থন করি না
          <br/>
          <input type="radio" name="q1" value="q1_5" onChange={this.handleQuestionChange}/>
          এ সম্বন্ধে আমার কোন মতামত নেই
          <br/>

          <label>Q2) পরীক্ষায় ভাল ফল পাওয়ার জন্য কোনো কোনো ক্ষেত্রে অসদোপায় অবলম্বন করার প্রয়োজন হয়।</label>
          <br/>
          <input type="radio" name="q2" value="q2_1" onChange={this.handleQuestionChange} />
            আমি এই বিষয়টি নিয়ে ভাবিনি
          <br/>
          <input type="radio" name="q2" value="q2_2" onChange={this.handleQuestionChange}/>
            আমি এই বক্তব্য এর সাথে সম্পূর্ণ এক মত
          <br/>
          <input type="radio" name="q2" value="q2_3"onChange={this.handleQuestionChange}/>
          আমি এই বক্তব্য এর সাথে আংশিকভাবে একমত
          <br/>
          <input type="radio" name="q2" value="q2_4" onChange={this.handleQuestionChange}/>
          আমি এই বক্তব্য মোটেই সমর্থন করি না
          <br/>
          <input type="radio" name="q2" value="q2_5" onChange={this.handleQuestionChange}/>
          এ সম্বন্ধে আমার কোন মতামত নেই
          <br/>
          <input type="submit" value="Submit"/>
        </form>
      </span>

    }else if(!this.state.name && this.state.submitted === false){
      //1st state,new user
      user= <span>
        <h2>Youth Surveys</h2>
        <h3>
          To get started, Register as survey respondant
        </h3>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
            <input type="text" placeholder=" Your Name" ref="name" required/>
          <br/>
            <input type="text" placeholder=" Email address" ref="email" required/>
          <br/>
          <select className="selector" ref="org" required>
            <option value="BRAC University">BRAC University</option>
            <option defaultValue value="BYLC">BYLC</option>
            <option defaultValue value="Others">Others</option>
          </select>
          <br/>
          <input type="submit" value="Next"/>
        </form>
        <div>
          <p>
            Your Name and Email Address will not be used with research data collected
          </p>
        </div>
      </span>;
      questions="";
    }else if(this.state.name && this.state.submitted === true){
      //submitted state

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
