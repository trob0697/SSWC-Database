import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Axios from 'axios';

import Header from '../components/Header';

class Flowers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flowers: [],
        }
    }

    UNSAFE_componentWillMount(){
        Axios.get('/get-flowers')
            .then(response => {
                this.setState({flowers: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    onClick = (item) => {
        this.props.selectFlower(item)
        this.props.history.push('/flower-info')
    }

    render(){
        return(
            <div className='background' style={{minHeight: window.innerHeight}}>
                <Header tab='Flowers'/>
                <div className='row justify-content-md-center' style={{maxWidth: window.innerWidth}}>
                    <table className='table table-dark table-striped' style={{width: window.innerWidth/2, borderRadius: 5 ,margin: 50, opacity: 0.9}}>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Genus</th>
                                <th scope='col'>Species</th>
                                <th scope='col'>Common Name</th>
                                <th scope='col'>Details</th>
                            </tr>
                        </thead>
                        <tbody className='flowers'>
                        {this.state.flowers.map((item, index) => { return(
                            <tr key={index} onClick={() => this.setState({...this.state, cuurentFlower: item})}>
                                <td>{index+1}</td>
                                <td>{item.GENUS}</td>
                                <td>{item.SPECIES}</td>
                                <td>{item.COMNAME}</td>
                                <td>
                                    <button className='btn btn-secondary' type='button' style={{fontStyle: 'italic'}} onClick={() => this.onClick(item.COMNAME)}>
                                        i
                                    </button>
                                </td>
                            </tr>
                        )})}
                        </tbody>
                    </table>
                </div>
                <div style={{height: 50}}/>
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
        selectFlower: (flower) => dispatch({type: 'SELECT_FLOWER', flower}),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Flowers)); 