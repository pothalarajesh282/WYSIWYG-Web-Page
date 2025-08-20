import React from 'react'
import ToolbarItem from './ToolbarItem.jsx'
export default function Toolbar({ preview, theme }){
  const head = theme==='dark'? 'text-white':'text-gray-800'
  return (
    <aside className='col-span-2 rounded-2xl border p-3' style={{ borderColor: theme==='dark'? 'rgba(255,255,255,0.06)': undefined, background: theme==='dark'? 'rgba(255,255,255,0.02)': 'transparent' }}>
      <div className='mb-3 flex items-center justify-between'><h2 className={head}>Components</h2></div>
      <div className='space-y-2'>
        <ToolbarItem label='Text' kind='text' disabled={preview} theme={theme} />
        <ToolbarItem label='Image' kind='image' disabled={preview} theme={theme} />
        <ToolbarItem label='Button' kind='button' disabled={preview} theme={theme} />
      </div>
      <p className={theme==='dark'? 'mt-4 text-xs text-white/60':'mt-4 text-xs text-gray-500'}>Drag an item onto the canvas →</p>
    </aside>
  )
}
