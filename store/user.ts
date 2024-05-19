
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

export const subcribe = (callBack: () => any) => {
  callbacks.push(callBack)

  const unSubscribe = () => {
    callbacks = callbacks.filter(cb => cb !== callBack)
  }

  return unSubscribe
}

export const getSnapshot = () => {
  return user
}

const handleStoreUpdate = () => {
  callbacks.forEach(callback => callback())
}

setInterval(() => {
  user = {
    ...user,
    name: randomName()
  }

  handleStoreUpdate()
}, 1000)