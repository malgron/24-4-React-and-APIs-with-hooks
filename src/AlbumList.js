import React, { useEffect, useState } from "react"

function AlbumList({ user = {}, albums, setAlbums }) {
  if(!user.name) {
    return <p>Please click on a user name to the left</p>
  }
  
  useEffect(() => {
      const abortHandler = new AbortController()
      
      async function loadAlbums(){
        if(user.id){
          try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
            {signal: abortHandler.signal})
            
            const albumsFromAPI = await response.json()
            setAlbums(albumsFromAPI)
          } catch (error) {
            if (error.type == "aborted") {
              console.log("Abort albums")
            }else{
              console.log(error)
            }
          }
        }
      }
    loadAlbums()
    
    return () => {
      setAlbums([])
      abortHandler.abort()
    }},[user])
  
    return (
      <React.Fragment>
      <h1>{user.name} Albums </h1>
      <ul>
        {albums.map((album) => (
        <li key={album.id}>{album.id} - {album.title}</li>
        ))}
      </ul>
      </React.Fragment>
    )
}

export default AlbumList