import { useState } from 'react'

function ChatForm({ sendValue, isSending }) {
  const [value, setValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = value.trim()
    if (!message || isSending) return

    sendValue(message)
    setValue('')
  }

  return (
    <form className="chat-composer" onSubmit={handleSubmit}>
      <input
        aria-label="Write a message"
        placeholder="Write a message…"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit" disabled={isSending || !value.trim()}>
        {isSending ? 'Sending…' : 'Send'}
      </button>
    </form>
  )
}

export default ChatForm
