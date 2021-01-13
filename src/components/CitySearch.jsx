import React from 'react';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

//Create the ZipSearch
class CitySearch extends React.Component{
    constructor(){
        super();
        this.state ={
            /*Four variables: 
             * The city itself, with a default value of N/A
             * The array of zip codes at said city
             * A bool to let us know if the city is invalid
             * A bool to let us know if the page is loading
             */
            city: "N/A",
            zipCodes: [],
            error: false,
            loading: true
        }
    }  
    //Upon loading once fetch the data for the default city
    componentDidMount(){
        this.fetchNewData(this.state.city)
    }
    //If any changes occur to the input text field, alter the zip code and get new data
    onChange = (event)=>{
        let val = event.target.value.toUpperCase();
        this.setState({
            [event.target.name]: val
        })
        this.fetchNewData(val)
    }
    //Fetch the data for the zip code
    fetchNewData = (city)=>{
        const url = "https://ctp-zip-api.herokuapp.com/city/" + city
        fetch(url).then(response =>{
            if(response.ok){
                //Return the array of Zip Codes at said city
                return response.json()
            } else {
                //Else we got an error
                throw new Error("Error fetching data")
            }
        }).then(data=>{
            //Set array of zipCodes equal to the data, note we are no longer loading nor do we have an error
            this.setState({
                zipCodes: data,
                error: false,
                loading: false
            })
        }).catch(e=>{
            //If we have an error, update these
            this.setState({
                error: true,
                loading: false
            })
        })
    }

    render(){
        return (
            <div>
                {this.state.loading ? <div>Loading. . . </div> : 
                <div>
                    <Jumbotron fluid>
                        <h1><b><i>City Search</i></b></h1>
                    </Jumbotron>
                <form>
                    <label><b>City:</b></label>
                    <input type="text" id="city" name="city" placeholder="Try springfield" onChange={this.onChange}></input>
                </form>
                <Container>
                    <Col>
                {this.state.error === true ? <div>No Results </div> :
                this.state.zipCodes.map((item,index)=>(
                    <div key={index}>
                        <Row className="justify-content-md-center">
                        <Card
                        bg="secondary" 
                        style={{ width: '18rem' }}>
                            <Card.Header as="h5">{item}</Card.Header>
                        </Card>
                        </Row>
                    </div>
                ))
                }
                    </Col>
                </Container>
                </div>}
            </div>
        );
    }
}

export default CitySearch;