import {Navbar} from '../componentes/Navbar'; // Verifique se este caminho está correto para sua estrutura
import Link from 'next/link'; // Adicionado para um possível botão de ação

export default function HomePage() {
  return (
    <>
      {/* O Navbar normalmente seria incluído no RootLayout (src/app/layout.tsx) 
        para aparecer em todas as páginas. Se você o tem aqui intencionalmente 
        para esta página específica, pode manter. Caso contrário, considere movê-lo 
        para o layout.
      */}
      {/* <Navbar /> */} {/* Comentado pois geralmente está no layout */}

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-sky-100 p-4 text-center">
        <div className="bg-white shadow-2xl rounded-xl p-8 sm:p-12 md:p-16 max-w-2xl w-full transform transition-all hover:scale-105 duration-300">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-6">
            Bem-vindo à Home!
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Este é o início da sua incrível aplicação. Explore as funcionalidades e organize suas tarefas de forma eficiente.
          </p>
          <div className="mt-10">
            <Link
              href="/tarefas" // Supondo que você tenha uma página de tarefas
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Ver Minhas Tarefas
            </Link>
          </div>
        </div>
        <p className="mt-12 text-sm text-slate-500">
          Desenvolvido com Next.js e Tailwind CSS.
        </p>
      </div>
    </>
  );
}