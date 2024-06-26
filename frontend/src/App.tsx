import './App.css'
import { Outlet } from 'react-router-dom'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

import { Container } from 'react-bootstrap'

function App() {
  return (
    <>
    <ToastContainer/>
    <Header></Header>
    <main className='py-3'>
      <Container>
        <Outlet/>
      </Container>
    </main>
    <Footer/>
    </>
  )
}

export default App
