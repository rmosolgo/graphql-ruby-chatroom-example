import React, { useState } from "react"
import { useQuery, useMutation, useSubscription } from "@apollo/client"
import LoadRoomInfo from "./graphql/LoadRoomInfo.graphql"
import PostMessage from "./graphql/PostMessage.graphql"
import MessageAdded from "./graphql/MessageAdded.graphql"

export default function Room({name}) {
  const { loading, error, data } = useQuery(LoadRoomInfo, { variables: { room: name }})
  const [pendingMessage, setPendingMessage] = useState('')
  const [callPostMessage, _postMessageResult] = useMutation(PostMessage, {
    // This should be covered by subscription:
    refetchQueries: [{ query: LoadRoomInfo, variables: { room: name } }],
    onCompleted: (pmData) => {
      if (pmData.postMessage.errors.length) {
        alert(pmData.postMessage.errors.join(", "))
      } else {
        setPendingMessage("")
      }
    }
  })

  // const [currentMessages, setCurrentMessages] = useState([])
  // TODO:
  // Somehow this channel is getting unsubscribed after the first message.
  // Gotta figure out why and fix it.
  const messageAddedResult = useSubscription(MessageAdded, { variables: { room: name } })

  const currentMessages = data ? data.room.messages : null
  return <div>
    <h2>{name}</h2>
    {error ? <p>Error: {error.message}</p> :
      (loading ?
        <p>Loading messages...</p> :
        <ul>
          {currentMessages.map((message) => {
            return (
              <li key={message.id}>
                <strong>{message.author.screenname}</strong>:{" "}
                {message.body}
              </li>
            )
          })}
        </ul>
      )
    }

    <form onSubmit={(ev) => {
      ev.preventDefault()
      callPostMessage({ variables: { room: name, message: pendingMessage}})
    }}>
      <input onChange={(ev) => { setPendingMessage(ev.target.value) }} type="text" value={pendingMessage} />
      <button>Send</button>
    </form>
  </div>
}
