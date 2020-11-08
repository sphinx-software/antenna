import React, {
  ComponentClass,
  Dispatch,
  FunctionComponent,
  Reducer,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react'
import { Message } from './Message'
import { SubscriptionResource } from './subscriptionResource'

const SubscriberContext = React.createContext<{
  state: unknown
  dispatch: Dispatch<any>
} | null>(null)

type SubscriberWrapperProps<State> = {
  channel: string
  reducer: Reducer<State, unknown>
  initial: State
  resource: SubscriptionResource
}

const SubscriberWrapper: FunctionComponent<SubscriberWrapperProps<unknown>> = ({
  channel,
  reducer,
  initial,
  resource,
  children
}) => {
  // Memoized the listener
  const listener = useMemo(() => resource.fetch(), [resource])

  // Plug the reducer into the subscriber context
  const [state, dispatch] = useReducer(reducer, initial)

  // Start listening for the messages
  useEffect(
    () =>
      listener((message: Message<unknown>) => {
        dispatch(message)
      }),
    [listener, channel]
  )

  return (
    <SubscriberContext.Provider value={{ state, dispatch }}>
      {children}
    </SubscriberContext.Provider>
  )
}

export default SubscriberWrapper

export function useSubscription<State>() {
  const { state, dispatch } = useContext(SubscriberContext) as {
    state: State
    dispatch: Dispatch<any>
  }

  return [state, dispatch]
}

export type SubscriberProps<State> = {
  state: State
  dispatch: Dispatch<unknown>
}
export type SubscriberComponent<State> =
  | FunctionComponent<SubscriberProps<State>>
  | ComponentClass<State>

export const Subscriber: FunctionComponent<{
  component: SubscriberComponent<unknown>
}> = ({ component: Proxy }) => {
  const [state, dispatch] = useSubscription()

  return <Proxy state={state} dispatch={dispatch} />
}
