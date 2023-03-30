import client from "./GraphQLClient"
import PostMessage from "./graphql/PostMessage.graphql"
import LoadViewer from "./graphql/LoadViewer.graphql"
import PickScreenname from "./graphql/PickScreenname.graphql"
import LoadRoomInfo from "./graphql/LoadRoomInfo.graphql"
import MessageAdded from "./graphql/MessageAdded.graphql"

const Api = {
  loadViewer() {
    return client.query({ query: LoadViewer })
  },

  pickScreenname(screenname) {
    return client.mutate({
      variables: { screenname: screenname },
      mutation: PickScreenname,
    })
  },

  loadRoom(room) {
    return client.query({
      variables: { room: room },
      fetchPolicy: "network-only",
      query: LoadRoomInfo,
    })
  },

  postMessage(room, message) {
    return client.mutate({
      variables: { room: room, message: message },
      mutation: PostMessage,
    })
  },

  subscribeToMessages(roomName) {
    return client.subscribe({
      variables: { room: roomName},
      query: MessageAdded,
    })
  }
}

export default Api
