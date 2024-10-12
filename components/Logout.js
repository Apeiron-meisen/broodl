'use client'
import React from 'react'
import { useAuth } from '@/context/AutoContext'
import { Fugaz_One} from "next/font/google";
const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});
export default function Logout() {
  const {logout,currentUser} = useAuth()
  return (
    <button className={'text-base sm:text-lg textGradient ' +fugaz.className} onClick={logout}>
      {currentUser?"Logout":""}
    </button>
  )
}
