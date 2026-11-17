# Full Stack Open — Part 9

Solutions for [Full Stack Open, part 9: TypeScript](https://fullstackopen.com/en/part9).

Parts 0–5 are in [fullstack-open-part00-05](https://github.com/Kopfdreher/fullstack-open-part00-05), which also describes the course.

Earlier parts were written in JavaScript. Types were checked only when the code ran, so a wrong field or a missing value often showed up as a runtime error. This part adds [TypeScript](https://www.typescriptlang.org/) so the compiler checks those shapes before the program starts. Interfaces, enums, union types, and utility types such as `Omit` describe the data. Values that arrive from the command line or from an HTTP body are still `unknown` until they are parsed.

The exercises build that habit in layers. A small calculator checks numbers from the command line. The same checks then sit behind an Express API. Patientor types a React frontend and its patient data. Ilari’s flight diaries go further: diary entries are validated with [Zod](https://zod.dev/), and responses leave out fields that should stay private.

| Directory | What it covers |
| --- | --- |
| `healthapp` | BMI and exercise calculators, then the same logic as an Express API |
| `healthapp-tests` | Playwright tests for `/hello`, `/bmi`, and `/exercises` |
| `patientor/frontend` | Typed React UI for listing and adding patients |
| `patientor/backend` | Patientor API |
| `patientor-tests` | Playwright end-to-end tests for the Patientor UI |
| `patientor-api-tests` | Playwright tests for the Patientor API |
| `flightdiaries/backend` | Flight diary API with Zod parsing and non-sensitive responses |

Each app is started from its own directory with `npm install` and `npm run dev`. The test projects are run with `npm test` from their own directories, with the matching server already running. See an app’s own README where one exists.
