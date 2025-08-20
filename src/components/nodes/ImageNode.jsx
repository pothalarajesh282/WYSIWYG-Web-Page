import React, { useRef } from 'react'

export default function ImageNode({ node, editing, onChange, theme }) {
  const fileRef = useRef()

  const styles = {
    width: node.props.width ? `${node.props.width}px` : 'auto',
    height: node.props.height ? `${node.props.height}px` : 'auto',
    borderRadius: node.props.borderRadius ? `${node.props.borderRadius}px` : '0px',
    borderWidth: node.props.borderWidth ? `${node.props.borderWidth}px` : '0px',
    borderStyle: node.props.borderWidth ? 'solid' : 'none',
    borderColor: node.props.borderColor || 'transparent',
    objectFit: 'cover',
  }

  const handleUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange({ ...node.props, src: reader.result })
    reader.readAsDataURL(file)
  }

  if (!node.props.src && !editing) {
    return <div className={theme === 'dark' ? 'text-white/60' : 'text-gray-600'}>(No image uploaded)</div>
  }

  return (
    <div onDoubleClick={() => editing && fileRef.current.click()}>
      <img src={node.props.src || 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22160%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23f3f4f6%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-family=%22Arial%22 font-size=%2214%22>Upload Image</text></svg>'} alt={node.props.alt || ''} style={styles} className="block" />
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
    </div>
  )
}
