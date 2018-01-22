import React,{Component} from 'react';
import Auth0Lock from 'auth0-lock'; //login Module
import {Panel,PanelGroup,Grid,Col,Row,ListGroup,ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
class Dashboard extends Component {
//For auth0 login
	constructor(props){
		super(props)
		this.state={
			idToken:'',
			profile:{}
		}
	}
	static defaultProps={
		clientId:'hVtaS6vd2vWA2LfCLJOL6So5Ifcxwo66',
		domain:'bied.auth0.com',
		redirectUri: 'http://localhost:3000/Dashboard',
		audience: 'https://bied.auth0.com/userinfo',
		responseType: 'token id_token',
		scope: 'openid',
		autoclose: true,
	}
	componentWillMount(){
		this.lock=new Auth0Lock(this.props.clientId,this.props.domain,{
		  auth:{
		    redirectUri:this.props.redirectUri,
		    responseType:this.props.responseType
		  },
		  scope:this.props.scope,
		  allowSignUp: false,
		  autoclose: this.props.autoclose,
		  
		});

		//On authentication
		this.lock.on('authenticated',(authResult)=>{
		  console.log(authResult);
		  this.lock.getUserInfo(authResult.accessToken,(error,profile)=>{
		    if(error){
		      console.log(error);
		      return;
		    }
		    console.log(profile);
		    this.setLoginData(authResult.accessToken,authResult.idToken,profile);
		  });
		});
	}

	//set accessToken and Profile data
	setLoginData(accessToken,idToken,profile){
		localStorage.setItem('accessToken',accessToken);
		localStorage.setItem('idToken', idToken);
		localStorage.setItem('profile',JSON.stringify(profile));
		this.setState({
		  accessToken:localStorage.getItem('accessToken'),
		  idToken:localStorage.getItem('idToken'),
		  profile:JSON.parse(localStorage.getItem('profile')),

		});
	}
	getLoginData(){
		if(localStorage.getItem('idToken')!=null){
		  
		}
	}
	showLock(){
		this.lock.show();
	}
	componentDidMount(){
		this.showLock();
	}
  
  
	render() {
		var DashView;
		if(this.state.idToken){
			DashView=<div>
				<h3 className="text-center">Your Admin Dashboard</h3>
				<Grid>
					<Row>
						<Col xs={6} md={4}>
							<Panel>
								<h3>Add Survey Question</h3>
								<ListGroup>
									<ListGroupItem><Link to='/add_questions'>youth_survey</Link></ListGroupItem>
									<ListGroupItem>Item 2</ListGroupItem>
									<ListGroupItem>...</ListGroupItem>
								</ListGroup>
							</Panel>
						</Col>
						<Col xs={6} md={4}>
							<Panel>
								<h3>View Surveys Results</h3>
								<ListGroup>
									<ListGroupItem><Link to='/view_result'>youth_survey</Link></ListGroupItem>
									<ListGroupItem>Item 2</ListGroupItem>
									<ListGroupItem>...</ListGroupItem>
								</ListGroup>
							</Panel>
						</Col>
						<Col xs={6} md={4}>
							<Panel>
								<h1>Example 2</h1>
							</Panel>
						</Col>
					</Row>
				</Grid>
			</div>


		}else{
			DashView=<h3 className="text-center" ><a onClick={this.showLock.bind(this)}>Please click here to Login </a></h3>
		}
		return(
		  <div>		    
		    {DashView}
		  </div>
		);
	}
}
export default Dashboard;
