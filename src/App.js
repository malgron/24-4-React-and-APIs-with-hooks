import React, { useEffect, useState } from "react"
import "./App.css"

import AlbumList from "./AlbumList"
import UserList from "./UserList"

function App() {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [albums, setAlbums] = useState([])
  const title = document.title

  
  useEffect(() => {
	  document.title = "Awesome Album App"
	  return () => document.title = title
  }, [])
  

  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} albums={albums} setAlbums={setAlbums} />
      </div>
    </div>
  )
}

export default App
