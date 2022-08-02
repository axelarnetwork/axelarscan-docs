import { useRouter } from 'next/router'

import { equals_ignore_case } from '../../utils'
import routes from '../../data/routes.json'

export default () => {
  const router = useRouter()
  const { pathname } = { ...router }

  const route_data = routes.find(r => equals_ignore_case(r?.id, pathname))
  const {
    parameters,
  } = { ...route_data }

  return (
    <>
    </>
  )
}