import { useState, useRef, useCallback } from 'react'

export default function ImageSlot({ id, placeholder = 'Drop a photo', shape = 'rounded', className = '', style = {} }) {
  const [src, setSrc] = useState(() => {
    try { return localStorage.getItem(`ccmun-img-${id}`) || null } catch { return null }
  })
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  const loadFile = useCallback(file => {
    if (!file?.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = e => {
      const data = e.target.result
      setSrc(data)
      try { localStorage.setItem(`ccmun-img-${id}`, data) } catch {}
    }
    reader.readAsDataURL(file)
  }, [id])

  const borderRadius = shape === 'circle' ? '50%' : shape === 'pill' ? '999px' : '2px'
  const label = src ? `Photo uploaded. Click to replace.` : `${placeholder}. Click or drag to upload.`

  return (
    <div
      className={`image-slot${className ? ' ' + className : ''}`}
      role="button"
      tabIndex={0}
      aria-label={label}
      style={{
        position: 'relative',
        display: 'block',
        borderRadius,
        overflow: 'hidden',
        background: 'var(--paper-deep)',
        cursor: 'pointer',
        outline: dragging ? '2px dashed var(--red)' : undefined,
        ...style,
      }}
      onClick={() => inputRef.current?.click()}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click() } }}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); loadFile(e.dataTransfer.files[0]) }}
    >
      {src
        ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} />
        : <div className="ph" style={{ borderRadius }}><span className="ph-tag">{placeholder}</span></div>
      }
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => loadFile(e.target.files[0])} />
    </div>
  )
}
