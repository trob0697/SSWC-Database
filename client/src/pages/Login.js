import React from 'react';
import {connect} from 'react-redux';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            person: '',
            submitable: false
        }
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


    confirmLogin = () => {
        if(this.state.person.length){
            this.props.login(this.state.person)
            this.props.history.push('/home')
        }
        else{
            alert('Please enter your name.')
        }
    }
    
    render(){
        return(
            <div className='background' style={{minHeight: window.innerHeight}}>
                <div className='text-center ' style={{paddingTop: 200, paddingBottom: 100, fontSize: 40, color: 'white'}}>Welcome to Southern Sierra Wildflower Club</div>
                <div className='row justify-content-md-center' style={{maxWidth: window.innerWidth}}>
                    <form className='text-center' style={{padding: 50, backgroundColor: 'white', opacity: 0.9, width: 350, borderRadius: 10}}>
                        <div className='form-group'>
                            <input className={'text-center' + (this.state.submitable ? '' : ' invalid')} type='text' placeholder='Name' name='person' value={this.state.person} onChange={this.handleChange}/>
                        </div>
                        <button className='btn btn-secondary' type='submit' disabled={!this.state.submitable} onClick={() => this.confirmLogin()}>Login</button>
                    </form>
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
            login: (person) => dispatch({type: 'LOGIN', person}),
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(Login); 