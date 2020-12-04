//import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { ToDoBanner } from './TODOBANNER';
import { ToDoRow } from "./TODOROW";
import { ToDoCreate } from './TODOCREATE';
import { VisibilityControl } from './VISIBILITYCONTROL'
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {
  //  Above we have created a class called App the extends the functionality of the Component class
  //  The export keyword above makes the class available for use outside of the JS file where it is created

  constructor() {
    super();

    //  React components have a special property called "state".  The "state" is used to define the state of data (props)
    this.state = {
      todoOwner: "Blaine Gomez",
      todoList: [
        { action: "Move burn pile", done: false },
        { action: "Oil change", done: false },
        { action: "Start x-mas shopping", done: false },
        { action: "Pay November Sales Tax", done: false },
        { action: "Eat Breakfast", done: true }
      ]
    }
  } // END OF CONSTRUCTOR

  //  Feature 3 & 4
  //  If the ToDoRow Component's "done" property experiences a change event (ie. checking the Mark Complete box in the UI) then the ToDoRow Component calls a callback method called toggleToDo (below)  and passes toggleToDo the checked todo item
  //  ----- Function to display table rows ------
  todoTableRows = (finishedTask) => this.state.todoList.filter(

    x => x.done === finishedTask).map(y =>
      <ToDoRow
        key={y.action}
        item={y}
        callback={this.toggleToDo} // The callback will be invoked (executed, run) when everything in <ToDoRow> is finished AND the user clicks the input box
      //  The data passed into the callback from the ToDoRow componet is passed automatically into the function defined in the callback
      />
    );
  // Function to toggle an item from done to not done or vice-versa
  toggleToDo = (checkedToDoItem) => this.setState(

    {
      todoList: this.state.todoList.map(
        bob => bob.action === checkedToDoItem.action ? { ...bob, done: !bob.done } : bob

      )
    }, () => localStorage.setItem("storedToDoObject", JSON.stringify(this.state))
  );

  //  The createNewTodoCallback method below is the callback for the ToDoCreator component
  //  The "newToDoAction" parameter passed into the createNewTodoCallback method below comes from where the callback is initiated from- which is in the createNewTodo method of the ToDoCreator Component

  createNewToDoCallback = (newToDoAction) => {
    //  The if block below checks if the newly created todo item is NOT already in the list of todos.  If it is NOT already in the list then it adds it as below.  If it is in the list already there is no else block so nothing happens - this is not too user friendly but.... :)
    if (!this.state.todoList.find(
      xyz => xyz.action === newToDoAction.action)) {
      this.setState(
        {
          todoList: [
            ...this.state.todoList,
            { action: newToDoAction, done: false }
            // By default every new todo should not be done- in other words it's done property should have a value of false.
          ]
        }, () => localStorage.setItem("storedToDoObject", JSON.stringify(this.state))
      ); //end of setState

      //Feature 5.f
      // Insert the new Todo into the DB
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ "todoOwnerID": 1, "action": newToDoAction, "done": 0});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:54970/api/todos/CreateToDo", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    } //end of If block
  }

  // Feature 5e
  //  The componentDidMount method below is a built in react method to handle logic for when the APP Component "mounts" or "loads"
  componentDidMount = () => {
    localStorage.clear();

    fetch("http://localhost:54970/api/todos/GetTodos?todoOwnerID=1")
      .then(response => response.json())
      .then((data) => {
        console.log(JSON.stringify({ data }));

        var apiList = [];

        for (var i = 0; i < data.Data.length; i++) {
          var isDone = true;
          if (data.Data[i].done === 0) {
            isDone = false;
          }
          var element = {
            action: data.Data[i].action,
            done: isDone,
            todoID: data.Data[i].todoID
          };


          apiList.push(element);
        }

        let storedData = localStorage.getItem("storedToDoObject");
        this.setState(
          storedData != null ? JSON.parse(storedData) :
            {
              todoOwner: data.Data[0].todoOwner,
              todoList: apiList,
              showCompleted: true //Feature 8
            }
        );

      })
      .catch(console.log);


  }

  render = () =>
    <div>
      {/* Features 1 and 2 */}
      <ToDoBanner
        todoOwner={this.state.todoOwner}
        todoList={this.state.todoList}
      />

      {/* Feature 5a */}

      <ToDoCreate
        callback={this.createNewToDoCallback}
      />

      {/* Features 3 and 4 */}
      <table className="table table-striped table-bordered">
        <thead>
          <th>Action</th>
          <th>Mark As Complete</th>
          <th>Delete</th>
        </thead>
        <tbody>
          {this.todoTableRows(false)}
        </tbody>
      </table>

      {/* Feature 8 */}
      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl
          description="Completed Tasks"
          isChecked={this.state.showCompleted}
          callback={checked => this.setState({ showCompleted: checked })}
        />
      </div>

      {/* Features 6 and 7 */}
      {this.state.showCompleted &&
        <table className="table table-striped table-bordered">
          <thead>
            <th>Action</th>
            <th>Mark As Incomplete</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {this.todoTableRows(true)}
          </tbody>
        </table>
      }
    </div>

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
