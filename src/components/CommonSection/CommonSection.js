import React,{Component} from 'react';

class CommonSection extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:props.name,
      email:props.email,
      org:props.org
    }

  }
  handleNameSubmit(event){

    var name=this.refs.name.value;
    this.setState({name:name},function () {
      //console.log(this.state);
    });
    var email=this.refs.email.value;
    this.setState({email:email},function () {
      //console.log(this.state);
    });
    var org=this.refs.org.value;
    this.setState({org:org},function () {
      //console.log(this.state);
    });
    this.props.onChange(name,email,org);

    event.preventDefault();
  }
  render(){
    return(
      <span>
        
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
      </span>

    );
  }
}

export default CommonSection;
