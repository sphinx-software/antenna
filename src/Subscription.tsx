import React, { FunctionComponent, Reducer, useState } from 'react'
import SubscriberWrapper from './Subscriber'
import { useAntenna } from './AntennaProvider'
import subscriptionResource from './subscriptionResource'

type SubscriptionProps<State> = {
  channel: string
  reducer: Reducer<State, unknown>
  initial: State
  isPrivate?: boolean
  fallback?: JSX.Element
}

const Subscription: FunctionComponent<SubscriptionProps<any>> = ({
  channel,
  isPrivate = false,
  reducer,
  initial,
  children
}) => {
  const antenna = useAntenna()
  const [resource] = useState(subscriptionResource(antenna, channel, isPrivate))

  return (
    <SubscriberWrapper
      resource={resource}
      channel={channel}
      reducer={reducer}
      initial={initial}
    >
      {children}
    </SubscriberWrapper>
  )
}

export default Subscription
