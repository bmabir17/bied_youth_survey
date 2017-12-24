import React,{Component} from 'react';

class Section1 extends Component {
  constructor(props) {
    super(props);
    this.state={
      answers:props.answers,
    }
    this.handleQuestionChange=this.handleQuestionChange.bind(this)
  }

  handleQuestionSubmit(event){
    event.preventDefault();
    var answers=this.state.answers;
    this.props.onSubmit(answers);


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
  render(){
    return(

      <span>
        <h3 className="text-center">Education Watch 2017</h3>
        <h3 className="text-center">মূল্যবোধ জরিপ (তরুণদের জন্য)</h3>
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

    );
  }
}

export default Section1;
