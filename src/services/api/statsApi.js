import { API_BASE_URL } from '../config'
import { makeAuthenticatedRequest } from './apiUtils'

export async function fetchCourierStats() {
  return makeAuthenticatedRequest(`${API_BASE_URL}/courier/stats`)
}