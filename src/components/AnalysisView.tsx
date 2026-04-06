'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

interface Competitor {
  name: string;
  difference: string;
}

interface Analysis {
  problem: string;
  customer: string;
  market: string;
  competitor: Competitor[];
  tech_stack: string[];
  risk_level: string;
  profitability_score: number;
  justification: string;
}

interface AnalysisViewProps {
  analysis: Analysis;
}

function getRiskVariant(risk: string): 'success' | 'warning' | 'danger' {
  const lower = risk.toLowerCase();
  if (lower.includes('low')) return 'success';
  if (lower.includes('medium') || lower.includes('moderate')) return 'warning';
  return 'danger';
}

function getProfitabilityColor(score: number) {
  if (score >= 70) return { text: 'text-emerald-400', bar: 'bg-emerald-500', glow: 'rgba(52,211,153,0.3)' };
  if (score >= 40) return { text: 'text-amber-400', bar: 'bg-amber-500', glow: 'rgba(251,191,36,0.3)' };
  return { text: 'text-red-400', bar: 'bg-red-500', glow: 'rgba(248,113,113,0.3)' };
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' as const }
  }),
};

function Section({ title, icon, children, index }: { title: string; icon: string; children: React.ReactNode; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-5 space-y-3 hover:bg-white/[0.06] hover:border-white/[0.1] transition-colors duration-300"
      style={{ boxShadow: "0 4px 16px -4px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)" }}
    >
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
        <span className="text-base">{icon}</span>
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

export function AnalysisView({ analysis }: AnalysisViewProps) {
  const profColor = getProfitabilityColor(analysis.profitability_score);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Problem */}
      <Section title="Problem" icon="🎯" index={0}>
        <p className="text-slate-200 text-sm leading-relaxed">{analysis.problem}</p>
      </Section>

      {/* Customer */}
      <Section title="Target Customer" icon="👥" index={1}>
        <p className="text-slate-200 text-sm leading-relaxed">{analysis.customer}</p>
      </Section>

      {/* Market */}
      <Section title="Market Opportunity" icon="📈" index={2}>
        <p className="text-slate-200 text-sm leading-relaxed">{analysis.market}</p>
      </Section>

      {/* Risk + Profitability */}
      <Section title="Risk & Profitability" icon="⚡" index={3}>
        <div className="space-y-4">
          {/* Risk badge row */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 w-20 shrink-0">Risk Level</span>
            <Badge variant={getRiskVariant(analysis.risk_level)}>{analysis.risk_level}</Badge>
          </div>

          {/* Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Profitability Score</span>
              <span
                className={`text-2xl font-extrabold ${profColor.text}`}
                style={{ textShadow: `0 0 20px ${profColor.glow}` }}
              >
                {analysis.profitability_score}
                <span className="text-xs font-normal text-slate-600">/100</span>
              </span>
            </div>
            <div className="relative w-full bg-white/[0.06] rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${analysis.profitability_score}%` }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className={`h-2 rounded-full ${profColor.bar}`}
                style={{ boxShadow: `0 0 8px ${profColor.glow}` }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Tech Stack */}
      <Section title="Recommended Tech Stack" icon="🛠️" index={4}>
        <div className="flex flex-wrap gap-2">
          {analysis.tech_stack.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.04 }}
            >
              <Badge>{tech}</Badge>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Competitors */}
      <Section title="Key Competitors" icon="🏆" index={5}>
        <div className="space-y-3">
          {analysis.competitor.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="flex flex-col gap-1 pb-3 border-b border-white/[0.05] last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400/60 shrink-0" />
                <span className="font-semibold text-white text-sm">{c.name}</span>
              </div>
              <span className="text-slate-400 text-xs leading-relaxed pl-3.5">{c.difference}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Justification — full width */}
      <motion.div
        className="md:col-span-2"
        custom={6}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-900/20 to-indigo-900/10 p-5 space-y-3 hover:border-violet-500/25 transition-colors duration-300"
          style={{ boxShadow: "0 0 40px -10px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.04)" }}
        >
          <h3 className="text-xs font-semibold text-violet-400/80 uppercase tracking-widest flex items-center gap-2">
            <span className="text-base">🤖</span> AI Justification
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">{analysis.justification}</p>
        </div>
      </motion.div>
    </div>
  );
}
