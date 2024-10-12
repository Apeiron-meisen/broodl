import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import Hero from "@/components/Hero";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { useAuth } from "@/context/AutoContext";
export const metadata = {
  title:"Broodl ⋅ Dashboard"
}
export default function DashboardPage(){
  // const isAuthorized = true; // Add your authentication logic here
  //从useAuth的返回值获取的是绑在上面的data
  const {currentUser,loading} = useAuth()
  
  let children = (
    <Login/>
  )
  if (loading){
    children = <Loading/>
  }

  if (currentUser){
    children = <Dashboard/>
  }

  return (
      <Main>
        {children}
      </Main>
  )
  
}