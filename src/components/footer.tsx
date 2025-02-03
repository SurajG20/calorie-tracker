import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-blue-600">Neutrino</span>
            <span className="text-muted-foreground text-sm">© {new Date().getFullYear()}</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-blue-600 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="text-sm">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-blue-600 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              <span className="text-sm">LinkedIn</span>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
