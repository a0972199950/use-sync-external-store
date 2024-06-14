
import * as React from 'react'
import { randomId, randomName } from '@/util'

interface User {
  id: string
  name: string
  [key: string]: any
}

declare global {
  interface Window {
    __PRELOADED_STATE__: User
  }
}


class UserStore {
  static _instance: UserStore
  user: User

  private constructor() {
    this.user = {
      id: 'this is an id',
      name: 'John'
    }
  }

  public static getInstance(): UserStore {
    if (!UserStore._instance) {
      UserStore._instance = new UserStore()
    }

    return UserStore._instance
  }

  public setValue(user: User) {
    this.user = user
  }

  public getValue () {
    return this.user
  }
}

export const initialStore = UserStore.getInstance()
let clientStore: UserStore | null = null

const getServerSnapshot = () => {
  if (typeof window === 'undefined') {
    return initialStore.user
  }
  
  if (!clientStore) {
    clientStore = UserStore.getInstance()
    clientStore.setValue(window.__PRELOADED_STATE__)
  }

  return clientStore.user
}

const getSnapshot = () => {
  if (!clientStore) {
    clientStore = UserStore.getInstance()
    clientStore.setValue(window.__PRELOADED_STATE__)
  }

  return clientStore.user
}

const callbacks = new Set<() => any>()

const subcribe = (callBack: () => any) => {
  callbacks.add(callBack)

  const unSubscribe = () => {
    callbacks.delete(callBack)
  }

  return unSubscribe
}

const handleStoreUpdate = () => {
  callbacks.forEach(callback => callback())
}

export const useUser = () => {
  const result = React.useSyncExternalStore(subcribe, getSnapshot, getServerSnapshot)

  const setUser = (newUser: User) => {
    clientStore!.user = newUser
    handleStoreUpdate()
  }

  return [result, setUser] as [User, (arg: User) => void]
}
