import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import TodoList from "../Todo/TodoList";


export const CreatePage = () => {
    let [users, setUsers] = useState([]);
   // const [checkedTest, setCheckedTest] = useState(false)
    const {request} = useHttp();

    const addHandler = useCallback(async () => {
        try {
            const arr = await request('/api/items/create', 'GET');
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
                user.Checked=!user.Checked
            }
            return user
        }))
    }


    const blockHandler = async (userStatus) => {
        const checkedUsers = getCheckedUsers();
        for(let checkedUser of checkedUsers) {
            try {
                await request('/api/items/create/block', 'POST', {id : checkedUser._id, status: userStatus})
            } catch (e) {
            }
        }
        setUsers(await request('/api/items/create', 'GET'))
    };

    const deleteHandler = async () => {
        const checkedUsers = getCheckedUsers();
        for(let checkedUser of checkedUsers) {
            try {
                 await request('/api/items/create/delete', 'DELETE', {id : checkedUser._id})
            } catch (e) {
            }
        }
        setUsers(await request('/api/items/create', 'GET'))
    };


    function getCheckedUsers() {
        return users.filter(user => user.Checked === true)
    }


    function onCheckedAll() {
        setUsers(users.map(users => {
            users.Checked = !users.Checked
            return users
        }))
    }


    return (
        <div>
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">

                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <button type="button" className="btn btn-secondary" style={{marginRight: 10}}
                        onClick={() => blockHandler("block")}
                >Block</button>
                <button type="button" className="btn btn-secondary" style={{marginRight: 10}}
                        onClick={() => blockHandler(null)}
                >Unlock</button>
                <button type="button" className="btn btn-secondary" style={{marginRight: 10}}
                        onClick={deleteHandler}>
                    <i className="material-icons">delete</i></button>
            </div>


            <table className="highlight">
                <thead className="thead-dark">
                <tr>
                    <th>Select all /<br/>deselect all <br/>
                        <label>
                            <input type="checkbox"
                                onClick={() =>onCheckedAll()}
                            /><span></span>
                        </label>
                    </th>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Registration date</th>
                    <th>Last login date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <TodoList todos={users} onToggle={toggleTodo} />
            </table>
        </div>
    )
};


