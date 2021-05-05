import React from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core'

const Navbar = () => {
    return (
        <AppBar>
          <Toolbar>
            <Typography variant="h5" component="h1"><b style={{letterSpacing: '-1px'}}>keLTgram</b></Typography>
          </Toolbar>
        </AppBar>
    )
}

export default Navbar
