'use client';

import { useContextTarefa } from '../../data/ContextTarefa';

export default function TarefasPage() {
  const { tarefas } = useContextTarefa();

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>{tarefa.todo}</li>
        ))}
      </ul>
    </div>
  );
}
