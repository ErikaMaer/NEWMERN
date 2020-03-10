import React, {useContext} from "react";
import PropTypes from 'prop-types';

function TodoItem({todo, onChange}) {
    console.log(todo)
 return (
     <tr>
      <td> <label>
          <input type="checkbox"
                 onChange ={() => onChange(todo._id)} checked={todo.Checked}/>
          <span></span>
      </label> </td>
      <td>{todo._id}</td>
      <td>{todo.email}</td>
      <td>{todo.regDate} </td>
      <td>{todo.logDate}</td>
      <td>{todo.Status}</td>


     </tr>
 )
}


TodoItem.propTypes={
    todo: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}


export default TodoItem

