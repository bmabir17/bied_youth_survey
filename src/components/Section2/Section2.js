import React,{Component} from 'react';
import firebase from './../../firebase';

import {Tab,Tabs} from 'react-bootstrap';
import './Section2.css';
import $ from 'jquery';



var questionRef=firebase.database().ref('Questions');
var sectionRef=firebase.database().ref('Sections');
var survey_name;

class Section2 extends Component {
  constructor(props) {
    super(props);
    survey_name=props.survey_name;
    this.state={
      
      answers:props.answers,
      questions:[],
      sectionChoice:[],
      tabKey:1,

    }
    this.handleQuestionChange=this.handleQuestionChange.bind(this)
  }
  getSectionChoice(){
    sectionRef.once("value").then(function(snapshot){
      var childVal=snapshot.val();
      return childVal[survey_name];
    }).then((response)=>{
      //console.log(response);
      this.setState({sectionChoice:response.section3},()=>{
        //console.log(this.state);
        //console.log("section choice saved in state");
      });
    }).catch((error)=>{console.log(error)});
  }
  getQuestionData(){
    
    questionRef.once("value").then(function(snapshot){
      
      var childVal=snapshot.val();
      var questions=childVal[survey_name];
      //console.log(questions);
      return questions;
      
    }).then((response)=>{
            //console.log(response);
            //console.log(JSON.stringify(response.occupations));
            //AsyncStorage.setItem('product',JSON.stringify(response.banks));
            this.setState({questions:response},()=>{
                //console.log('question array saved in state');
                //console.log(this.state);
            });
        }).catch((error)=>{console.log(error)});
  }
  componentDidMount(){
    //console.log("components mounted");
    this.getQuestionData();
    this.getSectionChoice();
    //console.log(this.state);
  }

  handleQuestionSubmit(event){
    event.preventDefault();
    var answers=this.state.answers;
    this.props.onSubmit(answers);

  }
  handleQuestionChange(event,quesName){
    console.log(event.target.value);
    console.log(quesName);
    var answers=this.state.answers;
    answers[quesName]=event.target.value;
    this.setState({answers:answers},function () {
      console.log(this.state);
    });
  }
  handleTabSelect(key,event){
    event.preventDefault();
    console.log(`Tab  Selected`);
    console.log(event.target.id);
    if($('#'+event.target.id)[0].checkValidity()){
      console.log('form is valid');
      this.setState({tabKey:key},function(){
        console.log(this.state);
      });
    }else{
      console.log('form is not valid');
      $('#'+event.target.id).find(':submit').click()
    }
    
  }
  render(){


    var questionArray=this.state.questions;
    var choiceArray3=this.state.sectionChoice;
    //console.log(choiceArray);
    return(

      <span>
        <h3 className="text-center">Education Watch 2017</h3>
        <h3 className="text-center">মূল্যবোধ জরিপ (তরুণদের জন্য)</h3>
        
        <Tabs  id="tab-example" activeKey={this.state.tabKey} >

          <Tab eventKey={1} title="Section 1">
            <form className="questionContainer" id="questionContainer1" onSubmit={(e)=>this.handleTabSelect(2,e)} >
              {Object.keys(questionArray).map((i) => { //itterate to get key values of the array
                    var ques=questionArray[i];         //use a key value and get a pariticular element
                    var choiceArray=ques.choice;
                    if(ques.section==="section1"){
                      if(ques.button==="radio"){                                       
                        return (
                          <span key={i}>
                            <label >{ques.question_name}) {ques.text}</label>
                            <br/>
                            {choiceArray.map((choice, c) => {
                                  return (
                                    <span className="radio-choice" key={c+1}>
                                    <input type={ques.button} name={ques.question_name} value={ques.question_name+"_"+c+1} onChange={(e) => this.handleQuestionChange(e,ques.question_name)} required/>
                                    {choice}  
                                    
                                    </span>
                                  )
                                },ques
                              )
                            }
                            <br/>
                          </span>
                        )
                      }else if(ques.button==="text_box"){
                        return (
                          <span key={i}>
                            <label >{ques.question_name}) {ques.text}</label>
                            <br/>
                            <input type="text" name={ques.question_name} onChange={(e) => this.handleQuestionChange(e,ques.question_name)} required/>
                            <br/>
                          </span>
                        )
                      }
                    }
                  }
                )
              }
              <input type="submit" value="Next Section" />
            </form>
          </Tab>
          <Tab eventKey={2} title="Section 2">
            <form className="questionContainer" id="questionContainer2" onSubmit={(e)=>this.handleTabSelect(3,e)}>
              {Object.keys(questionArray).map((i) => { //itterate to get key values of the array
                    var ques=questionArray[i];         //use a key value and get a pariticular element
                    var choiceArray=ques.choice;
                    if(ques.section==="section2"){
                      if(ques.button==="radio"){                                       
                        return (
                          <span key={i}>
                            <label >{ques.question_name}) {ques.text}</label>
                            <br/>
                            {choiceArray.map((choice, c) => {
                                  return (
                                    <span className="radio-choice" key={c}>
                                    <input type={ques.button} name={ques.question_name} value={ques.question_name+"_"+c} onChange={(e) => this.handleQuestionChange(e,ques.question_name)} required/>
                                    {choice}  
                                    
                                    </span>
                                  )
                                },ques
                              )
                            }
                            <br/>
                          </span>
                        )
                      }else if(ques.button==="text_box"){
                        return (
                          <span key={i}>
                            <label >{ques.question_name}) {ques.text}</label>
                            <br/>
                            <input type="text" name={ques.question_name} onChange={(e) => this.handleQuestionChange(e,ques.question_name)} required/>
                            <br/>
                          </span>
                        )
                      }
                    }
                  }
                )
              }
              <input type="submit" value="Next Section" />
            </form>
          </Tab>
          <Tab eventKey={3} title="Section 3">
            <form className="questionContainer" id="questionContainer3" onSubmit={this.handleQuestionSubmit.bind(this)}>
              {Object.keys(questionArray).map((i) => { //itterate to get key values of the array
                    var ques=questionArray[i];         //use a key value and get a pariticular element

                    if(ques.section==="section3" && ques.button==="radio"){                                        
                      return (
                        <span key={i}>
                          <label >{ques.question_name}) {ques.text}</label>
                          <br/>
                          {choiceArray3.map((choice, c) => {
                                return (
                                  <span className="radio-choice" key={c}>
                                  <input type={ques.button} name={ques.question_name} value={ques.question_name+"_"+c} onChange={(e) => this.handleQuestionChange(e,ques.question_name)} required/>
                                  {choice}  
                                  
                                  </span>
                                )
                              },ques
                            )
                          }
                          <br/>
                        </span>
                      )
                    }
                  }
                )
              }
              <input type="submit" value="Submit"/>
            </form>
          </Tab>
          <Tab eventKey={4} title="Section 4" disabled>
            Tab 4 content
          </Tab>
        </Tabs>
        
      
      </span>

    );
  }
}

export default Section2;
