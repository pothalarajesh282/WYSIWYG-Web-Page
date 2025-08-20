import React from 'react'

export default function Inspector({ selectedNode, updateNodeProps, canvasBg, setCanvasBg, preview, theme }) {
  if (!selectedNode) {
    return (
      <aside className={`col-span-3 p-3 rounded-2xl border-l ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
        <p className={theme==='dark'? 'text-white/70':'text-gray-700'}>Select an element to edit its styles.</p>
      </aside>
    )
  }

  const labelClass = theme === 'dark' ? 'text-xs text-white/70' : 'text-xs text-gray-700'
  const inputClass = theme === 'dark' ? 'rounded-lg border border-white/10 bg-transparent p-2 text-sm text-white' : 'rounded-lg border border-gray-200 bg-white p-2 text-sm text-gray-900'
  const selectClass = inputClass

  return (
    <aside className='col-span-3 rounded-2xl p-3' style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.06)' : undefined, background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
      <div>
        <h3 className={theme === 'dark' ? 'mb-2 text-sm font-semibold text-white' : 'mb-2 text-sm font-semibold text-gray-800'}>Inspector</h3>
        <div className='flex items-center gap-2 mb-3'>
          <label className={labelClass}>Canvas</label>
          <input type='color' value={canvasBg} onChange={(e) => setCanvasBg(e.target.value)} className='h-8 w-14 cursor-pointer rounded border p-1' disabled={preview} />
        </div>
      </div>

      <div className='h-px w-full bg-white/10 my-4' />

      {selectedNode.type === 'text' && (
        <div className='space-y-3'>
          <label className={labelClass}>Font Size</label>
          <input type='number' min={10} max={72} value={selectedNode.props.fontSize || 16} onChange={(e) => updateNodeProps({ ...selectedNode.props, fontSize: Number(e.target.value) })} className={inputClass} disabled={preview} />
          <label className={labelClass}>Align</label>
          <select value={selectedNode.props.align} onChange={(e) => updateNodeProps({ ...selectedNode.props, align: e.target.value })} className={selectClass} disabled={preview}>
            <option value='left'>Left</option>
            <option value='center'>Center</option>
            <option value='right'>Right</option>
          </select>
        </div>
      )}

      {selectedNode.type === 'image' && (
        <div className='space-y-3'>
          <label className={labelClass}>Upload</label>
          <input type='file' accept='image/*' onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => updateNodeProps({ ...selectedNode.props, src: reader.result }); reader.readAsDataURL(file); }} className={theme === 'dark' ? 'w-full text-xs text-white/70' : 'w-full text-xs text-gray-700'} disabled={preview} />

          <label className={labelClass}>Width (px)</label>
          <input type='number' min={10} max={1600} value={selectedNode.props.width || 300} onChange={(e) => updateNodeProps({ ...selectedNode.props, width: Number(e.target.value) })} className={inputClass} disabled={preview} />

          <label className={labelClass}>Height (px)</label>
          <input type='number' min={10} max={1600} value={selectedNode.props.height || 180} onChange={(e) => updateNodeProps({ ...selectedNode.props, height: Number(e.target.value) })} className={inputClass} disabled={preview} />

          <label className={labelClass}>Border Radius (px)</label>
          <input type='number' min={0} max={200} value={selectedNode.props.borderRadius || 0} onChange={(e) => updateNodeProps({ ...selectedNode.props, borderRadius: Number(e.target.value) })} className={inputClass} disabled={preview} />

          <label className={labelClass}>Border Width (px)</label>
          <input type='number' min={0} max={50} value={selectedNode.props.borderWidth || 0} onChange={(e) => updateNodeProps({ ...selectedNode.props, borderWidth: Number(e.target.value) })} className={inputClass} disabled={preview} />

          <label className={labelClass}>Border Color</label>
          <input type='color' value={selectedNode.props.borderColor || '#000000'} onChange={(e) => updateNodeProps({ ...selectedNode.props, borderColor: e.target.value })} className={inputClass} disabled={preview} />
        </div>
      )}

      {selectedNode.type === 'button' && (
        <div className='space-y-3'>
          <label className={labelClass}>Label</label>
          <input type='text' value={selectedNode.props.label || 'Click'} onChange={(e) => updateNodeProps({ ...selectedNode.props, label: e.target.value })} className={inputClass} disabled={preview} />

          <label className={labelClass}>Link</label>
          <input type='text' value={selectedNode.props.href || ''} onChange={(e) => updateNodeProps({ ...selectedNode.props, href: e.target.value })} className={inputClass} disabled={preview} />

          <label className={labelClass}>Background Color</label>
          <input type='color' value={selectedNode.props.bgColor || '#2563eb'} onChange={(e) => updateNodeProps({ ...selectedNode.props, bgColor: e.target.value })} className={inputClass} disabled={preview} />

          <label className={labelClass}>Border Radius (px)</label>
          <input type='number' min={0} max={64} value={selectedNode.props.borderRadius || 6} onChange={(e) => updateNodeProps({ ...selectedNode.props, borderRadius: Number(e.target.value) })} className={inputClass} disabled={preview} />

          <label className={labelClass}>Border Width (px)</label>
          <input type='number' min={0} max={16} value={selectedNode.props.borderWidth || 0} onChange={(e) => updateNodeProps({ ...selectedNode.props, borderWidth: Number(e.target.value) })} className={inputClass} disabled={preview} />

          <label className={labelClass}>Border Color</label>
          <input type='color' value={selectedNode.props.borderColor || '#000000'} onChange={(e) => updateNodeProps({ ...selectedNode.props, borderColor: e.target.value })} className={inputClass} disabled={preview} />

          <label className={labelClass}>Padding (px)</label>
          <input type='number' min={0} max={40} value={selectedNode.props.padding || 8} onChange={(e) => updateNodeProps({ ...selectedNode.props, padding: Number(e.target.value) })} className={inputClass} disabled={preview} />
        </div>
      )}
    </aside>
  )
}
