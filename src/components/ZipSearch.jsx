import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

//Create the ZipSearch
class ZipSearch extends React.Component{
    constructor(){
        super();
        this.state ={
            /*Four variables: 
             * The ZIP Code itself, with a default value of 10016
             * The array of cities at said ZIP Code
             * A bool to let us know if the ZIP Code is invalid
             * A bool to let us know if the page is loading
             */
            zipCode: 0,
            cities: [],
            error: false,
            loading: true
        }
    }  
    //Upon loading once fetch the data for the default ZIP Code
    componentDidMount(){
        this.fetchNewData(this.state.zipCode)
    }
    //If any changes occur to the input text field, alter the zip code and get new data
    onChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
        this.fetchNewData(event.target.value)
    }
    //Fetch the data for the zip code
    fetchNewData = (zipCode)=>{
        const url = "http://ctp-zip-api.herokuapp.com/zip/" + zipCode
        fetch(url).then(response =>{
            if(response.ok){
                //Return the array of cities at said ZIP Code
                return response.json()
            } else {
                //Else we got an error
                throw new Error("Error fetching data")
            }
        }).then(data=>{
            //Set array of cities equal to the data, note we are no longer loading nor do we have an error
            this.setState({
                cities: data,
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
                        <h1><b><i>Zip Code Search</i></b></h1>
                    </Jumbotron>
                <form>
                    <label><b>Zip Code:</b></label>
                    <input type="number" id="zipCode" name="zipCode" placeholder="Try 10016" onChange={this.onChange}></input>
                </form>
                <Container>
                    <Col>
                {this.state.error === true ? <div>No Results </div> :
                this.state.cities.map((item,index)=>(
                    <div key={index}>
                        <Row className="justify-content-md-center">
                        <Card
                        bg="secondary" 
                        style={{ width: '18rem' }}>
                            <Card.Header as="h5">{item.LocationText}</Card.Header>
                            <ListGroup variant="flush">
                <ListGroup.Item><li className="text-left">State: {item.State}</li></ListGroup.Item>
                                <ListGroup.Item><li className="text-left">Location: ({item.Lat},{item.Long})</li></ListGroup.Item>
                <ListGroup.Item><li className="text-left">Population (estimated): {item.EstimatedPopulation}</li></ListGroup.Item>
                <ListGroup.Item><li className="text-left">Total Wages: {item.TotalWages}</li></ListGroup.Item>
                            </ListGroup>
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

export default ZipSearch;