import React,{ useState } from 'react'
import { Button, Card, TextField, Typography } from '@material-ui/core'
import { auth } from '../firebase'
import { useStateValue } from '../store/StateProvider'

const Login = ({loginBtn, getUsername}) => {
    const [acc, setAcc] = useState(false)
    const [data, setData] = useState({email:'', username:'', password:''})
    const [{}, dispatch] = useStateValue()

    const btnHandler = (e) => {
        e.preventDefault()

        if(acc === true){
            auth
                .signInWithEmailAndPassword(data.email, data.password)
                .then(authUser => {
                    dispatch({
                        type: "LOGIN",
                        item: authUser
                    })
                })
                .then(() => {
                    loginBtn()
                })
                .catch(error => alert(error.message))
        } else {
            auth
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(authUser => {
                    authUser.user.updateProfile({
                        displayName: data.username
                    })
                    dispatch({
                        type: "LOGIN",
                        item: authUser
                    })
                })
                .then(() => {
                    loginBtn()
                })
                .catch(err => alert(err.message))
                getUsername(data.username)
        }
    }

    const dataHandler = (e) => {
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <Card className="login__container center">
               {acc ? 
                    <>
                        <Typography className="login__logo" component="h2">Login</Typography>
                        <div className="form__container center">
                            <TextField name="email" onChange={e => dataHandler(e)} value={data.email} className="textfield" id="email-login" type="text" label="Email" />
                            <TextField name="password" onChange={e => dataHandler(e)} value={data.password} className="textfield" id="password-login" type="password" label="Password" />
                        </div>
                        <Button onClick={btnHandler} variant="contained" color="secondary">
                            Login
                        </Button>
                        <Typography onClick={() => setAcc(oldAcc => !oldAcc)} className="have__account" component="a">Don't Have an Account?</Typography>   
                    </>
                : 
                    <>
                        <Typography className="login__logo" component="h2">Sign Up</Typography>
                        <div className="form__container center">
                            <TextField name="username" onChange={e => dataHandler(e)} value={data.username} className="textfield" id="username-signup" type="text" label="Username" />
                            <TextField name="email" onChange={e => dataHandler(e)} value={data.email} className="textfield" id="email-signup" type="text" label="Email" />
                            <TextField name="password" onChange={e => dataHandler(e)} value={data.password} className="textfield" id="password-signup" type="password"  label="Password" />
                        </div>
                        <Button onClick={btnHandler} variant="contained" color="secondary">
                            Sign Up
                        </Button>
                        <Typography onClick={() => setAcc(oldAcc => !oldAcc)} className="have__account" component="a">Already Have an Account?</Typography>   
                    </>
                }
            </Card>
            <div className="login__bg" onClick={loginBtn} />
        </>
    )
}

export default Login
