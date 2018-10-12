import { Map } from 'immutable'

/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = Map({
  cachedData: null,
  cachedDataErrorMessage: null,
  cachedDataIsLoading: false,
})