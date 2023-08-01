const toCase = (string, to_case = 'normal') => {
  if (typeof string === 'string') {
    string = string.trim()
    switch (to_case) {
      case 'upper':
        string = string.toUpperCase()
        break
      case 'lower':
        string = string.toLowerCase()
        break
      default:
        break
    }
  }
  return string
}

export const split = (
  string,
  to_case = 'normal',
  delimiter = ',',
  filter_blank = true,
) =>
  (typeof string !== 'string' && ![undefined, null].includes(string) ?
    [string] :
    (typeof string === 'string' ? string : '').split(delimiter).map(s => toCase(s, to_case))
  )
  .filter(s => !filter_blank || s)

export const toArray = (
  x,
  to_case = 'normal',
  delimiter = ',',
  filter_blank = true,
) =>
  Array.isArray(x) ?
    x.map(v => toCase(v, to_case)).filter(v => !filter_blank || v) :
    split(x, to_case, delimiter, filter_blank)

export const ellipse = (string, length = 10, prefix = '') => !string ? '' : string.length < (length * 2) + 3 ? string : `${string.startsWith(prefix) ? prefix : ''}${string.replace(prefix, '').slice(0, length)}...${string.replace(prefix, '').slice(-length)}`

export const equalsIgnoreCase = (a, b) => (!a && !b) || a?.toLowerCase() === b?.toLowerCase()

export const isJson = s => {
  try {
    JSON.parse(s)
    return true
  } catch (e) {
    return false
  }
}