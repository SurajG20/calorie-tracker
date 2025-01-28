export default function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto max-w-7xl p-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-rose-500">AI Calorie Tracker</h2>
            <span className="text-muted-foreground text-sm">© 2025</span>
          </div>
          <nav className="text-muted-foreground flex gap-6 text-sm">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
