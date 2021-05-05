import React,{ useState } from 'react'
import { Button, Card, TextField, Typography } from '@material-ui/core'

const Login = ({loginBtn}) => {
    const [acc, setAcc] = useState(false)
    const [data, setData] = useState({})

    const btnHandler = () => {
        if(acc === true){
            //login
        } else {
            //sign up
        }
    }

    const dataHandler = () => {

    }

    return (
        <>
            <Card className="login__container center">
               {acc ? 
                    <>
                        <Typography className="login__logo" component="h2">Login</Typography>
                        <div className="form__container center">
                            <TextField onChange={{}} className="textfield" id="username-login" label="Username" />
                            <TextField className="textfield" id="password-login" label="Password" />
                        </div>
                        <Button onClick={btnHandler} variant="contained" color="secondary">
                            Sign In
                        </Button>
                        <Typography onClick={() => setAcc(oldAcc => !oldAcc)} className="have__account" component="a">Don't Have an Account?</Typography>   
                    </>
                : 
                    <>
                        <Typography className="login__logo" component="h2">Sign Up</Typography>
                        <div className="form__container center">
                            <TextField className="textfield" id="username-signup" label="Username" />
                            <TextField className="textfield" id="password-signup" label="Password" />
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
