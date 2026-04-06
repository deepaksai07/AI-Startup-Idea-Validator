import { IdeaForm } from '@/components/IdeaForm';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute top-[5%] left-[15%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[15%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      <IdeaForm />
    </main>
  );
}
