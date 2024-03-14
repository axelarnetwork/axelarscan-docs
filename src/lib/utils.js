export const toJson = string => {
  if (!string) return null
  if (typeof string === 'object') return string
  try {
    return JSON.parse(string)
  } catch (error) {
    return null
  }
}

const apiNamesLookup = { 'token-transfer': 'tokenTransfer' }

export const getAPINameFromPathname = pathname => {
  let apiName = pathname?.replace('/', '')
  return apiNamesLookup[apiName] || apiName
}