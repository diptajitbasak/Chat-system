import { useEffect, useState } from 'react'
import ChatSection from './ChatSection.jsx'
import ChatForm from './ChatForm.jsx'
import { getHealth, sendMessage } from '../services/chatService.js'

function Chat() {
  const [messages, setMessages] = useState([])
  const [serverStatus, setServerStatus] = useState('Checking connection…')
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    getHealth()
      .then((health) => setServerStatus(health.message))
      .catch(() => setServerStatus('Backend connection failed'))
  }, [])

  const handleSend = async (text) => {
    setMessages((current) => [...current, { text, isBot: false }])
    setIsSending(true)

    try {
      const reply = await sendMessage(text)
      setMessages((current) => [...current, { text: reply, isBot: true }])
    } catch (error) {
      console.error('Chat API error:', error)
      setMessages((current) => [
        ...current,
        { text: "Sorry, I couldn't get a response. Please try again.", isBot: true },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="chat-card" aria-label="Chat">
      <div className="chat-toolbar">
        <span className="status-dot" aria-hidden="true" />
        <span>{serverStatus}</span>
      </div>
      <ChatSection data={messages} />
      <ChatForm sendValue={handleSend} isSending={isSending} />
    </section>
  )
}

export default Chat
