import React, { useEffect } from 'react'
import AuthForm from './AuthForm'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
    const navigate = useNavigate();
    useEffect(()=>{
        if(props.userId){
            navigate(`/users/${props.userId}`)
        }
    }, [props.userId])
    return (
        <div>
            <AuthForm type='Login' handleSubmit={props.handleLogin}/>
            <AuthForm type='Signup' handleSubmit={props.handleSignup}/>
        </div>
    )
}