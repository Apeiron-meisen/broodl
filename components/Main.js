import React from 'react'
//rfc是快捷键
export default function Main(props) {
  const {children} = props
  return (
    //因为main内部还有好多component，它们必须竖着排列，因此加上了flex, flex-col
    <main className="flex-1 flex flex-col">
      {children}
    </main>
  )
}
