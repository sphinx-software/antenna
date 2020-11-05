export type AuthProvider<AuthEntity> = () => Promise<AuthEntity>

export type GenericOption<AuthEntity> = {
  auth: AuthProvider<AuthEntity>
}
