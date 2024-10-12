'use client'
import React,{useEffect, useState} from 'react'
import { Fugaz_One,Open_Sans } 
from "next/font/google";
const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});
import Calendar from './Calendar';
import { useAuth } from '@/context/AutoContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Loading from './Loading';
import Login from './Login';

export default function Dashboard() {
  const {currentUser, userDataObj, setUserDataObj,loading} = useAuth()
  const [data, setData] = useState({})
  const now = new Date()
  async function handleSetMood(mood){
    
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    try{
      const newData = {...userDataObj}
      if(!newData?.[year]){
        newData[year] = {}
      }
      if(!newData?.[year]?.[month]){
        newData[year][month] = {}
      }
      
      newData[year][month][day] = mood
      //update local data,to calendar
      setData(newData)
      //update global data
      setUserDataObj(newData)
      //update firebase
      const docRef = doc(db,'users',currentUser.uid)
      //直接把data扔进firestore去更新，效率低.因为它会遍历data中的每一个值去创建新的，然后替代旧的
      // const response =await setDoc(docRef,newData)
      const response = await setDoc(docRef,{
        [year]:{
          [month]:{
            [day]:mood
          }
        }
      },{merge:true})
    }catch(error){
      console.error("Error writing document: ", error);
    }
  }

  function countDaysAndMoods(){
    let totalDays = 0
    let totalMoods = 0
    for (let year in data){
      for (let month in data[year]){
        for (let day in data[year][month]){
          const mood = data[year][month][day]
          totalDays++
          totalMoods += mood
        }
      }
    }
  return {"累計日数":totalDays,"平均ムード": ((totalMoods/totalDays)||0).toFixed(1)}
  }
  const statuses = {
    ...countDaysAndMoods(),
    "本日残り時間" : `${23-now.getHours()} 時 ${60-now.getMinutes()} 分`
  }
  const emotions = {
    "Extremely sad":"😭",
    'Sad':'😢',
    'Normal':'😃',
    'Good':'😁',
    'Elated':'😍'
  }
  useEffect(()=>{
    if (!currentUser || !userDataObj){
      return 
    }
    setData(userDataObj)
  },[currentUser,userDataObj])
  if(loading){
    return <Loading/>
  }
  if(!currentUser){
    return <Login/>
  }
  

//需要把json变成array。 key就是json中的key，拿到key之后去遍历map，对于每一个key执行固定函数并用列表储存每一个对应的结果。最后对于每一个输出内容，用一个div进行包裹，指定它的key=index
//flex flex-col gap-1 sm:gap-2,目的是让元素上下排列然后上下的gap更大一点
//js中写三目运算，要用括号括起来
//col-span-2是指一个item栏目占2个column span
  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 bg-indigo-50 rounded-lg">
        
        {Object.keys(statuses).map((status, statusindex)=>{
          return (
            <div key={statusindex} className='p-4 flex flex-col gap-1 sm:gap-2'>
              <p  className="font-medium uppercase text-xs sm:text-sm truncate ">{status.replace("_"," ")}</p>
              <p className={'text-base sm:text-lg truncate '+ fugaz.className}>{statuses[status]}{status==='累計日数'?"🔥":""}</p>
            </div>
          )
        })}
      </div>
      <h4 className={'text-4xl sm:text-5xl md:text-6xl text-center '+ fugaz.className}>
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.keys(emotions).map((emotion, index)=>{
          return (
            //只能传递函数，但如果函数有参数要传，你肯定不能写handlerset(param)，这样你传入是函数返回值，不是函数本身。必须用新匿名函数包裹它
            <button onClick={()=>{
              //因为mood的取值是1-5，但index取值范围是0-4
              const currentMotionVal = index + 1
              handleSetMood(currentMotionVal)
            }} key={index} className={"p-4 rounded-lg purpleShadow duration-200 bg-indigo-50 hover:bg-[lavender]  "+ (index===4?'col-span-2 sm:col-span-1':' ')}>
              <p>{emotion}</p>
              <p>{emotions[emotion]}</p>
            </button>
          )
        })
        
      }
      </div>
      <Calendar completeData={data} handleSetMood={handleSetMood}/>
    </div>
  )
}
