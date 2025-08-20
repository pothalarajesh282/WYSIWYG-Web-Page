import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Toolbar from './Toolbar.jsx'
import Canvas from './Canvas.jsx'
import Inspector from './Inspector.jsx'
import { BLUEPRINTS } from '../../components/common/constants.js'

export default function WysiwygPageBuilder() {
  const [nodes, setNodes] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [preview, setPreview] = useState(false)
  const [canvasBg, setCanvasBg] = useState('#0b1220')
  const [theme, setTheme] = useState('dark')

  const [history, setHistory] = useState([])
  const [future, setFuture] = useState([])

  const pushHistory = useCallback((state) => {
    setHistory((h) => [...h, state])
    setFuture([])
  }, [])

  useEffect(() => {
    // initial snapshot
    pushHistory({ nodes: JSON.parse(JSON.stringify(nodes)), canvasBg })
  }, [])

  const addNodeAt = useCallback((kind, x, y) => {
    const create = BLUEPRINTS[kind]
    if (!create) return
    pushHistory({ nodes: JSON.parse(JSON.stringify(nodes)), canvasBg })
    const node = create()
    node.x = x - 20
    node.y = y - 20
    setNodes((prev) => [...prev, node])
    setSelectedId(node.id)
  }, [nodes, canvasBg, pushHistory])

  const moveNode = useCallback((id, x, y) => {
    pushHistory({ nodes: JSON.parse(JSON.stringify(nodes)), canvasBg })
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, x, y } : n)))
  }, [nodes, canvasBg, pushHistory])

  const updateNodeProps = useCallback((id, props) => {
    pushHistory({ nodes: JSON.parse(JSON.stringify(nodes)), canvasBg })
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, props } : n)))
  }, [nodes, canvasBg, pushHistory])

  const undo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1]
      setFuture((f) => [{ nodes: JSON.parse(JSON.stringify(nodes)), canvasBg }, ...f])
      setNodes(prev.nodes)
      setCanvasBg(prev.canvasBg)
      setHistory((h) => h.slice(0, -1))
    }
  }

  const redo = () => {
    if (future.length > 0) {
      const next = future[0]
      setHistory((h) => [...h, { nodes: JSON.parse(JSON.stringify(nodes)), canvasBg }])
      setNodes(next.nodes)
      setCanvasBg(next.canvasBg)
      setFuture((f) => f.slice(1))
    }
  }

  const selectedNode = useMemo(() => nodes.find((n) => n.id === selectedId) ?? null, [nodes, selectedId])

  const exportJson = () => {
    const data = { canvasBg, nodes }
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    alert('Layout JSON copied to clipboard.')
  }

  const clearAll = () => {
    if (confirm('Clear canvas?')) {
      pushHistory({ nodes: JSON.parse(JSON.stringify(nodes)), canvasBg })
      setNodes([])
      setSelectedId(null)
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={theme === 'dark' ? 'flex h-screen w-full flex-col bg-slate-900 text-white' : 'flex h-screen w-full flex-col bg-white text-gray-900'}>
        <header className='flex items-center justify-between gap-3 border-b px-5 py-3' style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
          <div className='flex items-center gap-3'>
            <div className='grid h-8 w-8 place-items-center rounded-xl' style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)', color: theme === 'dark' ? '#fff' : '#111' }}>WB</div>
            <h1 className='text-lg font-semibold'>WYSIWYG Web Page Builder</h1>
            <span className='rounded-xl px-2 py-1 text-xs' style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}>React + Tailwind</span>
          </div>

          <div className='flex items-center gap-2'>
            <button onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} className='rounded-xl border px-3 py-1.5 text-sm' style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>{theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</button>
            <button onClick={undo} className='rounded-xl border px-3 py-1.5 text-sm' style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>Undo</button>
            <button onClick={redo} className='rounded-xl border px-3 py-1.5 text-sm' style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>Redo</button>
            <button onClick={() => setPreview((p) => !p)} className='rounded-xl border px-3 py-1.5 text-sm' style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>{preview ? 'Exit Preview' : 'Preview'}</button>
            <button onClick={exportJson} className='rounded-xl border px-3 py-1.5 text-sm' style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>Export JSON</button>
            <button onClick={clearAll} className='rounded-xl bg-rose-600 px-3 py-1.5 text-sm'>Clear</button>
          </div>
        </header>

        <div className='grid h-[calc(100vh-56px)] grid-cols-12 gap-4 p-4'>
          <Toolbar preview={preview} theme={theme} />
          <Canvas nodes={nodes} addNodeAt={addNodeAt} moveNode={moveNode} updateNodeProps={updateNodeProps} selectedId={selectedId} setSelectedId={setSelectedId} preview={preview} canvasBg={canvasBg} theme={theme} editingId={editingId} setEditingId={setEditingId} />
          <Inspector selectedNode={selectedNode} updateNodeProps={(props) => selectedNode && updateNodeProps(selectedNode.id, props)} canvasBg={canvasBg} setCanvasBg={setCanvasBg} preview={preview} theme={theme} />
        </div>

        <footer className='border-t px-5 py-2 text-xs opacity-60' style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
          Double-click text to edit rich content. Double-click image to upload. Drag elements to reposition (editing mode only).
        </footer>
      </div>
    </DndProvider>
  )
}
