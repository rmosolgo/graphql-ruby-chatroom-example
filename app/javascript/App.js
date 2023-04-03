import React from 'react'
import { useState } from 'react'
import { useQuery, useMutation } from "@apollo/client"
import Room from './Room'
import LoadViewer from "./graphql/LoadViewer.graphql"
import PickScreenname from "./graphql/PickScreenname.graphql"

export default function App() {
  const {loading, error, data} = useQuery(LoadViewer)
  const [pendingScreenname, setPendingScreenname] = useState('')
  const [currentRooms, setCurrentRooms] = useState([])
  const [nextRoom, setNextRoom] = useState('')
  const [currentRoom, setCurrentRoom] = useState('')

  const [callPickScreenname, _pickScreennameResult] = useMutation(PickScreenname, {
    refetchQueries: [{query: LoadViewer}],
    onCompleted: (data) => {
      if (data.pickScreenname.errors.length) {
        alert(data.pickScreenname.errors.join(", "))
      } else {
        setPendingScreenname('')
      }
    }
  });

  if (loading) {
    <div>...</div>
  } else if (error) {
    <p>Error: {error.message}</p>
  } else if (!data.viewer) {
    return (
      <div>
        <form onSubmit={(ev) => {
          ev.preventDefault()
          callPickScreenname({ variables: { screenname: pendingScreenname } })
        }}>
          <label>
            Pick a screenname:
            <input
              type="text"
              value={pendingScreenname}
              onChange={(ev) => { setPendingScreenname(ev.target.value) }}
            />
          </label>
          <input type="submit" value="Log in" />
        </form>
      </div>
    )
  } else {
    return (
      <div style={{display: "flex"}}>
        <div style={{flex: "1"}}>
          <p>Logged in as {data.viewer.screenname}</p>
          <form onSubmit={(ev) => {
            ev.preventDefault()
            if (currentRooms.indexOf(nextRoom) === -1) {
              setCurrentRooms([...currentRooms, nextRoom])
            }
            setNextRoom('')
            setCurrentRoom(nextRoom)
            }}>
            <input
              type="text"
              onChange={(ev) => { setNextRoom(ev.target.value) }}
              value={nextRoom}
              placeholder="Join a room"
            />
            <button>
              Join Room
            </button>
          </form>
          <p><strong>Current Rooms:</strong></p>
          <ul>
            {currentRooms.map((room) => {
              return (
                <li key={room}>
                  <a onClick={(ev) => {
                    ev.preventDefault()
                    setCurrentRoom(room)
                  }} role="button" href="#">{room}</a>
                  {" "}
                  <a onClick={(ev) => {
                      const newRooms = currentRooms.filter(r => r !== room)
                      setCurrentRooms(newRooms)
                      setCurrentRoom(null)
                  }} role="button" href="#" style={{color: "red"}}>x</a>
                </li>
              )
            })}
            {currentRooms.length == 0 ? <li><em>none</em></li> : null}
          </ul>
        </div>
        <div style={{flex: "1"}}>
          {currentRoom ? (
            <Room name={currentRoom} />
          ) : (
            <p><em>Join a room to chat</em></p>
          )}
        </div>
      </div>
    )
  }
}
