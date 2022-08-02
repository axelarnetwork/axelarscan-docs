import { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { equals_ignore_case } from '../../utils'
import { ENVIRONMENT_ID } from '../../reducers/types'
import environments from '../../data/environments.json'

export default () => {
  const dispatch = useDispatch()
  const { environment } = useSelector(state => ({ environment: state.environment }), shallowEqual)
  const { environment_id } = { ...environment }

  const [value, setValue] = useState('mainnet')

  useEffect(() => {
    if (!equals_ignore_case(environment_id, value)) {
      setValue(environment_id)
    }
  }, [environment_id])

  const onClick = v => {
    setValue(v)
    dispatch({
      type: ENVIRONMENT_ID,
      value: v,
    })
  }

  return (
    <div className="w-fit bg-slate-50 dark:bg-zinc-900 rounded-xl flex flex-wrap item-center space-x-1 p-1">
      {environments?.map((e, i) => {
        const {
          id,
          name,
        } = { ...e }
        return (
          <button
            key={i}
            type="button"
            onClick={() => onClick(id)}
            className={`${id === value ? 'bg-white dark:bg-black shadow dark:shadow-zinc-800 text-black dark:text-white font-semibold' : 'bg-transparent text-slate-400 dark:text-slate-600 hover:text-slate-800 dark:hover:text-slate-200 font-normal hover:font-medium'} rounded-lg py-1 px-2`}
          >
            {name}
          </button>
        )
      })}
    </div>
  )
}