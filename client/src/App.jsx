import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup';
import Navbar from './components/common/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'
import OpenRoute from './components/core/Auth/OpenRoute'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/Dashboard/MyProfile'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Error from './pages/Error'
import Settings from './components/core/Dashboard/Settings';

function App() {

  return (
      <div className='w-screen min-h-screen bg-richblack-900 text-white flex flex-col font-inter'>
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<Home />} 
          />
          <Route 
            path='/login' 
            element={
              <OpenRoute>
              <Login />
              </OpenRoute>
            } 
          />
          <Route 
            path='/signup' 
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            } 
          />
          <Route 
            path='/forgot-password' 
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            } 
          />
          <Route
            path='/update-password/:id'
            element={
              <UpdatePassword />
            }
          />
          <Route
            path='/verify-email'
            element={
              <VerifyEmail />
            }
          />
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path='dashboard/my-profile' element={<MyProfile />} />
            <Route path='dashboard/settings' element={<Settings/>} />
          </Route>
          <Route 
            path='/about' 
            element={
                <About />
            } 
          />
          <Route 
            path='/contact' 
            element={
              <Contact />
            } 
          />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
  )
}

export default App
