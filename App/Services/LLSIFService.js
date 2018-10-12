import { create } from 'apisauce'
import { Config } from 'App/Config'

const LLSIFApiClient = create({
  baseURL: Config.API_URL,
  timeout: 5000
})

async function fetchCachedData() {
  const response = await LLSIFApiClient.get(Config.CACHED_DATA)
  if (response.ok) {
    return response.data
  }
  return null
}

async function fetchCardList(page) {
  const response = await LLSIFApiClient.get(Config.CARDS, { ordering: '-release_date', page: page })
  if (response.ok) {
    return response.data.results
  }
  return null
}

export const LLSIFService = {
  fetchCachedData, fetchCardList
}