import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </section>
  );
}
