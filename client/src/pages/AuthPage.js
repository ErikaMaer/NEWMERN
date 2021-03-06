import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../contextT/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/items/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }


    const loginHandler = async () => {
        try {
            const data = await request('/api/items/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }


    return (
        <div className="row">
            <div className="card col s6 offset-s3">
                <div className="card  purple darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>


                            <div className="input-field ">

                                <input placeholder="Enter your email address"
                                       id="email"
                                       type="text"
                                       name="email"
                                       className="yellow-input"
                                       onChange={changeHandler}
                                />
                                <label htmlFor="first_name">Email</label>
                            </div>


                            <div className="input-field">
                                <input placeholder="Enter the password"
                                       id="password"
                                       type="password"
                                       name="password"
                                       className="yellow-input"
                                       onChange={changeHandler}
                                />
                                <label htmlFor="first_name">Password</label>
                            </div>

                        <div className="card-action">
                            <button
                                className="btn orange darken-4"
                                style={{marginRight: 10}}
                                disabled={loading}
                                onClick={loginHandler}
                            >
                                Sign in
                            </button>
                            <button
                                className="btn teal lighten-3 black-text"
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                Registration
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            </div>
    )
};