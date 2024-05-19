
import * as React from 'react'
import { randomId, randomName } from '@/util'

interface User {
  id: string
  name: string
  [key: string]: any
}

let user: User = {
  id: randomId(),
  name: randomName(),
}

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

const handleStoreUpdate = () => {
  callbacks.forEach(callback => callback())
}

export const useUser = () => {
  const result = React.useSyncExternalStore(subcribe, getSnapshot)

  const setUser = (newUser: User) => {
    user = newUser
    handleStoreUpdate()
  }

  return [result, setUser] as [User, (arg: User) => void]
}
