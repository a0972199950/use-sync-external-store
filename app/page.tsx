'use client'
import * as React from 'react'
import { useUser } from '@/store/user'
import { randomName } from '@/util'

const HomePage: React.FC = () => {
  const [user, setUser] = useUser()

  const handleUserNameChange = () => {
    setUser({
      ...user,
      name: randomName()
    })
  }

  return (
    <div>
      <h1>User</h1>
      <p>ID: {user?.id}</p>
      <p>Name: {user?.name}</p>

      <button onClick={() => handleUserNameChange()}>Change user name</button>
    </div>
  )
}

export default HomePage

