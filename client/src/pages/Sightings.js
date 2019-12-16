import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Axios from 'axios';

import Header from '../components/Header';

class Sightings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sightings: []
        }
    }

    UNSAFE_componentWillMount(){
        Axios.get('/get-my-sightings', {params: {person: this.props.person}})
            .then(response => {
                this.setState({sightings: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    onClick = (item) => {
        this.props.selectSighting(item)
        this.props.history.push('/sightings-info');
    }

    render(){ 
        return(
            <div className='background' style={{minHeight: window.innerHeight, textAlign: 'center'}}>
                <Header tab='Update'/>
                <div style={{paddingTop: 100, fontSize: 40, color: 'white'}}>Your Sightings</div>
                <div className='row justify-content-md-center' style={{maxWidth: window.innerWidth}}>
                    <table className='table table-dark table-striped' style={{width: window.innerWidth/2, borderRadius: 5 ,margin: 50, opacity: 0.9}}>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Location</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>Select</th>
                            </tr>
                        </thead>
                        <tbody className='flowers'>
                        {this.state.sightings.map((item, index) => { return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.NAME}</td>
                                <td>{item.LOCATION}</td>
                                <td>{item.SIGHTED}</td>
                                <td>
                                    <button className='btn btn-secondary' type='button' style={{fontStyle: 'italic'}} onClick={() => this.onClick(item)}>
                                        i
                                    </button>
                                </td>
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
        person: state.person
    }
}

function mapDispatchToProps(dispatch){
    return{
        selectSighting: (sighting) => dispatch({type: 'SELECT_SIGHTING', sighting}),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sightings)); 