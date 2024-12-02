import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4">
        <nav className="container mx-auto px-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Início
              </Link>
            </li>
            <li>
              <Link to="/boas-praticas" className="hover:underline">
                Boas Práticas
              </Link>
            </li>
            <li>
              <Link to="/jogos" className="hover:underline">
                Jogos Educativos
              </Link>
            </li>
            <li>
              <Link to="/videos" className="hover:underline">
                Vídeos
              </Link>
            </li>
            <li>
              <Link to="/qualidade-agua" className="hover:underline">
                Qualidade da Água
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
