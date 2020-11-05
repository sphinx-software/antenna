import React, { FunctionComponent } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {
  AntennaProvider,
  Subscription,
  Subscriber,
  firestore,
  SubscriptionAwareProps
} from '@sphinx-software/antenna'

const app = firebase.initializeApp({})

const transport = firestore({
  firebase: app,
  auth: () =>
    Promise.resolve(
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTYwNDU2MTc2NywiZXhwIjoxNjA0NTY1MzY3LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1oNjdwN0BtaW1hbW9yaS1hbHBoYS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWg2N3A3QG1pbWFtb3JpLWFscGhhLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoicHJpdmF0ZV9jaGFubmVsX3VzZXItMSIsImNsYWltcyI6eyJ0eXBlIjoic3RhdGlvbi5zdWJzY3JpYmVyIn19.c4m7i4av5qJvIUjtjJhy3yNOl-bSLTF46dm33qiFOppsjd6wFSClW8sawBd1yavakdDu8PtLKOzdECnjjy9b8nEV6GnGn7J0QdSRHV91ts_yU1j-i6CF3E5cZYZAu9o6qUNddmZT36FAaqwcFol3Wn1mt1TTkpL7uEk990Ut_Uw7sLdPxomWzayJ2R5tFtkFffY2QkIm-TqehzeohnrCP4FRxNGb94GYpi_H-wU-j30RDhEKQESfEW1_6yP5pXfOvP9OqTdPm_ay2RJGE4JrOCjRxk5l1kzUXLJ4kZK13OOHhFOEx36dSC4U1IFQyC3kjEoeSggSbo3PgQVdtkZuIQ'
    )
})

const Log: FunctionComponent<SubscriptionAwareProps> = ({ state, channel }) => {
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
      </AntennaProvider>
    </div>
  )
}

export default App
