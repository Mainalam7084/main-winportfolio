import React, { useState } from 'react'

const px = { fontFamily: 'var(--font-family-pixel)' }

const inputStyle = {
  width: '100%',
  border: '2px solid #000',
  padding: '8px 10px',
  background: '#fff',
  fontFamily: 'var(--font-family-pixel)',
  fontSize: '12px',
  outline: 'none',
  boxSizing: 'border-box',
  letterSpacing: '0.5px',
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div style={{
        width: '100%', height: '100%', background: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '16px', padding: '24px',
      }}>
        <div style={{
          width: '72px', height: '72px', border: '3px solid #000', background: '#facc15',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg viewBox="0 0 16 16" width="48" height="48" style={{ imageRendering: 'pixelated' }} fill="#000">
            <rect x="2" y="8" width="2" height="2"/>
            <rect x="4" y="10" width="2" height="2"/>
            <rect x="6" y="12" width="2" height="2"/>
            <rect x="8" y="10" width="2" height="2"/>
            <rect x="10" y="8" width="2" height="2"/>
            <rect x="12" y="6" width="2" height="2"/>
            <rect x="14" y="4" width="2" height="2"/>
          </svg>
        </div>
        <div style={{ ...px, fontSize: '18px', letterSpacing: '2px', textAlign: 'center' }}>MESSAGE SENT!</div>
        <div style={{ ...px, fontSize: '11px', color: '#555', textAlign: 'center', lineHeight: '1.8' }}>
          Thanks for reaching out.<br/>I'll get back to you within 24-48 hours.
        </div>
        <button
          onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setSent(false) }}
          style={{
            ...px, fontSize: '12px', letterSpacing: '1px',
            padding: '8px 20px', border: '2px solid #000', background: '#000', color: '#facc15',
            cursor: 'pointer',
          }}
        >
          SEND ANOTHER
        </button>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: '#fff', padding: '24px' }}>

      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ ...px, fontSize: '20px', letterSpacing: '2px', fontWeight: 'bold', marginBottom: '4px' }}>
          GET IN TOUCH
        </div>
        <div style={{ ...px, fontSize: '11px', color: '#666', lineHeight: '1.7' }}>
          Have a project in mind? I'd love to hear about it.<br/>
          Fill out the form and I'll get back to you soon.
        </div>
      </div>

      <div style={{ borderTop: '3px solid #000', marginBottom: '20px' }} />

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Name + Email row */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '140px' }}>
            <label style={{ ...px, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
              NAME *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Alex Monroe"
              required
              style={inputStyle}
              onFocus={(e) => { e.target.style.background = '#fffbeb'; e.target.style.borderColor = '#facc15' }}
              onBlur={(e) => { e.target.style.background = '#fff'; e.target.style.borderColor = '#000' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: '140px' }}>
            <label style={{ ...px, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
              EMAIL *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="alex@example.com"
              required
              style={inputStyle}
              onFocus={(e) => { e.target.style.background = '#fffbeb'; e.target.style.borderColor = '#facc15' }}
              onBlur={(e) => { e.target.style.background = '#fff'; e.target.style.borderColor = '#000' }}
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label style={{ ...px, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
            SUBJECT *
          </label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Project inquiry / collaboration / hello"
            required
            style={inputStyle}
            onFocus={(e) => { e.target.style.background = '#fffbeb'; e.target.style.borderColor = '#facc15' }}
            onBlur={(e) => { e.target.style.background = '#fff'; e.target.style.borderColor = '#000' }}
          />
        </div>

        {/* Message */}
        <div>
          <label style={{ ...px, fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
            MESSAGE *
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            required
            rows={5}
            style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
            onFocus={(e) => { e.target.style.background = '#fffbeb'; e.target.style.borderColor = '#facc15' }}
            onBlur={(e) => { e.target.style.background = '#fff'; e.target.style.borderColor = '#000' }}
          />
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ ...px, fontSize: '10px', color: '#aaa' }}>
            * required fields
          </div>
          <button
            type="submit"
            style={{
              ...px, fontSize: '13px', letterSpacing: '2px',
              padding: '10px 28px',
              border: '3px solid #000', background: '#000', color: '#facc15',
              cursor: 'pointer', transition: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.color = '#000' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#facc15' }}
          >
            SEND MESSAGE
          </button>
        </div>

      </form>

      <div style={{ borderTop: '2px solid #000', marginTop: '24px', paddingTop: '12px' }}>
        <div style={{ ...px, fontSize: '10px', color: '#aaa', letterSpacing: '1px' }}>
          BRUTA/OS — contact.exe v1.0.0
        </div>
      </div>
    </div>
  )
}
