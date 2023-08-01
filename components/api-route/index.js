import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import Description from './description'
import Environment from '../environment'
import Request from './request'
import { getRoutes } from '../../lib/api'
import { getEnvironment, getRoute } from '../../lib/config'
import { toArray } from '../../lib/utils'
import { ROUTES_DATA } from '../../reducers/types'

export default () => {
  const dispatch = useDispatch()
  const { preferences, routes } = useSelector(state => ({ preferences: state.preferences, routes: state.routes }), shallowEqual)
  const { environment } = { ...preferences }
  const { routes_data } = { ...routes }

  const router = useRouter()
  const { pathname } = { ...router }

  useEffect(
    () => {
      const getData = async () => dispatch({ type: ROUTES_DATA, value: toArray(await getRoutes()) })
      getData()
    },
    [],
  )

  const data = {
    ...getRoute(pathname, routes_data),
    environment: getEnvironment(environment),
  }

  return (
    <div className="space-y-4">
      <Description data={data} />
      <Environment />
      <Request data={data} />
    </div>
  )
}