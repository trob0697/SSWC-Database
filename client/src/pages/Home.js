import React from 'react';
import {connect} from 'react-redux';

import Header from '../components/Header';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {  }
    }
    
    render(){ 
        return(
            <div className='background' style={{minHeight: window.innerHeight}}>
                <Header tab='Home'/>
                <div style={{height: window.innerHeight/3}}/>
                <div style={{fontSize: 50, color: 'white', textAlign: 'center'}}>Welcome to the SSWC Database {this.props.person}</div>
            </div> 
        )
    }
}

function mapStateToProps(state){
    return{
        person: state.person
    }
}

export default connect(mapStateToProps)(Home); 