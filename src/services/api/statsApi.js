import { API_BASE_URL } from '../config'
import { makeAuthenticatedRequest } from './apiUtils'

export async function fetchCourierStats() {
  try {
    const response = await makeAuthenticatedRequest(`${API_BASE_URL}/courier/stats`)
    return {
      data: response.data || [],
      error: null
    }
  } catch (error) {
    console.error('Stats API Error:', error.message)
    return {
      data: [],
      error: error.message || 'Failed to fetch stats'
    }
  }
}