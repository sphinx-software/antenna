import React, { FunctionComponent, useContext } from 'react'
import { Transporter } from './Transporter'
import antennaResource, { AntennaResource } from './antennaResource'

export const AntennaContext = React.createContext<AntennaResource | null>(null)

type AntennaProps = {
  transport: Transporter
  fallback?: JSX.Element
}

const AntennaProvider: FunctionComponent<AntennaProps> = ({
  children,
  transport
}) => {
  return (
    <AntennaContext.Provider value={antennaResource(transport)}>
      {children}
    </AntennaContext.Provider>
  )
}

export const useAntenna = (): Transporter => {
  const resource = useContext(AntennaContext) as AntennaResource
  return resource.fetch()
}

export default AntennaProvider
