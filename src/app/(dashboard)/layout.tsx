import Header from "@/components/Header";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="min-h-screen p-8 flex flex-col max-w-7xl mx-auto ">
            <Header />
            {children}
        </section>
    );
}