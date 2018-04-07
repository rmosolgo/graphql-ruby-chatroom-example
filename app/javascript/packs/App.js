import React from 'react'
import Api from "./Api"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pendingScreenname: "",
      currentScreenname: props.currentScreenname,
      currentRoom: null,
      nextRoom: "",
      rooms: [],
      currentMessages: null,
      pendingMessage: "",
    }

    this.handleJoinRoom = this.handleJoinRoom.bind(this)
    this.handleNextRoomChange = this.handleNextRoomChange.bind(this)
    this.handleClickRoom = this.handleClickRoom.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
    this.handlePendingScreennameChange = this.handlePendingScreennameChange.bind(this)
    this.handlePickScreenname = this.handlePickScreenname.bind(this)
  }

  handleJoinRoom(ev) {
    ev.preventDefault()
    const newRoom = this.state.nextRoom
    if (this.state.rooms.indexOf(newRoom) === -1) {
      // TODO update server
      this.setState({
        rooms: [...this.state.rooms, newRoom],
        nextRoom: "",
      })
    } else {
      this.setState({
        nextRoom: "",
      })
    }
    this._activateRoom(newRoom)
  }

  handleNextRoomChange(ev) {
    const newNextRoom = ev.target.value
    this.setState({ nextRoom: newNextRoom })
  }

  handleClickRoom(ev, clickedRoom) {
    ev.preventDefault()
    this._activateRoom(clickedRoom)
  }

  handleMessageChange(ev) {
    this.setState({pendingMessage: ev.target.value})
  }

  handleMessageSubmit(ev) {
    ev.preventDefault()
    Api.postMessage(this.state.currentRoom, this.state.pendingMessage).then((data) => {
      if (data.data.postMessage.errors.length) {
        alert(data.data.postMessage.errors.join(", "))
      } else {
        this.setState({
          pendingMessage: "",
          currentMessages: data.data.postMessage.message.room.messages,
        })
      }
    })
  }

  handlePendingScreennameChange(ev) {
    this.setState({pendingScreenname: ev.target.value})
  }

  handlePickScreenname(ev) {
    ev.preventDefault()
    Api.pickScreenname(this.state.pendingScreenname).then((data) => {
      console.log("Picked SN", data)
      if (data.data.pickScreenname.errors.length) {
        alert(data.data.pickScreenname.errors.join(", "))
      } else {
        this.setState({
          pendingScreenname: "",
          currentScreenname: this.state.pendingScreenname,
        })
      }
    })
  }

  render() {
    if (!this.state.currentScreenname) {
      return (
        <div>
          <form onSubmit={this.handlePickScreenname}>
            <label>
              Pick a screenname:
              <input
                type="text"
                value={this.pendingScreenname}
                onChange={this.handlePendingScreennameChange}
              />
            </label>
            <input type="submit" value="Log in" />
          </form>
        </div>
      )
    }
    return (
      <div>
        <div style={{width: "33%", float: "left"}}>
          <p>Logged in as {this.state.currentScreenname}</p>
          <form onSubmit={this.handleJoinRoom}>
            <input type="text" onChange={this.handleNextRoomChange} value={this.state.nextRoom} />
            <button>
              Join Room
            </button>
          </form>
          <ul>
            {this.state.rooms.map((room) => {
              return (
                <li key={room}>
                  <a onClick={(ev) => this.handleClickRoom(ev, room) } role="button" href="#">{room}</a>
                </li>
              )
            })}
          </ul>
        </div>
        <div style={{width: "66%", float: "right"}}>
          {this.state.currentRoom ? (
            <div>
              <h2>{this.state.currentRoom}</h2>
              {this.state.currentMessages && (
                <ul>
                  {this.state.currentMessages.map((message) => {
                    return (
                      <li key={message.id}>
                        <strong>{message.author.screenname}</strong>:{" "}
                        {message.body}
                      </li>
                    )
                  })}
                </ul>
              )}
              <form onSubmit={this.handleMessageSubmit}>
                <input onChange={this.handleMessageChange} type="text" value={this.state.pendingMessage} />
                <button>Send</button>
              </form>
            </div>
          ) : (
            <p>⬅ Join a Room</p>
          )}
        </div>
      </div>
    )
  }

  _activateRoom(roomName) {
    this.state.currentSubscription && this.state.currentSubscription.unsubscribe()

    this.setState({
      currentRoom: roomName,
      currentSubscription: Api.subscribeToMessages(roomName).subscribe({
        next: (data) => {
          this.setState({currentMessages: data.data.messageWasAdded.room.messages})
        }
      }),
    })
    Api.loadRoom(roomName).then((data) => {
      this.setState({
        currentMessages: data.data.room.messages,
      })
    })
  }
}

export default App
