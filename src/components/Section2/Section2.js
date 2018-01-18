import React,{Component} from 'react';
import firebase from './../../firebase';

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
    /*
    if(event.target.name ==="q1"){
      answers.q1=event.target.value;
    }else if (event.target.name ==="q2") {
      answers.q2=event.target.value;
    }
    */
    this.setState({answers:answers},function () {
      console.log(this.state);
    });
  }
  render(){


    var questionArray=this.state.questions;
    var choiceArray=this.state.sectionChoice;
    //console.log(choiceArray);
    return(

      <span>
        <h3 className="text-center">Education Watch 2017</h3>
        <h3 className="text-center">মূল্যবোধ জরিপ (তরুণদের জন্য)</h3>
        <form className="questionContainer" onSubmit={this.handleQuestionSubmit.bind(this)}>
          {questionArray.map((ques, i) => {                    
                return (
                  <span key={i}>
                    <label >Q{i}) {ques.text}</label>
                    <br/>
                    {choiceArray.map((choice, c) => {
                          return (
                            <span key={c}>
                            <input type={ques.button} name={ques.question_name} value={ques.question_name+"_"+c} onChange={(e) => this.handleQuestionChange(e,ques.question_name)} />
                            {choice}  
                            <br/>
                            </span>
                          )
                        },ques
                      )
                    }
                    <br/>
                  </span>
                )
              }
            )
          }

          

          
          <input type="submit" value="Submit"/>
        </form>
      </span>

    );
  }
}

export default Section2;
