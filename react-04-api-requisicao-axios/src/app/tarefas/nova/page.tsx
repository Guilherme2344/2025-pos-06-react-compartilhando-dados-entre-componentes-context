'use client';

import { useState } from 'react';
import { useContextTarefa } from '../../../data/ContextTarefa';
import { Tarefa } from '../../../types/tarefa';

export default function NovaTarefaPage() {
  const { adicionarTarefa } = useContextTarefa();
  const [texto, setTexto] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novaTarefa: Tarefa = {
      id: Date.now(),
      todo: texto,
      completed: false,
      userId: 1
    };
    adicionarTarefa(novaTarefa);
    setTexto('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Nova tarefa" />
      <button type="submit">Adicionar</button>
    </form>
  );
}
