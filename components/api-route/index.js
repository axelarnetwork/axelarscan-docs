import { useRouter } from 'next/router'
import { useSelector, shallowEqual } from 'react-redux'

import Description from './description'
import Environment from '../environment'
import Request from './request'
import { equals_ignore_case } from '../../utils'
import environments from '../../data/environments.json'
import routes from '../../data/routes.json'

export default () => {
  const { environment } = useSelector(state => ({ environment: state.environment }), shallowEqual)
  const { environment_id } = { ...environment }

  const router = useRouter()
  const { pathname } = { ...router }

  const environment_data = environments.find(e => equals_ignore_case(e?.id, environment_id))
  const route_data = routes.find(r => equals_ignore_case(r?.id, pathname))
  const data = {
    ...route_data,
    environment: environment_data,
  }

  return (
    <div className="space-y-4">
      <Description data={data} />
      <Environment />
      <Request data={data} />
    </div>
  )
}