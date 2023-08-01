const request = async params => {
  const response = await fetch('https://api.axelarscan.io', { method: 'POST', body: JSON.stringify(params) }).catch(error => { return null })
  return response && await response.json()
}

export const getRoutes = async params => await request({ ...params, method: 'getRoutes' })