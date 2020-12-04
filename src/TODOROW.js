import React, {Component} from 'react';

export class ToDoRow extends Component {

    // Feature 3 and 4



    // Freature 10
    // Delete TodoItem
    deleteToDo = (todoID) => {
        console.log("hello world");
        const url = "http://localhost:54970/api/todos/DeleteToDo?todoID=" + todoID;
        fetch(url, {method: 'DELETE'}) 
            .then(response => response.json())
            .then((data) => {
                console.log(JSON.stringify({data}));
            })
            .catch(console.log);

            window.location.reload(true);
    };

    render = () =>  // () is an unnamed function, whatever is inside them is data we want to pass
        <tr>
            <td>
                {this.props.item.action}
            </td>
            <td>
                <input 
                    type = "checkbox"
                    checked = {this.props.item.done}
                    onChange = {() => this.props.callback(this.props.item)}
                />
            </td>
            <td>
                <button
                    className = "btn btn-primary mt-1"
                    onClick = {() => this.deleteToDo(this.props.item.todoID)}
                >
                    DELETE 
                </button>
            </td>
        </tr>

}