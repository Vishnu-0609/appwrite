import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx'
// import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Post from './pages/Post.jsx'
import Editpost from './pages/Editpost.jsx'
import Allpost from './pages/Allpost.jsx'
import Addpost from './pages/Addpost.jsx'
import { AuthLayout,Login } from './components/index.js'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App></App>}>
      <Route path='' element={<Home></Home>}/>
      <Route path='login' element={(<AuthLayout authentication={false}><Login></Login></AuthLayout>)}/>
      <Route path='signup' element={(<AuthLayout authentication={false}><Signup></Signup></AuthLayout>)}/>
      <Route path='all-posts' element={(<AuthLayout authentication={true}><Allpost></Allpost></AuthLayout>)}/>
      <Route path='add-post' element={(<AuthLayout authentication={true}><Addpost></Addpost></AuthLayout>)}/>
      <Route path='edit-post/:slug' element={(<AuthLayout authentication={true}><Editpost></Editpost></AuthLayout>)}/>
      <Route path='post/:slug' element={<Post/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
