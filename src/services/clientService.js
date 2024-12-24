import {
  fetchClients as fetchClientsApi,
  searchClients as searchClientsApi,
  createClient as createClientApi,
  updateClient as updateClientApi,
  regenerateClientToken as regenerateClientTokenApi
} from './api/clientApi'

export async function getClients(params = {}) {
  try {
    return await fetchClientsApi(params)
  } catch (error) {
    console.error('Error fetching clients:', error)
    throw error
  }
}

export async function searchClients(params = {}) {
  try {
    return await searchClientsApi(params)
  } catch (error) {
    console.error('Error searching clients:', error)
    throw error
  }
}

export async function createClient(data) {
  try {
    return await createClientApi(data)
  } catch (error) {
    console.error('Error creating client:', error)
    throw error
  }
}

export async function updateClient(clientId, data) {
  try {
    return await updateClientApi(clientId, data)
  } catch (error) {
    console.error('Error updating client:', error)
    throw error
  }
}

export async function regenerateToken(clientId) {
  try {
    return await regenerateClientTokenApi(clientId)
  } catch (error) {
    console.error('Error regenerating client token:', error)
    throw error
  }
}