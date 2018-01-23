import React,{Component} from 'react';
import firebase from './../../../firebase';
import {Table,Panel,Grid,Col,Row,ListGroup,ListGroupItem} from 'react-bootstrap';

var responseRef=firebase.database().ref('Response');
var survey_name;
var json2csv = require('json2csv');
var firebaseToCsv = require('firebase-to-csv')
var fileDownload = require('react-file-download');
var res_ans=[];


class ViewSurveyResult extends Component {
	constructor(props) {
	    super(props);
	    survey_name=props.survey_name;
	    this.state={
	      result: [],
	      res_ans_json:{}
	      

	    }
	    
	}
	getResponseData(){
    
    	responseRef.once("value").then(function(snapshot){
			var childVal=snapshot.val();
			var result=childVal[survey_name];
			//console.log(questions);
			return result;
      
    	}).then((response)=>{
            //console.log(response);
            //console.log(JSON.stringify(response.occupations));
            //AsyncStorage.setItem('product',JSON.stringify(response.banks));
            this.setState({result:response},()=>{
                //console.log('question array saved in state');
                //console.log(this.state);
            });
        }).catch((error)=>{console.log(error)});
	}
	componentDidMount(){
		//console.log("components mounted");
		this.getResponseData();
		
		//console.log(this.state);
	}
	exportResult(){
		var fields=['q0','q1','q3','q4','q5'];
		var resultArray=this.state.result;
		for(var key in resultArray){
			if (resultArray.hasOwnProperty(key)) {
		        //console.log(key + " -> " + resultArray[key]);
		        for(var key1 in resultArray[key]){
					if (resultArray[key].hasOwnProperty(key1)) {
				        
				        if(key1==="answers"){
				        	console.log(JSON.stringify(resultArray[key][key1]));
				        }
				    }
				}
		    }
		}
							          	
		//var csv= json2csv({data:res_ans,fields:fields});

		//fileDownload(csv, 'data.csv');
	}
	render() {
		var resultArray=this.state.result;
    	return(
      	<span>
		  	<h3 className="text-center">View Results of {survey_name}</h3>
				<Grid>
					<Row>
						
						<Col xs={18} md={12}>
							<Panel>
								<h3>Survey Results</h3>
								<Table striped bordered condensed hover>
									<thead>
										<tr>
											<th>Date</th>
											<th>Name</th>
											<th>answers</th>
											
										</tr>
									</thead>
									<tbody>
										{Object.keys(resultArray).map((i) => { //itterate to get key values of the array
											var res=resultArray[i];			//use a key value and get a pariticular element
											
						                		return (
						                			<tr key={i}>
														<td>{res.date}</td>
														<td>{res.name}</td>
														{Object.keys(res.answers).map((j) => { //itterate to get key values of the array
															res_ans[j]=res.answers[j];			//use a key value and get a pariticular element
										                		return (
										                			<tr key={j}>
																		<td>{res_ans[j]}</td>																																				
																	</tr>
										                			
											                  	)
										                		
											              	}
											            )
											          	}
													</tr>
						                			
							                  	)
						                		
							              	}
							            )
							          	}										
									</tbody>
								</Table>
								<input type="button" onClick={this.exportResult.bind(this)} value="Donwload Result Data"/>
							</Panel>
						</Col>
					</Row>
				</Grid>

			</span>
    	);
  	}
}
export default ViewSurveyResult;
