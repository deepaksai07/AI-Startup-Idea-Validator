import { IdeaForm } from '@/components/IdeaForm';

export const metadata = {
  title: 'Validate Idea — AI Startup Idea Validator',
};

export default function ValidatePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Soft ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/8 blur-[120px] rounded-full pointer-events-none" />
      <IdeaForm />
    </main>
  );
}
