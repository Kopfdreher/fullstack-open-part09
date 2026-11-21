import type { CoursePart } from '../types'

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    )
  }

  courseParts.forEach((part) => {
    switch (part.kind) {
      case 'basic':
        console.log(part.name, part.description, part.exerciseCount)
        break
      case 'group':
        console.log(part.name, part.exerciseCount, part.groupProjectCount)
        break
      case 'background':
        console.log(part.name, part.exerciseCount, part.backgroundMaterial)
        break
      case 'special':
        console.log(part.name, part.exerciseCount, part.requirements[0])
        break
      default:
        return assertNever(part)
    }
  })

  const print = (part: CoursePart) => {
    switch (part.kind) {
      case 'basic':
        return <>{part.description}</>
      case 'group':
        return <>project exercises {part.groupProjectCount}</>
      case 'background':
        return (
          <>
            {part.description}<br/>
            project exercises {part.backgroundMaterial}
          </>
        )
      case 'special':
        return (
          <>
            {part.description}<br/>
            required skills: {part.requirements.join(',')}
          </>
        )
      default:
        return assertNever(part)
    }
  }

  return (
    <div>
      {courseParts.map((part) => (
        <div key={part.name}>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
            <br/>
          {print(part)}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Content
