import React from 'react'
import {Card, Toolbar, Typography} from '@material-ui/core'
import {BiLogInCircle} from 'react-icons/bi'

const Navbar = ({ loginBtn }) => {
    return (
        <Card variant="outlined" className="navbar__container" >
            <Toolbar className="row__space__between">
                <Typography className="logo" variant="h5" component="h1"><b style={{letterSpacing: '-1px',fontWeight: 'bolder'}}>keLTgram</b></Typography>
                <BiLogInCircle onClick={loginBtn} />
            </Toolbar>
        </Card>
    )
}

export default Navbar
