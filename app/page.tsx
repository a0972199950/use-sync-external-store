'use client'
import * as React from 'react'
import * as UserStore from '@/store/user'

const HomePage: React.FC = () => {
  let user = React.useSyncExternalStore(UserStore.subcribe, UserStore.getSnapshot)

  return (
    <div>
      <h1>User</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
    </div>
  )
}

export default HomePage

