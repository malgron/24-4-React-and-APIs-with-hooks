import React, { useEffect } from "react"

function UserList({ users, setUsers, setCurrentUser }) {
  
  useEffect(()=>{
    const abortHandler = new AbortController()

    async function loadUsers() {
      try {
        const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        {signal: abortHandler.signal})

        const usersFromAPI = await response.json()
        setUsers(usersFromAPI)
      }catch (error){
        if (error.type == "aborted") {
          console.log("Abort")
        }else{
          console.log(error)
        }
     }
    }
    loadUsers()
    return () => {abortHandler.abort()}
  }, [])
  
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id}>
          <button type="button" onClick={() => setCurrentUser(user)}>
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
