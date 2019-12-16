import React from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

import Header from '../components/Header';

var today = new Date();
var date = today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

class Insert extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allLocations: [],
            name: '',
            person: '',
            location: '',
            sighted: '',
            submitable: false
        }
    }

    UNSAFE_componentWillMount(){
        Axios.get('/get-locations')
            .then(response => {
                this.setState({
                    allLocations: response.data,
                    name: '',
                    person: this.props.person,
                    location: '',
                    sighted: date
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange = (event) => {
        if(this.textIsInvalid(event.target.value)){
            this.setState({
                ...this.state,
                [event.target.name]: event.target.value,
                submitable: false
            })
        }
        else{
            this.setState({
                ...this.state,
                [event.target.name]: event.target.value,
                submitable: true
            })
        }
    }

    textIsInvalid = (text) =>{
        if(text.match(/[`~!@#$%^&*()_+=|}{'";:/?.>,<}]/) || text.length === 0)
            return true
        else
            return false
    }

    onSubmit(){
        if(this.state.name.length === 0 || this.state.location.length === 0 || this.state.location === '...'){
            alert('Please enter a flower name and select a location.')
        }
        else{
            Axios.post('/insert-sighting', {name: this.state.name, person: this.state.person, location: this.state.location, sighted: this.state.sighted})
                .then(response => {
                    alert('Your sighting has been stored in the database')
                })
                .catch(error => {
                    alert(error)
                })
        }
    }

    render(){
        return(
            <div className='background' style={{minHeight: window.innerHeight}}>
                <Header tab='Insert'/>
                <div style={{paddingTop: 100, textAlign: 'center', fontSize: 40, color: 'white'}}>Report a flower sighting</div>
                <form style={{padding: 100}}>
                    <div className='form-group'>
                        <label style={{color: 'white'}}>Flower Name</label>
                        <input className={'form-control' + (this.state.submitable ? '' : ' invalid')} type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label style={{color: 'white'}}>Location</label>
                        <select className='form-control' value={this.state.location} onChange={(e) => this.setState({...this.state, location: e.target.value})}>
                            <option>...</option>
                            {this.state.allLocations.map((item,index) => { return(
                                <option key={index} value={item.LOCATION}>{item.LOCATION}</option>
                            )})}
                        </select>
                    </div>
                    <button className='btn btn-secondary' type='submit' disabled={!this.state.submitable} style={{textAlign: 'center'}} onClick={() => this.onSubmit()}>Submit</button>
                </form>
            </div> 
        )
    }
}

function mapStateToProps(state){
    return{
        person: state.person
    }
}

export default connect(mapStateToProps)(Insert); 