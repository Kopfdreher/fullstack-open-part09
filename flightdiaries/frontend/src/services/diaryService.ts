import axios from 'axios'
import type { Diary, NewDiary } from '../types'

const baseUrl = '/api/diaries'

const getAll = async () => {
  const response = await axios.get<Diary[]>(baseUrl)
  return response.data
}

const create = async (object: NewDiary) => {
  const response = await axios.post<Diary>(baseUrl, object)
  return response.data
}

export default { getAll, create }
