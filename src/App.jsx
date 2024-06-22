import './App.scss'
import '@bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';

import Search from './Components/Search';
import Profile from './Components/Profile'

function App() {
  const [profile, setProfile] = useState("LptLeo")

  // useEffect(() => {
  // //   fetch(`https://api.github.com/users/${profile}`)
  // //     .then(response => response.json())
  // //     .then(data => console.log(data))

  //   fetch(`https://api.github.com/users/${profile}/repos`)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //     })
  // }, [profile])

  return (
    <div className="body">
      <div className="container">
        <Search name={setProfile} />
        <div className="container load">
          <div className="row">
            <Profile />
            <div className="d-flex justify-content-center align-center col-xl-2 p-1">
              <div className="d-flex flex-column text-center align-center border border-warning w-100 h-100 px-3 py-4">
                <h4>Lorem</h4>
                <span>Lorem</span>
                <button className='text-danger'>btn</button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-center col-xl-2 p-1">
              <div className="d-flex flex-column text-center align-center border border-warning w-100 h-100 px-3 py-4">
                <h4>Lorem</h4>
                <span>Lorem</span>
                <button className='text-danger'>btn</button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-center col-xl-2 p-1">
              <div className="d-flex flex-column text-center align-center border border-warning w-100 h-100 px-3 py-4">
                <h4>Lorem</h4>
                <span>Lorem</span>
                <button className='text-danger'>btn</button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-center col-xl-2 p-1">
              <div className="d-flex flex-column text-center align-center border border-warning w-100 h-100 px-3 py-4">
                <h4>Lorem</h4>
                <span>Lorem</span>
                <button className='text-danger'>btn</button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-center col-xl-2 p-1">
              <div className="d-flex flex-column text-center align-center border border-warning w-100 h-100 px-3 py-4">
                <h4>Lorem</h4>
                <span>Lorem</span>
                <button className='text-danger'>btn</button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-center col-xl-2 p-1">
              <div className="d-flex flex-column text-center align-center border border-warning w-100 h-100 px-3 py-4">
                <h4>Lorem</h4>
                <span>Lorem</span>
                <button className='text-danger'>btn</button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-center col-xl-2 p-1">
              <div className="d-flex flex-column text-center align-center border border-warning w-100 h-100 px-3 py-4">
                <h4>Lorem</h4>
                <span>Lorem</span>
                <button className='text-danger'>btn</button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-center col-xl-2 p-1">
              <div className="d-flex flex-column text-center align-center border border-warning w-100 h-100 px-3 py-4">
                <h4>Lorem</h4>
                <span>Lorem</span>
                <button className='text-danger'>btn</button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-center col-xl-2 p-1">
              <div className="d-flex flex-column text-center align-center border border-warning w-100 h-100 px-3 py-4">
                <h4>Lorem</h4>
                <span>Lorem</span>
                <button className='text-danger'>btn</button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-center col-xl-2 p-1">
              <div className="d-flex flex-column text-center align-center border border-warning w-100 h-100 px-3 py-4">
                <h4>Lorem</h4>
                <span>Lorem</span>
                <button className='text-danger'>btn</button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-center col-xl-2 p-1">
              <div className="d-flex flex-column text-center align-center border border-warning w-100 h-100 px-3 py-4">
                <h4>Lorem</h4>
                <span>Lorem</span>
                <button className='text-danger'>btn</button>
              </div>
            </div>
            <div className="d-flex justify-content-center align-center col-xl-2 p-1">
              <div className="d-flex flex-column text-center align-center border border-warning w-100 h-100 px-3 py-4">
                <h4>Lorem</h4>
                <span>Lorem</span>
                <button className='text-danger'>btn</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
