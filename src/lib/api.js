const request = async (url = process.env.NEXT_PUBLIC_AXELARSCAN_API_URL, params) => {
  const response = await fetch(url, { method: 'POST', body: JSON.stringify(params) }).catch(error => { return null })
  return response && await response.json()
}

export const getAxelarscanAPIMethods = async (url = process.env.NEXT_PUBLIC_AXELARSCAN_API_URL, params) => await request(`${url}/getMethods`, params)
export const getValidatorAPIMethods = async (url = process.env.NEXT_PUBLIC_VALIDATOR_API_URL, params) => await request(`${url}/getMethods`, params)
export const getTokenTransferAPIMethods = async (url = process.env.NEXT_PUBLIC_TOKEN_TRANSFER_API_URL, params) => await request(`${url}/getMethods`, params)
export const getGMPAPIMethods = async (url = process.env.NEXT_PUBLIC_GMP_API_URL, params) => await request(`${url}/getMethods`, params)