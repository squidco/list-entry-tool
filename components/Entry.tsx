import React from 'react'

interface entryProps {
    text: string;
}

export default function Entry({text}: entryProps) {
  return (
    <div>{text}</div>
  )
}
