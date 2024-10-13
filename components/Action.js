'use client'
import React from 'react'
import Link from 'next/link'
import Button from './Button'
import { useAuth } from '@/context/AutoContext'
export default function Action() {
  const {currentUser} = useAuth()
  return currentUser ? 
  (
    <div className="grid gap-4 w-fit mx-auto">
      <Link href={'/dashboard'}>
        <Button text='Go to Dashboard'/>
      </Link>
    </div>
  ):
  (
    <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
      <Link href={'/dashboard'}>
        <Button text='Sign Up'/>
      </Link>
      <Link href={'/dashboard'}>
        <Button text='Login' dark/>
      </Link>
    </div>
  )
}
