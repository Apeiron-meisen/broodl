import React from 'react'
import { Fugaz_One,Open_Sans } 
from "next/font/google";
const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});
import Calendar from './Calendar';
export default function Dashboard() {
  const statuses = {
    num_days :14,
    time_remaining :"13:14:26",
    date : (new Date()).toDateString()
  }
  const emotions = {
    "Extremely sad":"😭",
    'Sad':'😢',
    'Normal':'😃',
    'Good':'😁',
    'Elated':'😍'
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
              <p className={'text-base sm:text-lg truncate '+ fugaz.className}>{statuses[status]}</p>
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
            <button key={index} className={"p-4 rounded-lg purpleShadow duration-200 bg-indigo-50 hover:bg-[lavender]  "+ (index===4?'col-span-2 sm:col-span-1':' ')}>
              <p>{emotion}</p>
              <p>{emotions[emotion]}</p>
            </button>
          )
        })
        
      }
      </div>
      <Calendar demo/>
    </div>
  )
}
