import React from "react";
import TodoItem from "./TodoItem";


function TodoList(props) {
return(
    <tbody>
    {props.todos.map(todo => {
        return <TodoItem todo={todo} key={todo._id}/>
    })}
    </tbody>
)
}
export default TodoList