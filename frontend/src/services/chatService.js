import { apiRequest } from './api.js'

export const getHealth = () => apiRequest('/health')

export const sendMessage = async (message) => {
  const result = await apiRequest('/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  })

  return result.data.message
}
