'use client';

import { useState } from 'react';
import { Tarefa } from '../../../types/tarefa';
import { useRouter } from 'next/navigation'; // Para redirecionamento
// A importação do ContextTarefa é crucial.
// Ajuste o caminho se o seu ContextTarefa estiver em local diferente.
import { useContextTarefa } from '../../../data/ContextTarefa';
import {Navbar} from '@/src/componentes/Navbar';
import Link from 'next/link';

export default function NovaTarefaPage() {
  // Utiliza o hook useContextTarefa para acessar as funções e estados do contexto
  const { adicionarTarefa, carregando, erro } = useContextTarefa(); // Adicionado carregando e erro
  const [texto, setTexto] = useState('');
  const [erroLocal, setErroLocal] = useState<string | null>(null); // Para erros de validação do formulário
  const [sucessoMsg, setSucessoMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroLocal(null); // Limpa erros locais anteriores
    setSucessoMsg(null); // Limpa mensagens de sucesso anteriores

    if (!texto.trim()) {
      setErroLocal('Por favor, insira a descrição da tarefa.');
      return;
    }
    await adicionarTarefa(texto); 
    if (!erroLocal && !erro) { // Verifica se não há erro local E se o erro global do contexto não foi setado pela operação
        setTexto(''); // Limpa o campo de texto
        setSucessoMsg('Tarefa adicionada com sucesso! Redirecionando...');
        setTimeout(() => {
            router.push('/tarefas'); // Redireciona para a lista de tarefas
        }, 1500);
    }
    // Se houver um erro no contexto (vindo da API), ele será exibido pela seção de erro global abaixo.
  };

  return (
    <>
      <main className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-10 w-full max-w-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 text-center">
            Adicionar Nova Tarefa
          </h1>

          {/* Mensagem de erro local (validação do formulário) */}
          {erroLocal && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
              <p className="font-bold">Atenção!</p>
              <p>{erroLocal}</p>
            </div>
          )}

          {/* Mensagem de erro global (vindo do contexto, ex: falha na API) */}
          {erro && !erroLocal && ( // Só mostra erro global se não houver erro local (para não duplicar)
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
              <p className="font-bold">Erro ao Adicionar Tarefa!</p>
              <p>{erro}</p>
            </div>
          )}
          
          {/* Mensagem de sucesso */}
          {sucessoMsg && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md" role="alert">
              <p className="font-bold">Sucesso!</p>
              <p>{sucessoMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="task-text" className="block text-sm font-medium text-slate-700 mb-1">
                Descrição da Tarefa:
              </label>
              <input
                id="task-text"
                type="text"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Ex: Comprar leite no supermercado"
                className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors placeholder: text-black"
                disabled={carregando} // Desabilita input durante carregamento
              />
            </div>
            <button
              type="submit"
              disabled={carregando} // Desabilita botão durante carregamento
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-150 ease-in-out"
            >
              {carregando ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adicionando...
                </>
              ) : (
                'Adicionar Tarefa'
              )}
            </button>
          </form>
          <div className="mt-8 text-center">
            <Link 
                href="/tarefas"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
                &larr; Voltar para a Lista de Tarefas
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
