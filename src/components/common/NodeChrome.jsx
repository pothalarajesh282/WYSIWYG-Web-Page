import React from 'react'
export default function NodeChrome({ selected, children, theme }){
  const dark = theme === 'dark'
  const ring = selected ? (dark ? 'ring-2 ring-blue-500' : 'ring-2 ring-blue-600') : (dark ? 'ring-1 ring-black/10' : 'ring-1 ring-gray-200')
  return <div className={`relative ${ring} rounded-lg ${dark? '': 'bg-white'} p-1`}>{children}</div>
}
