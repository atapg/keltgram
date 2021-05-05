import React from 'react'
import {Avatar, Card, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core'
import {BiLogInCircle, BiLogOutCircle} from 'react-icons/bi'
import { useStateValue } from '../store/StateProvider'
import { auth } from '../firebase'

const Navbar = ({ loginBtn }) => {
    const [{person}, dispatch] = useStateValue()
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
      }
    
    const handleClose = (e) => {
        if(e.target.name === "logout"){
            auth.signOut()
        }
        setAnchorEl(null)
    }

    return (
        <Card variant="outlined" className="navbar__container" >
            <Toolbar className="row__space__between">
                <Typography className="logo" variant="h5" component="h1"><b style={{letterSpacing: '-1px',fontWeight: 'bolder'}}>keLTgram</b></Typography>
                {person?.displayName} / {person?.email}
                {person ? 
                    <Avatar 
                        onClick={handleClick}
                        className="prof__avatar"
                     >
                    {person.displayName.substring(0,2).toUpperCase()}
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem name="logout" onClick={handleClose}>Log Out</MenuItem>
                        </Menu>
                    </Avatar>
                : 
                    <BiLogInCircle onClick={loginBtn} />}
            </Toolbar>
        </Card>
    )
}

export default Navbar
