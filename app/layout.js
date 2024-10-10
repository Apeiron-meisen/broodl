import localFont from "next/font/local";
import "./globals.css";

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

export const metadata = {
  title: "Broodl",
  description: "track your daily mood every day of the year."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>header</header>
        {children}
        <footer>footer</footer>
        
      </body>
    </html>
  );
}

// layout包裹同目录下的page.js，后者return的东西将作为layout的children参数.
// 如果新的目录下有新的page.js，那么layout就会用它作为children。如果有新的layout，后者更优先。它是一个优先序列层级
/*
我想知道，网页如何识别后缀? 答案:app下的目录名字就是后缀。里面必须要有page.js并且文件内应该有react component，即export default funtion(){return (里面填写html)}
*/