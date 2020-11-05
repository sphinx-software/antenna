export type Listener<T> = (message: T) => void
export type Detach = () => void
export interface Transporter {
  subscribe(channel: string, listener: Listener<unknown>): Detach
  authorize(): Promise<void>
}
