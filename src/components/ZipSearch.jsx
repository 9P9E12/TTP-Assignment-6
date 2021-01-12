import React from 'react';

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
            zipCode: 10016,
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
            //Debug console log
            console.log(data)
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
                <header>Zip Code Search</header>
                <form>
                    <input type="number" name="zipCode" placeholder="Try 10016" onChange={this.onChange}></input>
                </form>
                {this.state.error === true ? <div>Error: {this.state.zipCode} is invalid </div> :
                this.state.cities.map((item,index)=>(
                    <div key={index}> {item.City}</div>
                ))
                }
                </div>}
            </div>
        );
    }
}

export default ZipSearch;