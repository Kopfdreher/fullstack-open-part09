import { useState, useEffect } from 'react'
import diaryService from './services/diaryService'
import type { Diary } from './types'
import DiaryForm from './components/DiaryForm'


const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries)
    })
  }, [])

  return (
    <div>
      <DiaryForm diaries={diaries} setDiaries={setDiaries} />
      <h2>Diary entries</h2>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <strong>{diary.date}:</strong>
            {diary.weather}, {diary.visibility}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
