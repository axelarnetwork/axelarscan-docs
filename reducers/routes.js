import { ROUTES_DATA } from './types'

export default (
  state = {
    [ROUTES_DATA]: null,
  },
  action,
) => {
  switch (action.type) {
    case ROUTES_DATA:
      return {
        ...state,
        [ROUTES_DATA]: action.value,
      }
    default:
      return state
  }
}