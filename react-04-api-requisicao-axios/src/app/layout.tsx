import { Navbar } from '../components/Navbar';
import { ContextTarefaProvider } from '../data/ContextTarefa';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ContextTarefaProvider>
          <Navbar />
          <main>{children}</main>
        </ContextTarefaProvider>
      </body>
    </html>
  );
}