import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto max-w-7xl p-8">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">© {new Date().getFullYear()} Neutrino</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="text-sm">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
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
