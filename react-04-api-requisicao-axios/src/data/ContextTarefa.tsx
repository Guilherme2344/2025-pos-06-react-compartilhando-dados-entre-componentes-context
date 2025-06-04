'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Tarefa } from '../types/tarefa';

interface ContextTarefaProps {
  tarefas: Tarefa[];
  adicionarTarefa: (tarefa: Tarefa) => void;
}

const ContextTarefa = createContext<ContextTarefaProps | undefined>(undefined);

export const useContextTarefa = () => {
  const context = useContext(ContextTarefa);
  if (!context) throw new Error('useContextTarefa must be used within a Provider');
  return context;
};

export const ContextTarefaProvider = ({ children }: { children: React.ReactNode }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => setTarefas(data.todos));
  }, []);

  const adicionarTarefa = (tarefa: Tarefa) => {
    setTarefas(prev => [...prev, tarefa]);
  };

  return (
    <ContextTarefa.Provider value={{ tarefas, adicionarTarefa }}>
      {children}
    </ContextTarefa.Provider>
  );
};