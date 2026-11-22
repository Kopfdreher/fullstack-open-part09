import { useState, useEffect } from 'react'
import diaryService from './services/diaryService'
import type { Diary } from './types'


const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries)
    })
  }, [])

  return (
    <div>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>{diary.weather}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
