import localFont from "next/font/local";
import { Fugaz_One,Open_Sans } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { AuthProvider } from "@/context/AutoContext";
import Head from "./head";
import Logout from "@/components/Logout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]});
const opensans = Open_Sans({subsets: ["latin"]});

export const metadata = {
  title: "Broodl",
  description: "track your daily mood every day of the year."
};

const header = (
  <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
    <Link href={'/'}>
      <h1 className={'text-base sm:text-lg textGradient ' +fugaz.className}>Broodl</h1>
    </Link>
    <Logout/>
  </header>
)
//place-items-center把矩阵中的东西放在中心位置
const footer = (
  <footer className="p-4 sm:p-8 grid place-items-center  ">
    <p className={'text-indigo-500 '+fugaz.className}>Created with 😄</p>

  </footer>
)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head/>
      <AuthProvider>

        <body
        //flex-col指的是竖着排箱子
        className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700 ' + opensans.className}
        >
          {header}
          {children}
          {footer}
          
        </body>
      </AuthProvider>
      {/* 以下是字体的引入 
        仔细看AuthProvider内部代码，先是把其包括的children作为参数引入，然后再返回children，一来一回多了一个<AuthContext.Provider value={value}>标签.
        提问：如何使用携带的value数据呢？
      */}
    </html>
  );
}

// layout包裹同目录下的page.js，后者return的东西将作为layout的children参数.
// 如果新的目录下有新的page.js，那么layout就会用它作为children。如果有新的layout，后者更优先。它是一个优先序列层级
/*
我想知道，网页如何识别后缀? 答案:app下的目录名字就是后缀。里面必须要有page.js并且文件内应该有react component，即export default funtion(){return (里面填写html)}
*/