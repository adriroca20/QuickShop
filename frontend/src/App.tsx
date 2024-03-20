import './App.css'
import { Header } from './components/Header.tsx'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group.tsx'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

function App() {
  return (
    <>
      <Header />
      <main className='flex justify-center items-center h-screen gap-5 flex-col bg-zinc-950'>
        <RadioGroup className="flex flex-wrap mb-4">
          <RadioGroup className="flex flex-wrap mb-4">
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <RadioGroupItem value={size} id={size}>
                  {size}
                </RadioGroupItem>
              </div>
            ))}
          </RadioGroup>
        </RadioGroup>
        <h1>Hola mundo</h1>
      </main>
    </>
  )
}

export default App
