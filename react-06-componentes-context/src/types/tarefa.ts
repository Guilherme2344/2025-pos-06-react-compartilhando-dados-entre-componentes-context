export interface Tarefa {
    id: number;
    todo: string; // A descrição da tarefa
    completed: boolean; // Status se a tarefa foi completada
    userId: number; // ID do usuário associado à tarefa
}
  
export type NovaTarefa = Pick<Tarefa, 'todo' | 'completed' | 'userId'>;