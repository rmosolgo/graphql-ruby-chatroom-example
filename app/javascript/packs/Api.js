import client from "./GraphQLClient"
import gql from "graphql-tag"

const Api = {
  loadViewer() {
    return client.query({
      query: gql`
      query LoadViewer {
        viewer {
          screenname
        }
      }
      `,
    })
  },

  pickScreenname(screenname) {
    return client.mutate({
      variables: { screenname: screenname },
      mutation: gql`
      mutation PickScreenname($screenname: String!) {
        pickScreenname(screenname: $screenname) {
          person {
            screenname
          }
          errors
        }
      }
      `,
    })
  },

  loadRoom(room) {
    return client.query({
      variables: { room: room },
      fetchPolicy: "network-only",
      query: gql`
      query LoadRoomInfo($room: String!) {
        room(name: $room) {
          messages {
            id
            body
            author {
              screenname
            }
          }
        }
      }
      `,
    })
  },

  postMessage(room, message) {
    return client.mutate({
      variables: { room: room, message: message },
      mutation: gql`
      mutation PostChatMessage($room: String!, $message: String!) {
        postMessage(room: $room, message: $message) {
          message {
            room {
              messages {
                id
                body
                author {
                  screenname
                }
              }
            }
          }
          errors
        }
      }
      `,
    })
  },
}

export default Api
