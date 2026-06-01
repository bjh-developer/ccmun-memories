import { useState } from 'react'

export default function ImageSlot({ id, shape = 'rounded', className = '', style = {} }) {
  const [failed, setFailed] = useState(false)
  const borderRadius = shape === 'circle' ? '50%' : shape === 'pill' ? '999px' : '2px'

  return (
    <div
      className={`image-slot${className ? ' ' + className : ''}`}
      style={{
        position: 'relative',
        display: 'block',
        borderRadius,
        overflow: 'hidden',
        background: 'var(--paper-deep)',
        ...style,
      }}
    >
      {!failed && id
        ? <img
            src={`/images/${id}.jpg`}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
            onError={() => setFailed(true)}
          />
        : null
      }
    </div>
  )
}
