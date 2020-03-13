import React from "react";
import PropTypes from 'prop-types'
import TodoItem from "./TodoItem";



function TodoList(props) {
return(
    <tbody>
    {props.todos.map(todo => {
        return <TodoItem todo={todo} key={todo._id} onChange={props.onToggle} />
    })}
    </tbody>
)
}

TodoList.propTypes={
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle:PropTypes.func.isRequired
}
export default TodoList


