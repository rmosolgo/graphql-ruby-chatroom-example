import App from "./App"
import ReactDOM from 'react-dom'
import React from 'react'
import Api from "./Api"

document.addEventListener('DOMContentLoaded', () => {
  console.log("Loading")

  Api.loadViewer().then((data) => {
    const currentScreenname = data.data.viewer && data.data.viewer.screenname
    ReactDOM.render(
      <App currentScreenname={currentScreenname} />,
      document.body.appendChild(document.createElement('div')),
    )
  })
})
