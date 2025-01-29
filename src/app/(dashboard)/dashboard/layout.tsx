export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full">
      {children}
    </div>
  )
}