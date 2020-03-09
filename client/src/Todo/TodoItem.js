import React from "react";
import TodoList from "./TodoList";
import CheckList from "../checkbox/CheckList";

function TodoItem({todo}) {
 return (
     <tr>
      <td>  </td>
      <td>{todo._id}</td>
      <td>{todo.email}</td>
      <td>{todo.regDate} </td>
      <td> </td>
      <td> </td>
      <td> </td>

     </tr>
 )
}
export default TodoItem

//<CheckList todo={todo}>