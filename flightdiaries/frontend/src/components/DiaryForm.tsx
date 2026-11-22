import axios from 'axios'
import { useState } from 'react'
import diaryService from '../services/diaryService'
import type { Diary } from '../types'

interface DiaryFormProps {
  diaries: Diary[]
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}

interface DiaryErrorResponse {
  error: string | Array<{ message: string }>
}

const DiaryForm = ({ diaries, setDiaries }: DiaryFormProps) => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const object = {
        date,
        weather,
        visibility,
        comment: comment === '' ? undefined : comment,
      }
      const returnedDiary = await diaryService.create(object)
      setDiaries(diaries.concat(returnedDiary))

      setDate('')
      setWeather('')
      setVisibility('')
      setComment('')
    } catch (e: unknown) {
      if (axios.isAxiosError<DiaryErrorResponse>(e)) {
        const backendError = e.response?.data?.error
        if (typeof backendError === 'string') {
          setError(backendError)
        } else if (Array.isArray(backendError)) {
          setError(backendError.map((issue) => issue.message).join(', '))
        } else {
          setError(error)
        }
      } else if (typeof error === 'string') {
        setError(error)
      } else {
        setError('Unknown error')
      }
    }
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default DiaryForm
