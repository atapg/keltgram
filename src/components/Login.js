import React,{ useState } from 'react'
import { Button, Card, TextField, Typography } from '@material-ui/core'

const Login = ({loginBtn}) => {
    return (
        <>
            <Card className="login__container center">
                <Typography className="login__logo" component="h2">Login</Typography>
                <div className="form__container center">
                    <TextField className="textfield" id="standard-basic" label="Username" />
                    <TextField className="textfield" id="standard-basic" label="Password" />
                </div>
                <Button variant="contained" color="secondary">
                    Sign In
                </Button>
                <Typography className="have__account" component="a">Don't Have an Account?</Typography>
            </Card>
            <div className="login__bg" onClick={loginBtn} />
        </>
    )
}

export default Login
