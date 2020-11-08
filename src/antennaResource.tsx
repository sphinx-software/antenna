import { Transporter } from './Transporter'

export type AntennaResource = {
  fetch(): Transporter
}

export default (transporter: Transporter): AntennaResource => {
  let error: Error | null = null
  let handshaked = false
  let handshaking: Promise<void> | null = null

  return {
    fetch() {
      if (!handshaking) {
        handshaking = transporter
          .handshake()
          .then(() => (handshaked = true))
          .catch((_error) => (error = _error))
      }

      if (error) {
        throw error
      }

      if (!handshaked) {
        throw handshaking
      }

      return transporter
    }
  }
}
