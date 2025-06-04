import Link from 'next/link';

export function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/tarefas">Tarefas</Link></li>
        <li><Link href="/tarefas/nova">Nova Tarefa</Link></li>
      </ul>
    </nav>
  );
}
