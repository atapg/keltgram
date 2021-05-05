import { useEffect, useState } from 'react'
import './App.scss'
import './style.scss'
import { createMuiTheme,ThemeProvider} from '@material-ui/core'
import Navbar from './components/Navbar'
import Post from './components/Post'
import { db } from './firebase'
import Login from './components/Login'

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

  const loginBtn = () => {
      setShow(prevShow => !prevShow)
  }

  useEffect(() => {
    db.collection('posts').onSnapshot(snapShot => {
      setPosts(snapShot.docs.map(doc =>({
        post: doc.data(),
        id: doc.id
      })))
    })
  },[])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navbar loginBtn={loginBtn} />
        <div className="posts">
          {posts.map(({id, post}) => (
            <Post key={id} item={post} />
          ))}
        </div>
        {show && <Login loginBtn={loginBtn} />}
      </ThemeProvider>
    </div>
  )
}

export default App
