'use client'
import React,{useState} from 'react'
import { Fugaz_One } from 'next/font/google'
import { gradients, baseRating } from '@/utils'
const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });
export default function Calendar(props) {
  const {demo, completeData, handleSetMood} = props;
  const now = new Date()
  const defaultMonth = now.getMonth()
  // selectedMonth是用文字表述的，可不是index哟
  const [selectedMonth, setSelectedMonth] =useState(Object.keys(months)[defaultMonth])
  const [selectedYear, setSelectedYear] =useState(now.getFullYear())
  const numericSelectedMonth = monthsArr.indexOf(selectedMonth)
  const data = completeData?.[selectedYear]?.[numericSelectedMonth] || {}
  
  //增减月份显示的按钮
  function handleIncrementMonth(val){
    // +1 or -1
    //你不想改变变量的可变性，即const就是const，state本身是react自身管理。
    // numericSelectedMonth += val
    // if (numericSelectedMonth == 12){
      
    //   setSelectedYear(++selectedYear)
    //   numericSelectedMonth = 0
    // }
    // if (numericSelectedMonth == -1){
    //   setSelectedYear(--selectedYear)
    //   numericSelectedMonth = 11
    // }
    // setSelectedMonth(monthsArr[numericSelectedMonth])
    if (numericSelectedMonth + val === 12){
      //如何获取useState管理的state值？直接在set方法中引入匿名函数即可，匿名函数参数即是state
      setSelectedYear(currentYear => currentYear + 1)
      setSelectedMonth(monthsArr[0])
    }else if (numericSelectedMonth + val === -1){
      setSelectedYear(currentYear => currentYear - 1)
      setSelectedMonth(monthsArr[11])
    }else{
      setSelectedMonth(monthsArr[numericSelectedMonth + val])
    }
  }


  // const year =2024
  // const month = 'July'
  const monthNow = new Date(selectedYear, monthsArr.indexOf(selectedMonth), 1)
  
  //确定第一天是第一周的第几天，返回一周的第几天序列值
  const firstDayOfMonth = monthNow.getDay() //从0开始算
  const daysInMonth = new Date(selectedYear,monthsArr.indexOf(selectedMonth) + 1, 0).getDate()
  
  const daysToDisplay = firstDayOfMonth + daysInMonth
  const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay%7?1:0)

  
  //现在要创建一个grid来保存日历表
  return (
    <div className="flex flex-col gap-4">
      <div className='grid grid-cols-3 gap-1 '>
        <button onClick={()=>{
          return handleIncrementMonth(-1)
        }}><i className="fa-solid fa-arrow-left hover:opacity-60 text-2xl textGradient"></i></button>
        <p className={"text-center text-2xl textGradient " + fugaz.className}>{selectedMonth} {selectedYear}</p>
        <button onClick={()=>{
          handleIncrementMonth(1)
        }}><i className="fa-solid fa-arrow-right hover:opacity-60 text-2xl textGradient"></i></button>
      </div>
      <div className= 'flex flex-col overflow-hidden gap-1 py-2 sm:py-4 md:py-10'>
        {
          
          [...Array(numRows).keys()].map((row, row_index)=>{
            
            return (
              <div key={row_index} className='grid grid-cols-7 gap-1'>
                {dayList.map((dayOfWeek,dayOfWeekIndex )=>{
                  //dayIndex从0开始计算
                  //算的范围是row*days这个矩阵的总天数
                  let dayIndex = (row_index * 7) + dayOfWeekIndex-(firstDayOfMonth - 1) 
                  
                  //不展示第一列和最后一列不被计算的天数div
                  let dayDisplay = dayIndex > daysInMonth? false: (row ===0 && dayOfWeekIndex < firstDayOfMonth)? false : true
                  
                  let isToday = dayIndex === now.getDate()

                  if (!dayDisplay){
                    return (
                      <div className='bg-white'  key={dayOfWeekIndex} />
                    )
                  }
                  //对日期背景的颜色渐变进行设定
                  //如果是demo，那就用默认rating进行上色。如果不是，查日期是否在数据中有对应值，有就用，没有就white
                  let color = demo? gradients.indigo[baseRating[dayIndex]]:(dayIndex in data?gradients.indigo[data[dayIndex]]:'white')
                  //这里的style就是添加了css内容，设置了background
                  return (
                    <div style={{background:color}}  className={"border border-solid p-2 flex flex-col items-center text-xs sm:text-sm gap-2 justify-between rounded-lg " + (isToday?"border-indigo-400 ":"border-indigo-100 "+(color==='white'?'text-indigo-400':'text-white'))} key={dayOfWeekIndex}>
                      <p>{dayIndex}</p>
                    </div>
                  )
                })}
              
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
