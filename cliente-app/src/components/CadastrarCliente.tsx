import { useState, type FormEvent } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'


const  ADICIONAR_CLIENTE = gql`

mutation($nome: String!, $saldo: Float!){
    adicionarCliente(nome: $nome, saldo: $saldo){
    conta
    nome
    saldo
    }
}
`


export default function CadastrarCliente(){

   const [nome, setNome] = useState<string>('')
    const navigate = useNavigate()

    const [adicionarCliente, {loading, error}] = useMutation(ADICIONAR_CLIENTE)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!nome.trim()) return
        try{
            await adicionarCliente({variables: {nome, saldo: 1000.0}})
            navigate ('/sucesso')
        } catch(err){
            console.error('Erro ao adicionar cliente: ', err)
        }
    }

 return (
    <div className="p-4 max-w-md mx-auto" data-testid="cadastro-page">
      <h1 className="text-2xl font-bold mb-4" data-testid="Titulo">Cadastrar Cliente</h1>
      <form onSubmit={handleSubmit}>
        <input data-testid="insereNome"
          type="text"
          placeholder="Nome do cliente"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />
        <button
          type="submit" data-testid="botaoInserir"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Cadastrando...' : 'Adicionar Cliente'}
        </button>
        {error && (
          <p className="text-red-500 mt-2">Erro ao adicionar cliente</p>
        )}
      </form>
    </div>
  )
}