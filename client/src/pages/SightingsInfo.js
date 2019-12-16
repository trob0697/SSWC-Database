import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Axios from 'axios';

class SightingsInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allLocations: [],
            name: '',
            person: '',
            location: '',
            sighted: '',
            changeName: '',
            changeLocation: '',
            submitableName: false,
            submitableLocation: false
        }
    }

    UNSAFE_componentWillMount(){
        Axios.get('/get-locations')
            .then(response => {
                this.setState({
                    allLocations: response.data,
                    name: this.props.currentSighting.NAME,
                    person: this.props.currentSighting.PERSON,
                    location: this.props.currentSighting.LOCATION,
                    sighted: this.props.currentSighting.SIGHTED,
                    changeName: '',
                    changeLocation: '',
                    submitableName: false,
                    submitableLocation: false
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
                submitableName: false
            })
        }
        else{
            this.setState({
                ...this.state,
                [event.target.name]: event.target.value,
                submitableName: true
            })
        }
    }

    textIsInvalid = (text) =>{
        if(text.match(/[`~!@#$%^&*()_+=|}{'";:/?.>,<}]/) || text.length === 0)
            return true
        else
            return false
    }

    updateSightingName = () => {
        Axios.post('/update-sighting-name', {name: this.state.changeName, person: this.state.person, location: this.state.location, sighted: this.state.sighted})
        .then(response => {
            alert('This sighting has been updated.')
        })
        .catch(error => {
            alert(error)
        })
    }

    updateName = () => {
        this.updateSightingName()
        this.props.history.push('/sightings')
    }

    updateSightingLocation = () => {
        Axios.post('/update-sighting-location', {name: this.state.name, person: this.state.person, location: this.state.changeLocation, sighted: this.state.sighted})
        .then(response => {
            alert('This sighting has been updated')
        })
        .catch(error => {
            alert(error)
        })
    }

    updateLocation = () => {
        this.updateSightingLocation()
        this.props.history.push('/sightings')
    }

    deleteSighting = () => {
        Axios.post('/delete-sighting', {name: this.state.name, person: this.state.person, location: this.state.location, sighted: this.state.sighted})
            .then(response => {
                alert('This sighting has been deleted')
            })
            .catch(error => {
                alert(error)
            })
    }

    delete = () => {
        this.deleteSighting()
        this.props.history.push('/sightings')
    }
    
    render(){
        return(
            <div className='background' style={{minHeight: window.innerHeight, textAlign: 'center',}}>
                <div className='row justify-content-md-center' style={{paddingTop: 50, paddingBottom: 25, maxWidth: window.innerWidth}}>
                    <table className='table table-dark table-striped' style={{width: window.innerWidth/2, borderRadius: 5 ,margin: 50, opacity: 0.9}}>
                        <tbody>
                            <tr>
                                <td>{this.props.currentSighting.NAME}</td>
                                <td>{this.props.currentSighting.LOCATION}</td>
                                <td>{this.props.currentSighting.SIGHTED}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{fontSize: 25, color: 'white'}}>Change Flower Name</div>
                <div className='container form-group' style={{width: window.innerWidth/2}}>
                        <input className={'form-control' + (this.state.submitableName ? '' : ' invalid')} type='text' name='changeName' value={this.state.changeName} onChange={this.handleChange}/>
                </div>
                <button className='btn btn-secondary' type='submit' disabled={!this.state.submitableName} style={{textAlign: 'center'}} onClick={() => this.updateName()}>Update</button>
                <div style={{paddingTop: 25, fontSize: 25, color: 'white'}}>Change Flower Location</div>
                <div className='container form-group' style={{width: window.innerWidth/2}}>
                    <select className='form-control' value={this.state.changeLocation} onChange={(e) => this.setState({...this.state, changeLocation: e.target.value})}>
                        <option>...</option>
                        {this.state.allLocations.map((item,index) => { return(
                            <option key={index} value={item.LOCATION}>{item.LOCATION}</option>
                        )})}
                    </select>
                </div>
                <button className='btn btn-secondary' type='submit' disabled={(this.state.changeLocation.length === 0 || this.state.changeLocation === '...')} style={{textAlign: 'center'}} onClick={() => this.updateLocation()}>Update</button>
                <div style={{padding: 25}}>
                    <button className='btn btn-danger' type='submit' style={{textAlign: 'center'}} onClick={() => this.deleteSighting()}>Delete Sighting</button>
                </div>    
            </div>
        )
    }
}

    function mapStateToProps(state){
        return{
            currentSighting: state.currentSighting
        }
    }

export default withRouter(connect(mapStateToProps)(SightingsInfo)); 