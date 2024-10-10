import Dashboard from "@/components/Dashboard";
import Hero from "@/components/Hero";
import Login from "@/components/Login";
import Main from "@/components/Main";
export const metadata = {
  title:"Broodl ⋅ Dashboard"
}
export default function DashboardPage(){
  const isAuthorized = true; // Add your authentication logic here
  let children = (
    <Login/>
  )
  if (isAuthorized){
    children = (<Dashboard/>)
  }

  return (
      <Main>
        {children}
      </Main>
  )
  
}