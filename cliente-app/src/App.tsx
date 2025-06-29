import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CadastrarCliente from './components/CadastrarCliente'
import Sucesso from './components/Sucesso'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CadastrarCliente />} />
        <Route path="/sucesso" element={<Sucesso />} />
      </Routes>
    </Router>
  )
}
