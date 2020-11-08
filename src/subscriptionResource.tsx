import { Listener, Transporter } from './Transporter'

export type UnsubscribeCallback = () => void

export type SubscribeCallBack = (
  callback: Listener<unknown>
) => UnsubscribeCallback

export type SubscriptionResource = {
  fetch(): SubscribeCallBack
}

export default (
  antenna: Transporter,
  channel: string,
  isPrivate: boolean
): SubscriptionResource => {
  let authorized: boolean = false
  let error: Error | null = null
  let authorizing: Promise<void> | null = null

  if (isPrivate) {
    authorizing = antenna
      .authorize(channel)
      .then(() => (authorized = true))
      .catch((_error) => (error = _error))
  } else {
    error = null
    authorized = true
  }

  return {
    fetch() {
      if (error) {
        throw error
      }

      if (!authorized) {
        throw authorizing
      }

      return (callback: Listener<unknown>) =>
        antenna.subscribe(channel, callback)
    }
  }
}
