import { useEffect, useState } from 'react'
import './App.scss'
import './style.scss'
import { createMuiTheme,ThemeProvider} from '@material-ui/core'
import Navbar from './components/Navbar'
import Post from './components/Post'
import { db } from './firebase'

const theme = createMuiTheme({
  palette:{
    dark: false,
    primary:{
      light: '#ffffff',
      main: '#fafafa',
      dark: 'c7c7c7',
      contrastText: '#000'
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

  useEffect(() => {
    db.collection('posts').onSnapshot(snapShot => {
      setPosts(snapShot.docs.map(doc => doc.data()))
    })
  },[])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className="posts">
          {posts.map((item,index) => (
            <Post key={index} item={item} />
          ))}
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
