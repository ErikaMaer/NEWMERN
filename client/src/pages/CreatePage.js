import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import TodoList from "../Todo/TodoList";
// import Context from "../contextT/CreateContext";

export const CreatePage = () => {
    let [users, setUsers] = useState([]);
    const {request} = useHttp();

    const addHandler = useCallback(async () => {
        try {
            const arr = await request('/api/items/create', 'GET', /*{...form}*/);
            setUsers(arr);
        } catch (e) {
        }
    }, [request]);

    useEffect(() => {
        addHandler()
    }, [addHandler]);

    function toggleTodo(_id) {
        setUsers(users.map(user => {
            if (user._id === _id) {
                user.Checked = !user.Checked
            }
            return user
        }))


    }

     async function deleteUser(user) {
        console.log("dltusr"+user)
        if (user.Checked){
            await user.deleteOne(user._id)
        }
        return user
    }

    function deleteToolbar() {
        //setUsers(users.filter(todo => !todo.Checked))
        setUsers(users.map(deleteUser))
    }


    return (

        // <Context.Provider value ={{deleteToolbar}}>
        <div>


            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">

                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <button type="button" className="btn btn-secondary" style={{marginRight: 10}}>Block</button>
                <button type="button" className="btn btn-secondary" style={{marginRight: 10}}>Unlock</button>
                <button type="button" className="btn btn-secondary" style={{marginRight: 10}}
                        onClick={() => deleteToolbar()}>

                    <i className="material-icons">delete</i></button>

            </div>


            <table className="highlight">
                <thead className="thead-dark">
                <tr>
                    <th>Select all /<br/>deselect all <br/>
                        <label>
                            <input type="checkbox"/>
                            <span></span>
                        </label>
                    </th>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Registration date</th>
                    <th>Last login date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <TodoList todos={users} onToggle={toggleTodo}/>
            </table>

        </div>
        // </Context.Provider>
    )

};


