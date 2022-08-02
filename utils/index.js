export const ellipse = (
  string,
  length = 10,
  prefix = '',
) => !string ? '' : string.length < (length * 2) + 3 ? string : `${string.startsWith(prefix) ? prefix : ''}${string.replace(prefix, '').slice(0, length)}...${string.replace(prefix, '').slice(-length)}`

export const equals_ignore_case = (
  a,
  b,
) => (!a && !b) || a?.toLowerCase() === b?.toLowerCase()

export const is_json = s => {
  try {
    JSON.parse(s)
  } catch (e) {
    return false
  }
  return true
}