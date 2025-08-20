import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../components/common/constants.js'

export default function ToolbarItem({ label, kind, disabled, theme }) {
  const dark = theme === 'dark'
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TOOL,
    item: { kind },
    collect: m => ({ isDragging: m.isDragging() }),
    canDrag: !disabled,
  }), [disabled, theme])

  const base = dark
    ? 'border-white/10 bg-white/5 text-white'
    : 'border-gray-200 bg-white text-gray-900'

  
  const hoverBg = dark ? 'hover:bg-white' : 'hover:bg-gray-100'

  return (
    <button
      ref={disabled ? null : drag}
      disabled={disabled}
      className={`group w-full rounded-xl border p-3 text-left ${base} ${
        disabled ? 'opacity-30 cursor-not-allowed' : hoverBg
      } ${isDragging ? 'opacity-50' : ''}`}
    >
      <span
        className={
          dark
            ? 'block text-xs uppercase text-white/70 group-hover:text-black/70'
            : 'block text-xs uppercase text-gray-500'
        }
      >
        Add
      </span>
      <span
        className={
          dark
            ? 'text-base font-medium text-white group-hover:text-black'
            : 'text-base font-medium text-gray-900'
        }
      >
        {label}
      </span>
    </button>
  )
}
