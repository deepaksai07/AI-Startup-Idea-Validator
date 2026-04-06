import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background glowing orbs for depth */}
      <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <GlassCard className="max-w-3xl w-full text-center flex flex-col items-center gap-8 relative z-10">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-sm">
            AI Startup Idea Validator
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Validate your startup ideas using AI. Get instant feedback on market fit, target audience, and potential challenges.
          </p>
        </div>

        <AnimatedButton className="mt-4 text-lg">
          Start Validating
        </AnimatedButton>
      </GlassCard>
    </main>
  );
}
