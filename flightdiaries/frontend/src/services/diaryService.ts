import axios from 'axios'
import type { Diary } from '../types'

const baseUrl = '/api/diaries'

const getAll = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data)
}

export default { getAll }
