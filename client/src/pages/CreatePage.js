import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import TodoList from "../Todo/TodoList";




export const CreatePage = () => {
    let [users, setUsers] = useState([]);
    const [checkedTest, setCheckedTest] = useState(false)
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




    function toggleTodo(_id, /*event*/) {
        setUsers(users.map(user => {
            if (user._id === _id) {
                user.Checked=!user.Checked
               // event.target.checked= setCheckedTest(!checkedTest)
            }
            return user
        }))
    }


    const deleteUser = async (user) => {
        console.log(user+"aaaaaaaaaaaaaaaaaaaaaaaaa")
        try {
            await request('/api/items/delete', 'DELETE', {user});
        } catch (e) {

        }
   }


    // async function deleteUser() {
    //     //console.log("dltusr"+user)
    //     //if (user.Checked){
    //     setUsers(users.filter(todo => !todo.Checked))
    //    await request('http://localhost:3000/api/items/', 'DELETE');}
    // //return user


    function deleteToolbar() {
      //  setUsers(users.filter(todo => !todo.Checked))
      setUsers(users.map(deleteUser))
    }

   // const blockUser = async (user)=> {
   //     try {
   //         await request('/api/items/login', 'POST')
   //         user.update()
   //        user.Status ="Block"
   //     } catch (e) {
   //
   //     }
   //     }
   function blockUser(user) {
       // user.update()
       // request('/api/items/login', 'POST')

       user.Status ="Block"
            }



    function unlockUser(user) {

                if (user.Checked) {
                    user.Status = "Unlock"
                }
        return user


    }

    // const onCheckedAll = (event) => {
    //     setCheckedTest(event.target.checked);
    //
    // }




    return (

        <div>


            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">

                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <button type="button" className="btn btn-secondary" style={{marginRight: 10}}
                        onClick={() => blockUser()}
                >Block</button>
                <button type="button" className="btn btn-secondary" style={{marginRight: 10}}
                        onClick={() => unlockUser()}
                >Unlock</button>
                <button type="button" className="btn btn-secondary" style={{marginRight: 10}}
                        onClick={() => deleteToolbar()}>

                    <i className="material-icons">delete</i></button>

            </div>


            <table className="highlight">
                <thead className="thead-dark">
                <tr>
                    <th>Select all /<br/>deselect all <br/>
                        <label>
                            <input type="checkbox"
             //                      onClick={onCheckedAll}
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
                <TodoList todos={users} onToggle={toggleTodo} checkedTest={checkedTest}/>
            </table>

        </div>
    )

};


