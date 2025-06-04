import Link from 'next/link'; // Adicionado para um possível botão de ação

// Definição do Navbar (integrado aqui conforme solicitado)
// Em um projeto maior, este Navbar estaria em seu próprio arquivo, 
// por exemplo: src/components/Navbar.tsx ou src/componentes/Navbar.tsx
export function Navbar() {
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-lg sticky top-0 z-50 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-slate-300 transition-colors">
          Meu App
        </Link>
        <ul className="flex space-x-6">
          <li><Link href="/" className="hover:text-slate-300 transition-colors pb-1 border-b-2 border-transparent hover:border-slate-300">Home</Link></li>
          <li><Link href="/tarefas" className="hover:text-slate-300 transition-colors pb-1 border-b-2 border-transparent hover:border-slate-300">Tarefas</Link></li>
          <li><Link href="/tarefas/nova" className="hover:text-slate-300 transition-colors pb-1 border-b-2 border-transparent hover:border-slate-300">Nova Tarefa</Link></li>
        </ul>
      </div>
    </nav>
  );
}