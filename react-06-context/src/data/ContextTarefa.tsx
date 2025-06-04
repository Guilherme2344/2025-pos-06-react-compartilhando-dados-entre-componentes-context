"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Ajuste o caminho se o tipo Tarefa estiver em local diferente
import { Tarefa } from '../types/tarefa'; 

const LOCAL_STORAGE_KEY = 'appMinhasTarefas';

export interface ContextoTarefaTipo {
  tarefas: Tarefa[];
  carregando: boolean;
  erro: string | null;
  adicionarTarefa: (descricao: string) => Promise<void>;
  alternarStatusTarefa: (id: number) => Promise<void>;
}

const ContextoTarefa = createContext<ContextoTarefaTipo | undefined>(undefined);

export const ProvedorContextoTarefa: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  const fetchTarefasIniciaisDaAPI = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const response = await fetch('https://dummyjson.com/todos?limit=10');
      if (!response.ok) {
        throw new Error(`Erro ao buscar tarefas da API: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (data && Array.isArray(data.todos)) {
        setTarefas(data.todos);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.todos));
      } else {
        throw new Error("Formato de dados inesperado da API.");
      }
    } catch (e: any) {
      console.error("Falha ao buscar tarefas iniciais da API:", e);
      setErro(e.message || "Não foi possível carregar as tarefas iniciais da API.");
      setTarefas([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    setCarregando(true);
    let dadosCarregados = false;
    try {
      const dadosSalvosString = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (dadosSalvosString) {
        const tarefasSalvas = JSON.parse(dadosSalvosString);
        if (Array.isArray(tarefasSalvas)) {
          setTarefas(tarefasSalvas);
          dadosCarregados = true;
        } else {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Erro ao ler tarefas do localStorage:", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    if (!dadosCarregados) {
      fetchTarefasIniciaisDaAPI();
    } else {
      setCarregando(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!carregando) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tarefas));
      } catch (error) {
        console.error("Erro ao salvar tarefas no localStorage:", error);
        setErro("Não foi possível salvar suas tarefas localmente.");
      }
    }
  }, [tarefas, carregando]);

  const adicionarTarefa = async (descricao: string) => {
    setCarregando(true);
    setErro(null);
    try {
      const novaTarefaPayload = {
        todo: descricao,
        completed: false,
        userId: Math.floor(Math.random() * 100) + 1,
      };

      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaTarefaPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Resposta de erro não JSON" }));
        throw new Error(`API Error ao adicionar: ${response.status}. ${errorData.message || response.statusText}`);
      }
      
      const tarefaAdicionadaDaApi = await response.json();
      
      const idFinal = (typeof tarefaAdicionadaDaApi.id === 'number' && tarefaAdicionadaDaApi.id > 0)
                      ? tarefaAdicionadaDaApi.id
                      : Date.now();

      const tarefaComIdUnico: Tarefa = {
        ...tarefaAdicionadaDaApi,
        id: tarefas.some(t => t.id === idFinal) ? Date.now() + Math.random() : idFinal, // Garante ID ainda mais único
        todo: descricao,
        completed: false,
      };
      
      setTarefas(estadoAnterior => [...estadoAnterior, tarefaComIdUnico]);
    } catch (e: any) {
      console.error("Falha ao adicionar tarefa:", e);
      setErro(e.message || "Não foi possível adicionar a tarefa.");
    } finally {
      setCarregando(false);
    }
  };

  const alternarStatusTarefa = async (id: number) => {
    const tarefaAlvoIndex = tarefas.findIndex(t => t.id === id);
    if (tarefaAlvoIndex === -1) {
      console.warn(`Tarefa com ID ${id} não encontrada para alternar status.`);
      setErro(`Tarefa com ID ${id} não encontrada.`);
      return;
    }

    // Otimisticamente atualiza o estado local primeiro
    const novoStatus = !tarefas[tarefaAlvoIndex].completed;
    const tarefasAtualizadas = tarefas.map(t =>
      t.id === id ? { ...t, completed: novoStatus } : t
    );
    setTarefas(tarefasAtualizadas); // Atualiza a UI imediatamente

    // Limpa erro anterior antes de tentar a chamada API
    setErro(null); 
    // Não seta carregando para true aqui para que a UI não pisque,
    // a atualização local já foi feita. Poderia setar se a chamada API fosse demorada.

    try {
      // Tenta atualizar na API (simulação)
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: novoStatus,
        }),
      });

      if (!response.ok) {
        // Se a API falhar (ex: 404 para IDs não persistentes),
        // nós já atualizamos o estado local otimisticamente.
        // Podemos registrar um aviso, mas não necessariamente reverter ou mostrar um erro crítico ao usuário,
        // pois a dummyjson é para simulação e o localStorage está persistindo o estado desejado.
        const errorData = await response.json().catch(() => ({ message: "Resposta de erro não JSON" }));
        console.warn(`API Warn ao atualizar status (ID: ${id}): ${response.status}. ${errorData.message || response.statusText}. O estado local foi atualizado.`);
        // Não vamos definir o 'erro' global aqui para este caso específico de 404 da dummyjson,
        // pois a atualização local é o comportamento desejado.
        // setErro(`API Warn: ${response.status}. ${errorData.message}`); // Opcional: mostrar um erro não bloqueante
      } else {
        // Se a API responder OK, podemos opcionalmente usar os dados dela,
        // mas para dummyjson, a atualização otimista já reflete o que queremos.
        // const tarefaAtualizadaDaApi = await response.json();
        // console.log("Tarefa atualizada na API (simulado):", tarefaAtualizadaDaApi);
      }
    } catch (e: any) {
      // Para erros de rede ou outros erros inesperados da API
      console.error("Falha de rede ou erro crítico ao alternar status da tarefa:", e);
      setErro(e.message || "Não foi possível sincronizar a atualização do status da tarefa.");
      // Neste caso, poderíamos considerar reverter a mudança otimista se a falha for crítica
      // e não um 404 esperado da dummyjson para IDs não persistentes.
      // Ex: setTarefas(tarefas); // Reverteria para o estado anterior às tarefasAtualizadas
      // Mas para este exercício, manteremos a atualização local.
    } finally {
      // setCarregando(false); // Só se setou carregando = true no início desta função
    }
  };

  return (
    <ContextoTarefa.Provider value={{ tarefas, carregando, erro, adicionarTarefa, alternarStatusTarefa }}>
      {children}
    </ContextoTarefa.Provider>
  );
};

export const useContextTarefa = (): ContextoTarefaTipo => {
  const contexto = useContext(ContextoTarefa);
  if (contexto === undefined) {
    throw new Error('useTarefas deve ser utilizado dentro de um ProvedorContextoTarefa');
  }
  return contexto;
};