import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto max-w-7xl p-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-rose-500">AI Calorie Tracker</h2>
            <span className="text-muted-foreground text-sm">© 2025</span>
          </div>
          <nav className="flex items-center gap-x-8">
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span className="text-muted-foreground text-sm">GitHub</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              <span className="text-muted-foreground text-sm">LinkedIn</span>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
