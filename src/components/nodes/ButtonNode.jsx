import React from 'react'

function textContrast(hex) {
  if (!hex) return '#fff'
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000' : '#fff'
}

export default function ButtonNode({ node, editing, theme }) {
  const padding = node.props.padding ? `${node.props.padding}px` : '8px 16px'
  const style = {
    backgroundColor: node.props.bgColor || '#2563eb',
    color: textContrast(node.props.bgColor || '#2563eb'),
    borderRadius: node.props.borderRadius ? `${node.props.borderRadius}px` : '6px',
    borderWidth: node.props.borderWidth ? `${node.props.borderWidth}px` : '0px',
    borderStyle: node.props.borderWidth ? 'solid' : 'none',
    borderColor: node.props.borderColor || 'transparent',
    padding: node.props.padding ? `${node.props.padding}px` : '8px 16px',
  }

  return (
    <a href={editing ? undefined : node.props.href} className="inline-flex items-center justify-center font-medium shadow" style={style} onClick={(e) => editing && e.preventDefault()}>
      {node.props.label || 'Click'}
    </a>
  )
}
