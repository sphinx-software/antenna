import React, { FunctionComponent, useContext, Suspense, useState } from 'react'
import { Transporter } from './Transporter'

import antennaResource, { AntennaResource } from './antennaResource'

export const AntennaContext = React.createContext<AntennaResource | null>(null)

type AntennaProps = {
  transport: Transporter
  fallback: JSX.Element
}

const AntennaProvider: FunctionComponent<AntennaProps> = ({
  children,
  transport,
  fallback
}) => {
  const [resource] = useState(antennaResource(transport))

  return (
    <AntennaContext.Provider value={resource}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </AntennaContext.Provider>
  )
}

export const useAntenna = (): Transporter => {
  return (useContext(AntennaContext) as AntennaResource).fetch()
}

export default AntennaProvider
