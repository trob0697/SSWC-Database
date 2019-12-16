import React from 'react';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {  }
    }
    
    render(){ 
        return( 
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <a className='navbar-brand' href='/home'>SSWC</a>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <a className={'nav-link ' + (this.props.tab === 'Home' ? 'active' : '')} href='/home'>Home</a>
                        </li>
                        <li className='nav-item'>
                            <a className={'nav-link ' + (this.props.tab === 'Flowers' ? 'active' : '')} href='/flowers'>Flowers</a>
                        </li>
                        <li className='nav-item'>
                            <a className={'nav-link ' + (this.props.tab === 'Update' ? 'active' : '')} href='/sightings'>Sightings</a>
                        </li>
                        <li className='nav-item'>
                            <a className={'nav-link ' + (this.props.tab === 'Insert' ? 'active' : '')} href='/insert'>Insert</a>
                        </li>
                    </ul>
                </div>
                <a className='nav-link' href='/'>Logout</a>
            </nav>
        )
    }
}

export default Header;