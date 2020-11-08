import React, { FunctionComponent, Suspense } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {
  AntennaProvider,
  Subscription,
  Subscriber,
  firestore,
  SubscriberComponent,
  useSubscription
} from '@sphinx-software/antenna'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAaDr6ZfsEGIVGt8qzOasyjT5LVZTbpCjE',
  authDomain: 'mimamori-alpha.firebaseapp.com',
  databaseURL: 'https://mimamori-alpha.firebaseio.com',
  projectId: 'mimamori-alpha',
  storageBucket: 'mimamori-alpha.appspot.com',
  messagingSenderId: '167074049197',
  appId: '1:167074049197:web:5a7001063f50f0c0f76a24',
  measurementId: 'G-PDY1JNLPL4'
})

const transport = firestore({
  firebase: app,
  handshake: () => {
    console.log('Handshaking')
    return Promise.resolve(
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTYwNDgzODcxOCwiZXhwIjoxNjA0ODQyMzE4LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1oNjdwN0BtaW1hbW9yaS1hbHBoYS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWg2N3A3QG1pbWFtb3JpLWFscGhhLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoicHJpdmF0ZV9jaGFubmVsX3VzZXItMSIsImNsYWltcyI6eyJ0eXBlIjoic3RhdGlvbi5zdWJzY3JpYmVyIn19.Fz-lMAw_SWrg5_UwzS1flCXhLLqYTln5NB5qr6MVAjS2tMdyceN2jpu9lE83c46MjjhzmSt52x7DilvQTZHx2MIBqsWWJwfUU90pbh18v7zvyn1AYH41xN7KMaq2e01p7hY6-P545LcZr1EbV-fp2bR0QJH1fcUJSesiZUgyKo4LxFiwyZrVGQLaibc9oHt9NYVU2pAGO3ZxZG-R5VDpSzCTF6YtYItuZ7xOqdOiGCSUK5CweKK7_wDAzzQ56657dLZNIAyQ7M4AOsuFvoopFCYMTtY1punX5zpHZX4LnH7ARS_yhRtidHoEzLkl0XufBfkN4iWg6Ssfi8HZybmVmA'
    )
  },
  authorize: (channel: string) => {
    console.log('authorizing ', channel)
    return new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
  }
})

const Log: SubscriberComponent<any> = ({ state }) => {
  return <div>Channel logger {JSON.stringify(state)}</div>
}

const SmartLog: FunctionComponent = () => {
  const [state] = useSubscription()

  return <div>Smart Channel logger {JSON.stringify(state)}</div>
}

const App = () => {
  return (
    <div>
      Antenna Example
      <span role='img' aria-label='Smile'>
        😄
      </span>
      <AntennaProvider
        transport={transport}
        fallback={<span>...Handshaking</span>}
      >
        <Suspense fallback={'....'}>
          <Subscription
            fallback={<span>...Signaling</span>}
            channel='private_channel_user-1'
            initial={{}}
            reducer={(_, action: any) => action.payload}
          >
            <Subscriber component={Log} />
            <SmartLog />
          </Subscription>
        </Suspense>
      </AntennaProvider>
    </div>
  )
}

export default App
