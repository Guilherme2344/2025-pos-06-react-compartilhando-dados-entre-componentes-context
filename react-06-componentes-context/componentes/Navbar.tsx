'use client'; // Necessário se usar hooks ou event handlers, boa prática para componentes de UI

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          App Tarefas
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/tarefas" className="hover:text-gray-300">
              Tarefas
            </Link>
          </li>
          <li>
            <Link href="/tarefas/nova" className="hover:text-gray-300">
              Nova Tarefa
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;