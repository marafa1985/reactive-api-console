import { ApiPanels, Chat, Header, Sidebar } from "@/components";

export const HomePage = () => {
  return (
    <main className="flex h-screen bg-gray-50">
      <Sidebar />
      <article className="bg-header pt-3.5 flex-1 flex flex-col">
        <Header />
        <section className="flex-1 flex overflow-hidden">
          <div className="w-1/3 border-r border-gray-200 overflow-hidden">
            <Chat />
          </div>
          <div className="flex-1">
            <ApiPanels />
          </div>
        </section>
      </article>
    </main>
  );
};
