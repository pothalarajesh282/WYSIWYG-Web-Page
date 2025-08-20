import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../components/common/constants.js'
import NodeChrome from '../../components/common/NodeChrome.jsx'
import TextNode from '../../components/nodes/TextNode.jsx'
import ImageNode from '../../components/nodes/ImageNode.jsx'
import ButtonNode from '../../components/nodes/ButtonNode.jsx'

export default function CanvasNode({ node, selectedId, setSelectedId, moveNode, updateNodeProps, removeNode, preview, theme, editingId, setEditingId }) {
  const ref = React.useRef(null)
  const [{ isDragging }, drag] = useDrag(() => ({ type: ItemTypes.NODE, item: { id: node.id }, collect: (m)=>({ isDragging: m.isDragging() }), canDrag: !preview }), [node.id, preview])
  const [, drop] = useDrop(() => ({ accept: ItemTypes.NODE, hover: (item, monitor) => { if (!ref.current) return; const delta = monitor.getDifferenceFromInitialOffset(); if (!delta) return; const newX = Math.round(node.x + delta.x); const newY = Math.round(node.y + delta.y); moveNode(node.id, newX, newY); } }), [node, moveNode])

  drag(drop(ref))

  const selected = selectedId === node.id
  const isEditing = editingId === node.id && !preview
  const common = { editing: isEditing, onChange: (props) => updateNodeProps(node.id, props), theme }

  return (
    <div ref={ref} style={{ left: node.x, top: node.y }} onClick={(e) => { e.stopPropagation(); setSelectedId(node.id) }} onDoubleClick={() => !preview && setEditingId(node.id)} className={`absolute ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
      <NodeChrome selected={!preview && selected} theme={theme}>
        {node.type === 'text' && <TextNode node={node} {...common} onRequestClose={() => setEditingId(null)} />}
        {node.type === 'image' && <ImageNode node={node} {...common} />}
        {node.type === 'button' && <ButtonNode node={node} {...common} />}
        {!preview && (
          <button
            onClick={() => removeNode(node.id)}
            className="absolute top-1 right-1 bg-rose-600 text-white text-xs px-2 rounded"
          >
            ✕
          </button>
        )}
      </NodeChrome>
    </div>
  )
}
