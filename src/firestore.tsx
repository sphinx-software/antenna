import { Listener, Transporter } from './Transporter'
import firebase from 'firebase'
import { AuthProvider, GenericOption } from './GenericOption'

type CustomToken = string

type FirestoreOptions = {
  firebase: firebase.app.App
  collection?: string
} & GenericOption<CustomToken>

class Firestore implements Transporter {
  constructor(
    private readonly channelCollection: firebase.firestore.CollectionReference,
    private readonly authenticator: firebase.auth.Auth,
    private readonly entityProvider: AuthProvider<CustomToken>
  ) {}

  public subscribe(channel: string, listener: Listener<unknown>) {
    const subscribeTime = new Date().getTime()

    return this.channelCollection
      .doc(channel)
      .collection('messages')
      .orderBy('_timestamp', 'desc')
      .where('_timestamp', '>=', subscribeTime)
      .limit(1)
      .onSnapshot((snapshot) => {
        if (snapshot.docs[0]) {
          listener(snapshot.docs[0].get('message'))
        }
      })
  }

  public async authorize() {
    const token = await this.entityProvider()
    await this.authenticator.signInWithCustomToken(token)
  }
}

export default ({
  firebase,
  auth,
  collection = 'channels'
}: FirestoreOptions) => {
  const channelCollection = firebase.firestore().collection(collection)

  return new Firestore(channelCollection, firebase.auth(), auth)
}
