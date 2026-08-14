import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className="bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text"> {/* */}
    {text}
  </span>
  )
}

export default HighlightText