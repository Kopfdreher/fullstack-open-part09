import { createRoot } from 'react-dom/client'
//import App from './App.tsx'

const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {props.name}</h1>;
};

createRoot(document.getElementById('root')!).render(
  <Welcome name="Sarah" />
)
