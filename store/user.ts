
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

const callbacks = new Set<() => any>()

export const subcribe = (callBack: () => any) => {
  callbacks.add(callBack)

  const unSubscribe = () => {
    callbacks.delete(callBack)
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