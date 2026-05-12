import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

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
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      setSent(true)
    } catch (err) {
      setError('Failed to send message. Please try again.')
    } finally {
      setSending(false)
    }
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

      <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {error && (
            <div style={{ ...px, fontSize: '11px', color: '#dc2626', border: '2px solid #dc2626', padding: '6px 10px' }}>
              {error}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ ...px, fontSize: '10px', color: '#aaa' }}>
              * required fields
            </div>
            <button
              type="submit"
              disabled={sending}
              style={{
                ...px, fontSize: '13px', letterSpacing: '2px',
                padding: '10px 28px',
                border: '3px solid #000',
                background: sending ? '#555' : '#000',
                color: sending ? '#aaa' : '#facc15',
                cursor: sending ? 'not-allowed' : 'pointer',
                transition: 'none',
              }}
              onMouseEnter={(e) => { if (!sending) { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.color = '#000' } }}
              onMouseLeave={(e) => { if (!sending) { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#facc15' } }}
            >
              {sending ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </div>
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
