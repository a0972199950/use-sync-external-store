
import * as React from 'react'
import { randomId, randomName } from '@/util'

interface User {
  id: string
  name: string
  [key: string]: any
}

let user: User

let clientInitialized = false
let serverInitialized = false

declare global {
  interface Window {
    __PRELOADED_STATE__: any
  }
}

if (typeof window !== 'undefined' && !clientInitialized) {
  console.log('初始化 client')
  user = window.__PRELOADED_STATE__
  clientInitialized = true
} else if (!serverInitialized) {
  console.log('初始化 server')

  user = {
    id: randomId(),
    name: randomName(),
  }

  serverInitialized = true
}

console.log('user id: ', user?.id, serverInitialized, clientInitialized)

let callbacks: (() => any)[] = []

const subcribe = (callBack: () => any) => {
  callbacks.push(callBack)

  const unSubscribe = () => {
    callbacks = callbacks.filter(cb => cb !== callBack)
  }

  return unSubscribe
}

const getSnapshot = () => {
  return user
}

const getServerSnapshot = () => {
  return user
}

const handleStoreUpdate = () => {
  callbacks.forEach(callback => callback())
}

export const useUser = () => {
  const result = React.useSyncExternalStore(subcribe, getSnapshot, getServerSnapshot)

  const setUser = (newUser: User) => {
    user = newUser
    handleStoreUpdate()
  }

  return [result, setUser] as [User, (arg: User) => void]
}

export const clientStoreInit = () => {
  return React.createElement(
    'script',
    {
      dangerouslySetInnerHTML: { __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(user)}` }
    }
  )
}
