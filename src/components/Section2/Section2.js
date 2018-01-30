import React,{Component} from 'react';
import firebase from './../../firebase';
import {Tab,Tabs,Table,Panel,Grid,Col,Row,ListGroup,ListGroupItem,Button,FormGroup,ControlLabel,FormControl} from 'react-bootstrap';

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
  handlePreviousButton(key){
    console.log(`Previous Tab  Selected`);
    this.setState({tabKey:key},function(){
        console.log(this.state);
      });
  }

  render(){


    var questionArray=this.state.questions;
    var choiceArray3=this.state.sectionChoice;
    
    //console.log(choiceArray);
    return(

      <span >
        <h3 className="text-center">Education Watch 2017</h3>
        <h3 className="text-center">মূল্যবোধ জরিপ (তরুণদের জন্য)</h3>
        <Panel >
        <Grid>
        <Tabs className=""  id="tab-example" activeKey={this.state.tabKey} >
          
          <Tab eventKey={1} title="Section 1">
            <form className="questionContainer" id="questionContainer1" onSubmit={(e)=>this.handleTabSelect(2,e)} >
              <Row>
              {Object.keys(questionArray).map((i) => { //itterate to get key values of the array
                    
                    var ques=questionArray[i];         //use a key value and get a pariticular element
                    var choiceArray=ques.choice;
                    if(ques.section==="section1"){
                      if(ques.button==="radio"){                                       
                        return (
                          <Col xs={9} md={6} >
                            <Row>
                              <div key={i}>
                                <Col xs={9} md={6}>
                                  <label >{ques.question_name}) {ques.text}</label>
                                  <br/>
                                </Col>
                              
                                <Col xs={9} md={6}>
                                {Object.keys(choiceArray).map((c) => {
                                      var choice=choiceArray[c];
                                      return (                                        
                                        <span className="radio-choice" key={c+1} style={{alignItems:'right'}}>
                                        <input style={{marginRight:5}} className=""  type={ques.button} name={ques.question_name} value={ques.question_name+"_"+c+1} onChange={(e) => this.handleQuestionChange(e,ques.question_name)}   />
                                        
                                        {choice}  
                                        <br/>
                                        </span>                                        
                                      )
                                    },ques
                                  )
                                }
                                </Col>
                                <hr/>
                              </div>
                            </Row>
                          </Col>
                        )
                      }else if(ques.button==="text_box"){
                        return (
                          <Col xs={9} md={6} style={{paddingRight:10}}>
                            <Row>
                              <span key={i}>
                                <Col xs={6} md={4}>
                                <label >{ques.question_name}) {ques.text}</label>
                                </Col>
                                <Col xs={12} md={8}>
                                  <input type="text" name={ques.question_name} onChange={(e) => this.handleQuestionChange(e,ques.question_name)} />
                                </Col>
                                <br/>
                              </span>
                            </Row>
                          </Col>
                        )
                      }
                      else if(ques.button==="selector"){
                        return (
                          <Col xs={9} md={6} style={{paddingRight:10}}>
                            <Row>
                              
                                <FormGroup key={i}>
                                  <Col xs={6} md={4}>
                                    <ControlLabel>{ques.question_name}) {ques.text}</ControlLabel>
                                  </Col>
                                  <Col xs={12} md={8}>
                                    <FormControl componentClass="select" placeholder="select Division">
                                      
                                      {Object.keys(choiceArray).map((c) => {
                                          var choice=choiceArray[c];
                                          return (                                            
                                              
                                              <option key={c} value={ques.question_name+"_"+c+1} onChange={(e) => this.handleQuestionChange(e,ques.question_name)}>{choice.name}</option>                                                
                                                                                          
                                          )
                                        },ques
                                      )
                                      }
                                    </FormControl>
                                  </Col>
                                </FormGroup>                                
                              
                            </Row>
                          </Col>
                        )
                      }
                    }
                  }
                )

              }
              </Row>

              <input type="submit" value="Next Section" />
            </form>
          </Tab>
          
          <Tab eventKey={2} title="Section 2">
            <form className="questionContainer" id="questionContainer2" onSubmit={(e)=>this.handleTabSelect(3,e)}>
              <Row>
              {Object.keys(questionArray).map((i) => { //itterate to get key values of the array
                    
                    var ques=questionArray[i];         //use a key value and get a pariticular element
                    var choiceArray=ques.choice;
                    if(ques.section==="section2"){
                      if(ques.button==="radio"){                                       
                        return (
                          <Col xs={9} md={6} >
                            <Row>
                              <span key={i}>
                                <Col xs={9} md={6}>
                                  <label >{ques.question_name}) {ques.text}</label>
                                  <br/>
                                </Col>
                              
                                <Col xs={9} md={6}>
                                {Object.keys(choiceArray).map((c) => {
                                      var choice=choiceArray[c];
                                      return (
                                        
                                        <span className="radio-choice" key={c+1} style={{alignItems:'right'}}>
                                        <input style={{marginRight:5}} className=""  type={ques.button} name={ques.question_name} value={ques.question_name+"_"+c+1} onChange={(e) => this.handleQuestionChange(e,ques.question_name)}   />
                                        
                                        {choice}  
                                        <br/>
                                        </span>
                                        
                                      )
                                    },ques
                                  )
                                }
                                </Col>
                                <br/>
                              </span>
                            </Row>
                          </Col>
                        )
                      }else if(ques.button==="text_box"){
                        return (
                          <Col xs={9} md={6} style={{paddingRight:10}}>
                            <Row>
                              <span key={i}>
                                <Col xs={6} md={4}>
                                <label >{ques.question_name}) {ques.text}</label>
                                </Col>
                                <Col xs={12} md={8}>
                                  <input type="text" name={ques.question_name} onChange={(e) => this.handleQuestionChange(e,ques.question_name)} />
                                </Col>
                                <br/>
                              </span>
                            </Row>
                          </Col>
                        )
                      }
                    }
                  }
                )

              }
              </Row>
              <Button onClick={()=>this.handlePreviousButton(1)}>Previous Section</Button>
              <input type="submit" value="Next Section" />
            </form>
          </Tab>
          <Tab eventKey={3} title="Section 3">
            <form className="questionContainer" id="questionContainer3" onSubmit={this.handleQuestionSubmit.bind(this)}>
              
              {Object.keys(questionArray).map((i) => { //itterate to get key values of the array
                    
                    var ques=questionArray[i];         //use a key value and get a pariticular element
                    
                    if(ques.section==="section3"){
                      if(ques.button==="radio"){                                       
                        return (
                          
                            <Row>
                              <span key={i}>
                                <Col xs={11} md={8}>
                                  <label >{ques.question_name}) {ques.text}</label>
                                  <br/>
                                </Col>
                              
                                <Col xs={7} md={4}>
                                {Object.keys(choiceArray3).map((c) => {
                                      var choice=choiceArray3[c];
                                      return (
                                        
                                        <span className="radio-choice" key={c+1} style={{alignItems:'right'}}>
                                        <input style={{marginRight:5}} className=""  type={ques.button} name={ques.question_name} value={ques.question_name+"_"+c+1} onChange={(e) => this.handleQuestionChange(e,ques.question_name)}   />
                                        
                                        {choice}  
                                        <br/>
                                        </span>
                                        
                                      )
                                    },ques
                                  )
                                }
                                </Col>
                                <br/>
                              </span>
                            </Row>
                          
                        )
                      }
                    }
                  }
                )

              }
              
              
              <Button onClick={()=>this.handlePreviousButton(2)}>Previous Section</Button>
              <input type="submit" value="Submit"/>
            </form>
          </Tab>
          <Tab eventKey={4} title="Section 4" disabled>
            Tab 4 content
          </Tab>
        </Tabs>
        </Grid>
        </Panel>
        
      
      </span>

    );
  }
}

export default Section2;
