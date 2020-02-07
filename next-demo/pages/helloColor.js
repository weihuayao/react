import React, { useState } from 'react'

export default function helloColor() {

  const [color, setColor] = useState('lightgreen')

  const changeColor = () => {
    setColor(color == 'lightgreen' ? 'red' : 'yellow')
  }
  return (
    <div>
      <div>
        <h1>color</h1>
        <button onClick={changeColor}>colorfully</button>
      </div>
      <style jsx>
        {
          ` div{ color:${color};}`
        }
      </style>
    </div>
  )
}