import { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { ENVIRONMENTS } from '../../lib/config'
import { equalsIgnoreCase } from '../../lib/utils'
import { ENVIRONMENT } from '../../reducers/types'

export default () => {
  const dispatch = useDispatch()
  const { preferences } = useSelector(state => ({ preferences: state.preferences }), shallowEqual)
  const { environment } = { ...preferences }

  const [value, setValue] = useState(environment)

  useEffect(
    () => {
      if (!equalsIgnoreCase(environment, value)) {
        setValue(environment)
      }
    },
    [environment],
  )

  const onClick = v => {
    setValue(v)
    dispatch({ type: ENVIRONMENT, value: v })
  }

  return (
    <div className="w-fit bg-slate-50 dark:bg-slate-900 rounded-xl flex flex-wrap item-center space-x-1 p-1">
      {ENVIRONMENTS.map((d, i) => {
        const { id, name } = { ...d }
        return (
          <button
            key={i}
            onClick={() => onClick(id)}
            className={`${id === value ? 'bg-white dark:bg-slate-800 text-black dark:text-white font-semibold' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 font-medium'} rounded-lg py-1 px-2`}
          >
            {name}
          </button>
        )
      })}
    </div>
  )
}