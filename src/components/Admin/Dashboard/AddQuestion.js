import React,{Component} from 'react';
import Auth0Lock from 'auth0-lock'; //login Module
import {Panel,Grid,Col,Row,ListGroup,ListGroupItem} from 'react-bootstrap';

import firebase from './../../../firebase';

var questionRef=firebase.database().ref('Questions');
var sectionRef=firebase.database().ref('Sections');
var survey_name;

class AddQuestion extends Component {
	constructor(props) {
		super(props);
		survey_name=props.survey_name;
		this.state={
		  questions:[],
		  sectionChoice:[],

		  ques_name:'',
		  text:'',
		  button:'',
		  section:'',
		  submitted:'',
		  choice:[],

		  


		}
	}
  	getQuestionData(){
		questionRef.once("value").then(function(snapshot){
			var childVal=snapshot.val();
			var questions=childVal[survey_name];
			console.log(questions);
			return questions;		  
		}).then((response)=>{		        
	        this.setState({questions:response},()=>{		       
	        });
	    }).catch((error)=>{console.log(error)});
	}
	componentDidMount(){
		//console.log("components mounted");
		this.getQuestionData();
		
		//this.getSectionChoice();
		console.log(this.state);
	}
	handleQuestionSubmit(event){
		event.preventDefault();
		var ques_no=this.refs.ques_no.value;
		var button_type=this.refs.button_type.value;
		var question=this.refs.question.value;
		var sectionChoice=this.refs.sectionChoice.value;

		var quesChoice=[];
		/*
		var prefix="ques_choice";
		for(var i=1;i<=10;i++){
			
			var full=prefix+i;
			console.log(this.refs[full].value);
			quesChoice.push(this.refs[full].value);
		}
		*/
		if(this.state.section==="section3" || this.state.button==="text_box"){
			//As choice section is hidden, the refs value are undefined
		}else{
			quesChoice.push(this.refs.ques_choice_1.value);
			quesChoice.push(this.refs.ques_choice_2.value);
			quesChoice.push(this.refs.ques_choice_3.value);
			quesChoice.push(this.refs.ques_choice_4.value);
			quesChoice.push(this.refs.ques_choice_5.value);
			quesChoice.push(this.refs.ques_choice_6.value);
			quesChoice.push(this.refs.ques_choice_7.value);
			quesChoice.push(this.refs.ques_choice_8.value);
			quesChoice.push(this.refs.ques_choice_9.value);
			quesChoice.push(this.refs.ques_choice_10.value);
			quesChoice.push(this.refs.ques_choice_11.value);
			quesChoice.push(this.refs.ques_choice_12.value);
			quesChoice.push(this.refs.ques_choice_13.value);
			quesChoice.push(this.refs.ques_choice_14.value);
			console.log("choice pushed");
		}
		
		
		console.log(quesChoice);
		

		this.setState({question_name:ques_no,
			text:question,
			button:button_type,
			section:sectionChoice,
			choice:quesChoice
		},function () {
		  console.log(this.state);
		  this.questionSubmit();
		});
		
		
		
	}
	questionSubmit(){
		firebase.database().ref('Questions/youth_surveys/').push({
	      question_name: this.state.question_name,
	      text:this.state.text,
	      button:this.state.button,
	      section:this.state.section,
	      choice:this.state.choice,
	    });
	    this.setState({submitted:true},function () {
	      console.log("question submitted");
	    });
	}
	handleSectionChange(event){
		console.log(event.target.value);
		var sectionChoice=event.target.value;

		this.setState({
			section:sectionChoice
		},function () {
		  console.log(this.state);
		  
		});

	}
	handleButtonChange(event){
		console.log(event.target.value);
		var buttonChoice=event.target.value;

		this.setState({
			button:buttonChoice
		},function () {
		  console.log(this.state);
		  
		});

	}
	
		

  
	render() {
		var questionArray=this.state.questions;
		var submitPanel;
		var choiceView;
		if(this.state.submitted){
			submitPanel=<Panel>
				<span>Questions Added</span>
			</Panel>;
		}

		if(this.state.section==="section3"){
			//hide choice
		}else if(this.state.button==="text_box"){
			//hide choice
		}else{
			choiceView=<span>
						<input type="text" placeholder="Choice 1 Text" ref="ques_choice_1"  required/>
						<input type="text" placeholder="Choice 2 Text" ref="ques_choice_2"  required/>
						<input type="text" placeholder="Choice 3 Text" ref="ques_choice_3"  />
						<input type="text" placeholder="Choice 4 Text" ref="ques_choice_4"  />
						<input type="text" placeholder="Choice 5 Text" ref="ques_choice_5"  />
						<input type="text" placeholder="Choice 6 Text" ref="ques_choice_6"  />
						<input type="text" placeholder="Choice 7 Text" ref="ques_choice_7"  />
						<input type="text" placeholder="Choice 8 Text" ref="ques_choice_8"  />
						<input type="text" placeholder="Choice 9 Text" ref="ques_choice_9"  />
						<input type="text" placeholder="Choice 10 Text" ref="ques_choice_10" />
						<input type="text" placeholder="Choice 11 Text" ref="ques_choice_11" />
						<input type="text" placeholder="Choice 12 Text" ref="ques_choice_12" />
						<input type="text" placeholder="Choice 13 Text" ref="ques_choice_13" />
						<input type="text" placeholder="Choice 14 Text" ref="ques_choice_14" />
						
					</span>;
		}
		return(
			<span>
		  	<h3 className="text-center">Add questions to {survey_name}</h3>
				<Grid>
					<Row>
						<Col xs={9} md={6}>
							<Panel>
								<h3>Add Question</h3>
								<form onSubmit={this.handleQuestionSubmit.bind(this)}>
									<input type="text" placeholder="Question Number" ref="ques_no" required />
						            <br/>
						            <input type="text" placeholder="Write Text for Question" ref="question" required/>
						            <br/>
						            
						            <select className="selector" ref="button_type" value={this.state.button} onChange={this.handleButtonChange.bind(this)} required>
						              <option value="radio">Single Choice</option>
						              <option defaultValue value="text_box">Text box</option>
						            </select>
						            <br/>
						            <select className="selector" ref="sectionChoice" value={this.state.section} onChange={this.handleSectionChange.bind(this)} required>
						              <option value="section1" >Section 1</option>
						              <option value="section2" >Section 2</option>
						              <option value="section3" >Section 3</option>						              
						            </select>
						            <br/>
						            {choiceView}
						            <input type="submit" value="Submit"/>
						        </form>
							</Panel>
							{submitPanel}
							
						</Col>
						<Col xs={9} md={6}>
							<Panel>
								<h3>Current Questions</h3>
								<ListGroup>
									<h4>Section 1</h4>
									{Object.keys(questionArray).map((i) => { //itterate to get key values of the array
										var ques=questionArray[i];			//use a key value and get a pariticular element
										if(ques.section==="section1"){
					                		return (<span key={i+1}>
						                    	<ListGroupItem>{ques.question_name} {ques.text}</ListGroupItem>							                    						                    
						                  	</span>
						                  	)
					                	}	
						              	}
						            )
						          	}
					          	</ListGroup>
								<ListGroup>
									<h4>Section 2</h4>
									{Object.keys(questionArray).map((i) => { //itterate to get key values of the array
										var ques=questionArray[i];			//use a key value and get a pariticular element
										if(ques.section==="section2"){
					                		return (<span key={i+1}>
						                    	<ListGroupItem>{ques.question_name} {ques.text}</ListGroupItem>							                    						                    
						                  	</span>
						                  	)
					                	}	
						              	}
						            )
						          	}
					          	</ListGroup>
					          	<ListGroup>
									<h4>Section 3</h4>
									{Object.keys(questionArray).map((i) => { //itterate to get key values of the array
										var ques=questionArray[i];			//use a key value and get a pariticular element
										
										if(ques.section==="section3"){
					                		return (<span key={i+1}>
						                    	<ListGroupItem>{ques.question_name} {ques.text}</ListGroupItem>							                    						                    
						                  	</span>
						                  	)
					                	}	
						              	}
						            )
						          	}
					          	</ListGroup>
							</Panel>
						</Col>
						
					</Row>
				</Grid>
			</span>
		);
	}
}
export default AddQuestion;
