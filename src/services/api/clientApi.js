import { API_BASE_URL } from '../config'
import { makeAuthenticatedRequest } from './apiUtils'

export async function fetchClients(params = {}) {
  const queryParams = new URLSearchParams(params).toString()
  const url = `${API_BASE_URL}/clients${queryParams ? `?${queryParams}` : ''}`
  return makeAuthenticatedRequest(url)
}

export async function searchClients(params = {}) {
  const queryParams = new URLSearchParams(params).toString()
  const url = `${API_BASE_URL}/clients/search${queryParams ? `?${queryParams}` : ''}`
  return makeAuthenticatedRequest(url)
}

export async function createClient(data) {
  return makeAuthenticatedRequest(`${API_BASE_URL}/clients`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export async function updateClient(clientId, data) {
  return makeAuthenticatedRequest(`${API_BASE_URL}/clients/${clientId}/edit`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export async function regenerateClientToken(clientId) {
  return makeAuthenticatedRequest(`${API_BASE_URL}/clients/${clientId}/retoken`, {
    method: 'POST'
  })
}