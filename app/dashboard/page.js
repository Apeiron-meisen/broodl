import Dashboard from "@/components/Dashboard";
import Main from "@/components/Main";
//我可以去掉metadata，加上'use client'变成client端渲染。但是这么做效率低，因为server端静态渲染更容易让SEO搜索引擎找到你的网页，加载网页时也更快
export const metadata = {
  title:"Broodl ⋅ Dashboard"
}
export default function DashboardPage(){
  // const {currentUser, loading} = useAuth()
  // const isAuthorized = true; // Add your authentication logic here
  //从useAuth的返回值获取的是绑在上面的data

  return (
      <Main>
        <Dashboard/>
      </Main>
  )
  
}