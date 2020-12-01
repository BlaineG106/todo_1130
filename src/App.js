//import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

export default class App extends Component {
  //  Above we have created a class called App the extends the functionality of the Component class
  //  The export keyword above makes the class available for use outside of the JS file where it is created

    constructor() {
        super();

        //  React components have a special property called "state".  The "state" is used to define the state of data (props)
        this.state = {
          todoOwner: "Shawn",
          todoList: [
            {action: "Move burn pile", done: false}, 
            {action: "Oil change", done: false}, 
            {action: "Start x-mas shopping", done: false}, 
            {action: "Pay November Sales Tax", done: false}, 
            {action: "Eat Breakfast", done: true} 
          ]
        }
    } // END OF CONSTRUCTOR
} // END OF APP

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

//export default App;
