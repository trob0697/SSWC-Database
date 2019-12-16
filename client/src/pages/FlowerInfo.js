import React from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentFlower: '',
            imgURL: '',
            sightings: [],
        }
    }

    UNSAFE_componentWillMount(){
        Axios.get('https://www.googleapis.com/customsearch/v1?cx=013186636100274079689:xatq6k5mwj9&key=AIzaSyBDAtMlLRFCyrmmfPAI0rQ9kNHf7E9JoCY&searchType=image&q='+(this.props.currentFlower.replace(/\s/g, '+')))
            .then(response => {
                this.setState({
                    ...this.state,
                    currentFlower: this.props.currentFlower,
                    imgURL: response.data.items[0].link,
                })
            })
            .catch(error => {
                console.log(error)
            })

        Axios.get('/get-flower-info', {params: {flower: this.props.currentFlower}})
            .then(response => {
                this.setState({
                    ...this.state,
                    sightings: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render(){
        return(
            <div className='background' style={{minHeight: window.innerHeight, textAlign: 'center',}}>
                <div style={{paddingTop: 100, fontSize: 40, color: 'white'}}>{this.props.currentFlower}</div>
                <img src={this.state.imgURL} alt={this.state.currentFlower} style={{maxHeight: window.innerHeight/3, maxWidth: window.innerWidth/3, margin: 50}}/>
                <div style={{fontSize: 25, color: 'white'}}>Recent Sightings</div>
                <div className='row justify-content-md-center' style={{maxWidth: window.innerWidth}}>
                    <table className='table table-dark table-striped' style={{width: window.innerWidth/2, borderRadius: 5 ,margin: 50, opacity: 0.9}}>
                        <thead>
                            <tr>
                                <th scope='col'>Person</th>
                                <th scope='col'>Location</th>
                                <th scope='col'>Date</th>
                            </tr>
                        </thead>
                        <tbody className='flowers'>
                        {this.state.sightings.map((item, index) => { return(
                            <tr key={index} >
                                <td>{item.PERSON}</td>
                                <td>{item.LOCATION}</td>
                                <td>{item.SIGHTED}</td>
                            </tr>
                        )})}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

    function mapStateToProps(state){
        return{
            currentFlower: state.currentFlower
        }
    }

export default connect(mapStateToProps)(Login); 