import { useEffect, useState } from 'react'
import './App.scss'
import './style.scss'
import { createMuiTheme,ThemeProvider} from '@material-ui/core'
import Navbar from './components/Navbar'
import Post from './components/Post'
import { auth, db } from './firebase'
import Login from './components/Login'
import { useStateValue } from './store/StateProvider'
import ImageUpload from './components/ImageUpload'

const theme = createMuiTheme({
  palette:{
    dark: false,
    primary:{
      light: '#ffffff',
      main: '#000',
      dark: 'c7c7c7',
      contrastText: '#fff'
    },
    secondary:{
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#fff'
    }
  }
})

function App() {
  const [posts, setPosts] = useState([])
  const [show, setShow] = useState(false)
  const [username, setUsername] = useState('')
  const [{person}, dispatch] = useStateValue()

  const loginBtn = () => {
      setShow(prevShow => !prevShow)
  }

  const getUsername = (username) => {
    setUsername(oldUsername => oldUsername = username)
  }

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapShot => {
      setPosts(snapShot.docs.map(doc =>({
        post: doc.data(),
        id: doc.id
      })))
    })
  },[])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if(authUser){
        dispatch({
          type: "LOGIN",
          item: authUser
        })
      } else {
        dispatch({
          type: "LOGIN",
          item: null
        })
      }
    })
    return () => {
      unsubscribe()
    }
  },[username])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navbar loginBtn={loginBtn} />
        {person?.displayName && <ImageUpload username={person.displayName} email={person.email} />}
        <div className="posts">
          {posts.map(({id, post}) => (
            <Post key={id} postId={id} item={post} />
          ))}
        </div>
        {show && <Login getUsername={getUsername} loginBtn={loginBtn} />}
      </ThemeProvider>
    </div>
  )
}

export default App
