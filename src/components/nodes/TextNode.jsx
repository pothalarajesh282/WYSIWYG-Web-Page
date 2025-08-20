import React, { useMemo } from 'react'
import ReactQuill from 'react-quill'

export default function TextNode({ node, editing, onChange, onRequestClose, theme }) {
  const modules = useMemo(() => ({
    toolbar: [['bold','italic'], [{ size: ['small', false, 'large', 'huge'] }], [{ align: '' }, { align: 'center' }, { align: 'right' }], ['clean']],
  }), [])

  const wrapper = theme === 'dark' ? 'quill-dark' : ''

  return editing ? (
    <div className={wrapper}>
      <ReactQuill theme="snow" value={node.props.html} onChange={(html) => onChange({ ...node.props, html })} onBlur={() => onRequestClose && onRequestClose()} modules={modules} className="min-w-[200px] max-w-[600px]" />
    </div>
  ) : (
    <div className="min-w-[160px] max-w-[640px]" style={{ fontSize: node.props.fontSize, textAlign: node.props.align }} dangerouslySetInnerHTML={{ __html: node.props.html }} />
  )
}
