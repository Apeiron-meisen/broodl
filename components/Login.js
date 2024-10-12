'use client'
import React,{useState} from 'react'
import Button from './Button';
import { Fugaz_One } from "next/font/google";
import { useAuth } from '@/context/AutoContext';


const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});
export default function Login(){
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const {login,signup} = useAuth()

  async function handleSubmit(){
    if(!email || !password){
      alert("メールアドレスとパスワードを入力してください")
      return
    }
    if(password.length<6){
      alert("パスワードは六桁以上に入力してください")
      return
    }
    setAuthenticating(true)
    try{
      if(isRegister){
        await signup(email,password)
        console.log("Register new user")
      }else{
        await login(email,password)
        console.log("logging in new user")
      }
    }catch(error){
      const code = error.code
      if (code === "auth/invalid-credential"){
        alert("Invalid email or password")
      }
      console.log(error.code)
    }finally{
      setAuthenticating(false)
    }
    //自定义一个useState，告诉用户哪里出错了
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={'text-4xl sm:text-5xl md:text-6xl '+ fugaz.className}>{isRegister?'Register':"Log In"}</h3>
      <p>You're one step away!</p>
      <input value={email} onChange={(event)=>{
        setEmail(event.target.value)
      }} className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-800" placeholder="Email"/>
      <input value={password} onChange={(event)=>{
        setPassword(event.target.value)
      }} className="w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-800" placeholder="Password" type="passowrd"/>
      <div className="max-w-[400px] w-full mx-auto">
        <Button clickHandler={handleSubmit} text={authenticating?"Submitting":"Submit"} full />
      </div>
      <p className="text-center">{isRegister?"Already have an account? ":"Don't have an account? " }<button onClick={()=>{
        setIsRegister(!isRegister)
      }}  className="text-indigo-600">{isRegister?"Sign in":"Sign up"}</button></p>

    </div>
  )
}
// outline-none用来去除input输入时的黑色内框线
