//在一开始写这句话，nextjs就不会prebuild页面，因为需要等到client那边生成。这时我们终于可以使用react state
'use client'
import { auth, db } from '@/firebase'
import { onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import React, {useContext, useState, useEffect} from 'react'

const AuthContext = React.createContext()
//自定义hook来使用AuthContext
export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}){
  //下面这么写也行，都行
  // const {children} = props
  const [currentUser, setCurrentUser] = useState(null)
  const [useDataObj, setUserDataObj] = useState(null)
  const [loading, setLoading] = useState(true)

  // Auth handlers
  function signup(email, password){
    return createUserWithEmailAndPassword(auth, email, password)
  }
  function login(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }
  function logout(){
    setUseDataObj({})
    setCurrentUser(null)
    return signOut(auth)
  }
  //跟踪事件，相当于addEventListener。第二个参数是事件名称，如果空白，默认是Mount Event，即每一次渲染
  //目的是，当用户登录时，从firebase中获取该用户数据，然后传入到global context state，也就是那个userObj
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,async user =>{
      try{
        // set use to local context state
        setLoading(true)
        setCurrentUser(user)
        if (!user){
          console.log("no user found!")
          return
        }

        //if user exists, fetch data from firebase database
        console.log("fetching user data from firebase")
        const docRef = doc(db,'users', user.uid)
        const docSnap = await getDoc(docRef)
        let firebaseData = {}
        if (docSnap.exists()){
          console.log("found user data!")
          firebaseData = docSnap.data()
        }
        setUserDataObj(firebaseData)

      }catch(err){
        console.log(err.message)
      }finally{
        setLoading(false)
      }
    })
    
  },[])

  const value = {
    currentUser,
    useDataObj,
    setUserDataObj,
    signup,
    logout,
    login,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}