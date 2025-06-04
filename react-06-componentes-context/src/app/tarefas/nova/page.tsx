// src/data/ContextTarefa.tsx
'use client'; // Obrigatório para uso de Context e Hooks

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Tarefa, NovaTarefa } from '../../../types/tarefa';

// Interface para o valor do contexto
interface TarefaContextType {
  tarefas: Tarefa[];
  carregando: boolean;
  erro: string | null;
  adicionarTarefa: (novaTarefa: NovaTarefa) => Promise<void>; // Modificado para ser async
}

// Cria o contexto com um valor padrão undefined (ou um mock inicial se preferir)
// O valor padrão será sobrescrito pelo Provider, mas é bom para autocompletar e tipagem
const TarefaContext = createContext<TarefaContextType | undefined>(undefined);

// Props para o Provider
interface TarefaProviderProps {
  children: ReactNode;
}

export const TarefaProvider = ({ children }: TarefaProviderProps) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  // Carregar tarefas iniciais da API
  useEffect(() => {
    const fetchTarefas = async () => {
      setCarregando(true);
      setErro(null);
      try {
        const response = await fetch('https://dummyjson.com/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // dummyjson retorna um objeto com uma chave "todos" que é o array
        setTarefas(data.todos || []);
      } catch (error: any) {
        console.error("Falha ao buscar tarefas:", error);
        setErro(error.message || "Ocorreu um erro ao buscar as tarefas.");
      } finally {
        setCarregando(false);
      }
    };

    fetchTarefas();
  }, []); // Array de dependências vazio para rodar apenas na montagem

  // Função para adicionar uma nova tarefa
  // Para este exemplo, adicionaremos localmente.
  // Numa aplicação real, você faria uma requisição POST para sua API.
  // dummyjson.com tem um endpoint /todos/add para isso.
  const adicionarTarefa = async (novaTarefaData: NovaTarefa) => {
    // Simula a adição de uma tarefa.
    // Numa API real, o ID seria retornado pela API.
    // Para dummyjson, o POST /todos/add retorna a tarefa com um novo ID.
    // Aqui, vamos gerar um ID localmente para fins de demonstração se não formos chamar a API.
    
    setCarregando(true);
    try {
      // Exemplo de como seria com a API dummyjson (opcional para o exercício, pode simplificar)
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaTarefaData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const tarefaAdicionada: Tarefa = await response.json();
      
      // Adiciona a tarefa retornada pela API (que já vem com ID)
      setTarefas((prevTarefas) => [tarefaAdicionada, ...prevTarefas]); // Adiciona no início da lista

    } catch (error: any) {
      console.error("Falha ao adicionar tarefa:", error);
      setErro(error.message || "Ocorreu um erro ao adicionar a tarefa.");
      // Se a API falhar, pode-se optar por não adicionar localmente ou tratar o erro
    } finally {
      setCarregando(false);
    }

    // Alternativa: Adição puramente local (se não for usar API para POST)
    // const tarefaComId: Tarefa = {
    //   ...novaTarefaData,
    //   id: Date.now(), // ID simples e temporário
    // };
    // setTarefas((prevTarefas) => [tarefaComId, ...prevTarefas]);
  };

  return (
    <TarefaContext.Provider value={{ tarefas, carregando, erro, adicionarTarefa }}>
      {children}
    </TarefaContext.Provider>
  );
};

// Hook customizado para consumir o contexto de tarefas
export const useTarefas = (): TarefaContextType => {
  const context = useContext(TarefaContext);
  if (context === undefined) {
    throw new Error('useTarefas deve ser usado dentro de um TarefaProvider');
  }
  return context;
};