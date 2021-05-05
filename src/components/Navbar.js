import React from 'react'
import {AppBar, Card, Toolbar, Typography} from '@material-ui/core'

const Navbar = () => {
    return (
        <Card variant="outlined" style={{marginBottom: '100px'}} >
            <Toolbar>
                <Typography className="logo" variant="h5" component="h1"><b style={{letterSpacing: '-1px',fontWeight: 'bolder'}}>keLTgram</b></Typography>
            </Toolbar>
        </Card>
    )
}

export default Navbar
