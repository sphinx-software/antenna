export type HandshakeProvider<AuthEntity> = () => Promise<AuthEntity>
export type AuthorizationProvider = (channel: string) => Promise<void>

export type GenericOption<AuthEntity> = {
  handshake: HandshakeProvider<AuthEntity>
  authorize: AuthorizationProvider
}
