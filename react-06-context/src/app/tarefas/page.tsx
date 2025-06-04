"use client";

import React, { useEffect } from 'react'; // Adicionado useEffect
import Link from 'next/link';
// A importação do ContextTarefa e do tipo Tarefa são cruciais.
// Ajuste o caminho se o seu ContextTarefa estiver em local diferente.
import { useContextTarefa } from '../../data/ContextTarefa'; 
import { Tarefa } from '../../types/tarefa';
import {Navbar} from '@/src/componentes/Navbar'

export default function TarefasPage() {
  // Utiliza o hook useTarefas para acessar o estado global das tarefas
  const { tarefas, carregando, erro, alternarStatusTarefa } = useContextTarefa();

  // Renderização condicional baseada no estado de carregamento
  if (carregando) {
    return (
      <>
        <main className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-slate-50 p-4">
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className="mt-4 text-xl text-slate-700">Carregando suas tarefas...</p>
          </div>
        </main>
      </>
    );
  }

  // Renderização condicional em caso de erro
  if (erro) {
    return (
      <>
        <main className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-red-50 p-4 text-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Algo deu errado.</h2>
            <p className="text-slate-700 mb-6">{erro}</p>
            <button
              onClick={() => window.location.reload()} // Simples recarregar para tentar novamente
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </main>
      </>
    );
  }

  // Renderização principal da lista de tarefas
  return (
    <>
      <main className="min-h-[calc(100vh-64px)] bg-slate-50 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-slate-200">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 sm:mb-0">
              Minha Lista de Tarefas
            </h1>
            <Link
              href="/tarefas/nova"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Adicionar Nova Tarefa
            </Link>
          </div>

          {tarefas.length === 0 ? (
            <div className="text-center p-10 bg-white shadow-xl rounded-lg">
              <svg className="mx-auto h-16 w-16 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-2xl font-semibold text-slate-700 mb-3">Nenhuma tarefa encontrada.</h2>
              <p className="text-slate-500 mb-6">Que tal adicionar sua primeira tarefa?</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {tarefas.map((tarefa: Tarefa) => ( // Especificar o tipo Tarefa aqui
                <li
                  key={tarefa.id}
                  className={`p-5 border rounded-lg shadow-sm flex items-center justify-between transition-all duration-300 ease-in-out cursor-pointer hover:shadow-md ${
                    tarefa.completed
                      ? 'bg-green-50 border-green-300 hover:border-green-400'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => alternarStatusTarefa(tarefa.id)}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={tarefa.completed}
                      onChange={(e) => {
                        e.stopPropagation(); // Evita que o clique no checkbox dispare o onClick do <li>
                        alternarStatusTarefa(tarefa.id);
                      }}
                      className="form-checkbox h-5 w-5 sm:h-6 sm:w-6 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer mr-3 sm:mr-4"
                      aria-label={`Marcar tarefa ${tarefa.todo} como ${tarefa.completed ? 'pendente' : 'concluída'}`}
                    />
                    <span className={`text-base sm:text-lg ${tarefa.completed ? 'line-through text-slate-500' : 'text-slate-700'}`}>
                      {tarefa.todo}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full ${
                      tarefa.completed
                        ? 'bg-green-200 text-green-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {tarefa.completed ? 'Concluída' : 'Pendente'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}