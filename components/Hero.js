import React from 'react'
import { Fugaz_One } from "next/font/google";
const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});
import Button from './Button';
import Calendar from './Calendar';
import Link from 'next/link';
import Action from './Action';
export default function Hero() {
  return (
    //字体颜色太深了，弄浅一点，用text-slate-700
    //如果想设置整个字体都是默认上述颜色深度，在layout上面设置
    //w-full mx-auto max-w-[600px]这三个是保证下面的段落跟上面的段落呈现一个倒三角形，有一种美感，特意限制了最大宽度，并自动横向padding保持居中
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10 md:gap-14">
      
      <h1 className={"text-5xl sm:text-6xl md:text-7xl text-center "+ fugaz.className}>
        <span className="textGradient">Broodl</span> helps you track your <span className="textGradient">daily</span> mood!
      </h1>
      
      <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]">Create your mood record and see how you feel on <span className='font-semibold'>every day of every year.</span></p>
      <Action/>
      <Calendar demo />

    </div>
  )
}
//w-fit mx-auto 用来让容器内部，比如按钮容器的大小跟外部容器相匹配。不要按钮的文字很少，外面容器的长度却很大
