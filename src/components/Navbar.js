import React from 'react'
import {Card, Toolbar, Typography} from '@material-ui/core'

const Navbar = () => {
    return (
        <Card variant="outlined" className="navbar__container" >
            <Toolbar>
                <Typography className="logo" variant="h5" component="h1"><b style={{letterSpacing: '-1px',fontWeight: 'bolder'}}>keLTgram</b></Typography>
            </Toolbar>
        </Card>
    )
}

export default Navbar
