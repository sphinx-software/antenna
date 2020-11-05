import { Transporter } from './Transporter'

export type AntennaResource = {
  fetch(): Transporter
}

export default (transport: Transporter): AntennaResource => {
  const authorizationPromise = transport.authorize()

  let _error: Error | null = null
  let authorized = false

  authorizationPromise
    .then(() => (authorized = true))
    .catch((error) => (_error = error))

  return {
    fetch() {
      if (_error) {
        throw _error
      }
      if (authorized) {
        return transport
      }

      throw authorizationPromise
    }
  }
}
