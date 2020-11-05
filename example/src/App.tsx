import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {
  AntennaProvider,
  Subscription,
  Subscriber,
  firestore
} from '@sphinx-software/antenna'
import { SubscriberComponent } from '../../src'

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
  auth: () =>
    Promise.resolve(
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTYwNDU3Mjk1OCwiZXhwIjoxNjA0NTc2NTU4LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1oNjdwN0BtaW1hbW9yaS1hbHBoYS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWg2N3A3QG1pbWFtb3JpLWFscGhhLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoicHJpdmF0ZV9jaGFubmVsX3VzZXItMSIsImNsYWltcyI6eyJ0eXBlIjoic3RhdGlvbi5zdWJzY3JpYmVyIn19.bTBLeM2eyEQvfbuIoefKvq2v4Xnqebrm7hENe8_X0prJR0X6ywMq0fnuurVrW2N449MvcLiqsYJ6N1_zj-2qVLCOM-rrvTmOnLpLr-KAjEJlOKfESRVVhpnHGiDruE3ZLB4Z_K5UGUEyVsZH4v5VxU6YLky34HsxssN2isQ3S8dzNRg9x2WblpMtO6i5qFVooKYqm99YwK5m3jUNV5m_eOgNymP3zhrCLdE80ojQpdmHDpEG7QwX4NShdGyOMr0ww_kNI7QSguQpiTW6AzGw7XgnJQ41ERetDrRR7NqgVOjyK8IGTdQhUnLuh4-B4rG_O2V_jzrMYB6DLGuIG_-pXA'
    )
})

const Log: SubscriberComponent<any> = ({ state, channel }) => {
  return (
    <div>
      Channel logger {channel} - {JSON.stringify(state)}
    </div>
  )
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
        fallback={<div>Signaling ...</div>}
      >
        <Subscription
          channel='private_channel_user-1'
          initialState={{}}
          reducer={(_, action) => action.payload}
        >
          <Subscriber component={Log} />
        </Subscription>

        <Subscription
          channel='private_channel_user-1'
          initialState={{}}
          reducer={(_, action) => ({ ...action.payload, date: new Date() })}
        >
          <Subscriber component={Log} />
        </Subscription>
      </AntennaProvider>
    </div>
  )
}

export default App
