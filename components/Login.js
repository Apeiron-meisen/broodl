import React from 'react'
import { Fugaz_One } from "next/font/google";
const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});
import Button from './Button';
export default function Login(){
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={'text-4xl sm:text-5xl md:text-6xl '+ fugaz.className}>Log In / Register</h3>
      <p>You're one step away!</p>
      <input className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-800" placeholder="Email"/>
      <input className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-800" placeholder="Password" type="passowrd"/>
      <div className="max-w-[400px] w-full mx-auto">
        <Button text="Submit" full />
      </div>
      <p className="text-center">Don't have an account? <span className="text-indigo-600">Sign up</span></p>

    </div>
  )
}
// outline-none用来去除input输入时的黑色内框线
