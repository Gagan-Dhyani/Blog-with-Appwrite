import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login,logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        console.log("userData");
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  return !loading?(
    <div className='min-h-screen flex flex-wrap bg-gray-700 content-between'>
      <div className='w-full block'>
        <Header/>
        <main>
          TODO: <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null


  // return (
  //   <>
  //    <h1>BLog with appwrite</h1>
  //   </>
  // )
}

export default App
