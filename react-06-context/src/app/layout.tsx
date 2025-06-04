import { Navbar } from '../componentes/Navbar';
import { ProvedorContextoTarefa } from '../data/ContextTarefa';
import '../globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen font-sans">
        <ProvedorContextoTarefa>
          <Navbar />
          <main>{children}</main>
        </ProvedorContextoTarefa>
      </body>
    </html>
  );
}