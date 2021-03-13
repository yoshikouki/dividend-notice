import axios, { AxiosResponse } from 'axios'

export function requestGet(url = 'https://localhost', params = {}) {
  return axios
    .get(url, { params: params })
    .then((res: AxiosResponse) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
      throw Error('Invalid Request')
    })
}
