import { Transporter } from './Transporter'

export type AntennaResource = {
  fetch(): Transporter
  retry(): Transporter
}

export default (transport: Transporter): AntennaResource => {
  let authorizationPromise: Promise<void> | null = null
  let _error: Error | null = null
  let authorized = false

  return {
    // At the first attempt to subscribe, we'll do authorization
    fetch() {
      if (!authorizationPromise) {
        authorizationPromise = transport
          .authorize()
          .then(() => {
            authorized = true
          })
          .catch((error) => (_error = error))
      }

      if (_error) {
        throw _error
      }
      if (authorized) {
        return transport
      }

      throw authorizationPromise
    },

    retry() {
      authorizationPromise = null
      return this.fetch()
    }
  }
}
