import {createStore} from 'redux';
import {loadState, saveState} from './sessionStorage.js';

const persistedState = loadState();

const initialState = {
    person: '',
    currentFlower: '',
    currentSighting: {}
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN':{
            return{
                ...state,
                person: action.person
            }
        }
        case 'SELECT_FLOWER':{
            return{
                ...state,
                currentFlower: action.flower
            }
        }
        case 'SELECT_SIGHTING':{
            return{
                ...state,
                currentSighting: action.sighting
            }
        }
        default:{
            return state
        }
    }
}
const store =  createStore(reducer, persistedState);

store.subscribe(() => {saveState(store.getState())})

export default store;