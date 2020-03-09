import React, {useCallback, useEffect,useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import TodoList from "../Todo/TodoList";

export const CreatePage=() =>{
   const[users, setUsers] = useState([]);
   const{request}=useHttp();

   const addHandler = useCallback(async ()=>{
       try {
           const arr = await request('/api/items/create', 'GET', /*{...form}*/);
           setUsers(arr);
       } catch (e) {
       }
   },[request]);

useEffect(() => {
    addHandler()
},[addHandler]);

    return(
        <div>
            <table className="highlight">
                <thead>
                <tr>
                    <th>Select all /<br/>deselect all </th>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Registration date</th>
                    <th>Last login date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <TodoList todos={users}/>
            </table>

        </div>
    )
};


