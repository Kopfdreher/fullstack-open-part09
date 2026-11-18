import express from 'express'
import { calculateBmi } from './bmiCalculator.ts'
import { toNums } from './utils.ts'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  try {
  const [ weight, height ] = toNums([ String(req.query.weight), String(req.query.height) ])
  const bmi = calculateBmi(height, weight)
  res.send({ weight, height, bmi })
  } catch {
    res.status(400).send({ error: 'malformatted parameters' })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
