import { gql, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const GET_CLIENTES = gql`
  query {
    clientes {
      conta
      nome
      saldo
    }
  }
`

export default function Sucesso() {
  const navigate = useNavigate()
  const { loading, error, data } = useQuery(GET_CLIENTES)

  if (loading) return <p data-testid="loading">Carregando clientes...</p>
  if (error) return <p data-testid="error">Erro ao carregar clientes: {error.message}</p>

  return (
    <div className="p-4 max-w-md mx-auto" data-testid="sucesso-page">
      <h1 className="text-2xl font-bold mb-4 text-green-600" data-testid="success-message">
        Cliente cadastrado com sucesso!
      </h1>

      <h2 className="text-xl font-semibold mb-2" data-testid="clientes-list-title">Lista de Clientes:</h2>
      <ul className="mb-4" data-testid="clientes-list">
        {data.clientes.map((cliente: { conta: string; nome: string; saldo: number }) => (
          <li
            key={cliente.conta}
            className="border p-2 mb-2 rounded"
            data-testid={`cliente-item-${cliente.conta}`}
          >
            <p data-testid={`cliente-conta-${cliente.conta}`}>
              <strong>Conta:</strong> {cliente.conta}
            </p>
            <p data-testid={`cliente-nome-${cliente.conta}`}>
              <strong>Nome:</strong> {cliente.nome}
            </p>
            <p data-testid={`cliente-saldo-${cliente.conta}`}>
              <strong>Saldo:</strong> R$ {cliente.saldo.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate('/')}
        data-testid="btn-voltar"
      >
        Voltar
      </button>
    </div>
  )
}
