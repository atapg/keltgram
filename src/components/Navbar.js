import React from 'react'
import {Card, Toolbar, Typography} from '@material-ui/core'
import {BiLogInCircle, BiLogOutCircle} from 'react-icons/bi'
import { useStateValue } from '../store/StateProvider'
import { auth } from '../firebase'

const Navbar = ({ loginBtn }) => {
    const [{person}, dispatch] = useStateValue()

    return (
        <Card variant="outlined" className="navbar__container" >
            <Toolbar className="row__space__between">
                <Typography className="logo" variant="h5" component="h1"><b style={{letterSpacing: '-1px',fontWeight: 'bolder'}}>keLTgram</b></Typography>
                {person?.displayName} / {person?.email}
                {person ? <BiLogOutCircle onClick={() => auth.signOut()} /> : <BiLogInCircle onClick={loginBtn} />}
            </Toolbar>
        </Card>
    )
}

export default Navbar
