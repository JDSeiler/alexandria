import type { PtolemyError, PtolemyInfo, PtolemyOk } from './common'
import ptolemy from './common'

export interface AccountDetails {
  email: string
  username: string
  password: string
}

export const createAccount = async (accountDetails: AccountDetails) => {
  const res = await ptolemy.post('/auth/create', accountDetails)
  const content = await res.json()

  return res.ok ? ({ kind: 'ok', info: content } as PtolemyOk) : (content as PtolemyError)
}

export const verifyEmail = async (email: string, code: string) => {
  const res = await ptolemy.r(`/auth/verify?email=${email}&code=${code}`, { credentials: 'include', method: 'POST' })

  return res.ok ? ({ kind: 'ok' }) : ({ kind: 'err', info: await res.json() as PtolemyInfo })
}

export const login = async (username: string, password: string) => {
  const res = await ptolemy.post('/auth/login', { username, password })
  const content = await res.json()

  return res.ok ? ({ kind: 'ok', info: content } as PtolemyOk) : (content as PtolemyError)
}

// TODO: Some kind of automatic check to see if our session cookie is valid.
// Use the heartbeat endpoint I added recently
