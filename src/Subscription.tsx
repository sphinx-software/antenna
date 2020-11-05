import {
  Dispatch,
  FunctionComponent,
  Reducer,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { useAntenna } from './AntennaProvider'
import * as React from 'react'

type SubscriptionProps = {
  channel: string
  initialState: unknown
  reducer: Reducer<unknown, any>
}

type SubscriptionContextValue<State> = {
  channel: string
  state: State
  dispatch: Dispatch<any>
}

const SubscriptionContext = React.createContext<SubscriptionContextValue<
  unknown
> | null>(null)

const Subscription: FunctionComponent<SubscriptionProps> = ({
  channel,
  initialState,
  reducer,
  children
}) => {
  const antenna = useAntenna()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(
    () =>
      antenna.subscribe(channel, ({ type, payload }) =>
        dispatch({
          type,
          payload
        })
      ),
    [antenna]
  )

  return (
    <SubscriptionContext.Provider value={{ state, dispatch, channel }}>
      {children}
    </SubscriptionContext.Provider>
  )
}
type SubscriptionAwareProps<State> = SubscriptionContextValue<State>
type SubscriberComponent<State> =
  | React.ComponentClass<SubscriptionAwareProps<State>>
  | React.FunctionComponent<SubscriptionAwareProps<State>>
type SubscriberProps<State> = {
  component: SubscriberComponent<State>
}
const Subscriber: FunctionComponent<SubscriberProps<unknown>> = ({
  component
}) => {
  const { state, dispatch, channel } = useContext(
    SubscriptionContext
  ) as SubscriptionContextValue<unknown>
  const Proxy = component

  return <Proxy state={state} dispatch={dispatch} channel={channel} />
}

export default Subscription
export {
  SubscriptionContext,
  Subscriber,
  SubscriptionAwareProps,
  SubscriberComponent
}
export function useSubscription<State>(): [State, Dispatch<any>, string] {
  const { state, dispatch, channel } = useContext(
    SubscriptionContext
  ) as SubscriptionContextValue<State>
  return [state as State, dispatch, channel]
}
