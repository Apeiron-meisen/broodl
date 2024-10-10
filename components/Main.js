import React from 'react'
//rfc是快捷键
export default function Main(props) {
  const {children} = props
  return (
    <main>
      {children}
    </main>
  )
}
