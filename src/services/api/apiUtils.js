export async function makeAuthenticatedRequest(url, options = {}) {
  const token = localStorage.getItem('authToken')
  if (!token) {
    throw new Error('No authentication token found')
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken')
        throw new Error('Authentication expired')
      }
      
      if (response.status === 422 && data.errors) {
        const error = new Error('Validation failed')
        error.validation = data.errors
        throw error
      }
      
      throw new Error(data.message || 'Request failed')
    }

    return data
  } catch (error) {
    if (!error.validation) {
      console.error('API Error:', error)
    }
    throw error
  }
}