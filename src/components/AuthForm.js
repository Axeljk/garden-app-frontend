import React, {useState} from 'react'

export default function AuthForm(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = e => {
        e.preventDefault();
        props.handleSubmit(email,password);
    }
    return (
        <div>
            <header>{props.type}</header>
            <form onSubmit = {submit}>
                <input value={email} placeholder='email' onChange={e=>setEmail(e.target.value)}/>
                <input value={password} type='password' onChange={e=>setPassword(e.target.value)}/>
                <button>{props.type}</button>
            </form>
        </div>
    )
}