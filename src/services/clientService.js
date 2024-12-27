import {
  fetchClients as fetchClientsApi,
  searchClients as searchClientsApi,
  createClient as createClientApi,
  updateClient as updateClientApi,
  regenerateClientToken as regenerateClientTokenApi
} from './api/clientApi'

export async function getClients(params = {}) {
  return fetchClientsApi(params)
}

export async function searchClients(params = {}) {
  return searchClientsApi(params)
}

export async function createClient(data) {
  return createClientApi(data)
}

export async function updateClient(clientId, data) {
  return updateClientApi(clientId, data)
}

export async function regenerateToken(clientId) {
  return regenerateClientTokenApi(clientId)
}