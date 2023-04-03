import React, { useState } from "react"
import { useQuery, useMutation, useSubscription } from "@apollo/client"
import LoadRoomInfo from "./graphql/LoadRoomInfo.graphql"
import PostMessage from "./graphql/PostMessage.graphql"
import MessageAdded from "./graphql/MessageAdded.graphql"

export default function Room({name}) {
  const { loading, error, data } = useQuery(LoadRoomInfo, { variables: { room: name }})
  const [pendingMessage, setPendingMessage] = useState('')
  const [callPostMessage, _postMessageResult] = useMutation(PostMessage, {
    onCompleted: (pmData) => {
      if (pmData.postMessage.errors.length) {
        alert(pmData.postMessage.errors.join(", "))
      } else {
        setPendingMessage("")
      }
    }
  })

  const messageAddedResult = useSubscription(MessageAdded, { variables: { room: name } })
  const currentMessages = messageAddedResult.loading ? (data ? data.room.messages : null) : messageAddedResult.data.messageWasAdded.room.messages

  return <div>
    <h2>Room: {name}</h2>
    {error ? <p>Error: {error.message}</p> :
      (loading ?
        <p>Loading messages...</p> :
        <ul style={{listStyle: "none", padding: "0"}}>
          {currentMessages.length > 0 ? currentMessages.map((message) => {
            return (
              <li key={message.id}>
                <strong>{message.author.screenname}</strong> said:{" "}
                {message.body}
              </li>
            )
          }) : <li><i>No messages yet</i></li>}
        </ul>
      )
    }
    <hr />
    <form onSubmit={(ev) => {
      ev.preventDefault()
      callPostMessage({ variables: { room: name, message: pendingMessage}})
    }}>
      <input
        type="text"
        placeholder="Send a message"
        onChange={(ev) => { setPendingMessage(ev.target.value) }}
        value={pendingMessage}
      />
      <button>Send</button>
    </form>
  </div>
}
