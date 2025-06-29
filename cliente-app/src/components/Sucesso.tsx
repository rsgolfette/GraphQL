import { useNavigate } from 'react-router-dom'

export default function Sucesso() {
  const navigate = useNavigate()

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Cliente cadastrado com sucesso!</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate('/')}
      >
        Voltar
      </button>
    </div>
  )
}
