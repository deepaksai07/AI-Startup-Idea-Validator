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

function getProfitabilityColor(score: number): string {
  if (score >= 70) return 'text-emerald-400';
  if (score >= 40) return 'text-amber-400';
  return 'text-red-400';
}

function Section({ title, icon, children, delay = 0 }: { title: string; icon: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3"
    >
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      {children}
    </motion.div>
  );
}

export function AnalysisView({ analysis }: AnalysisViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Problem */}
      <Section title="Problem" icon="🎯" delay={0.05}>
        <p className="text-slate-200 leading-relaxed">{analysis.problem}</p>
      </Section>

      {/* Customer */}
      <Section title="Target Customer" icon="👥" delay={0.1}>
        <p className="text-slate-200 leading-relaxed">{analysis.customer}</p>
      </Section>

      {/* Market */}
      <Section title="Market Opportunity" icon="📈" delay={0.15}>
        <p className="text-slate-200 leading-relaxed">{analysis.market}</p>
      </Section>

      {/* Risk + Score */}
      <Section title="Risk & Profitability" icon="⚡" delay={0.2}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm">Risk Level:</span>
            <Badge variant={getRiskVariant(analysis.risk_level)}>{analysis.risk_level}</Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm">Profitability:</span>
            <span className={`text-3xl font-extrabold ${getProfitabilityColor(analysis.profitability_score)}`}>
              {analysis.profitability_score}
              <span className="text-base font-normal text-slate-500">/100</span>
            </span>
          </div>
          {/* Score bar */}
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${analysis.profitability_score}%` }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className={`h-2 rounded-full ${
                analysis.profitability_score >= 70
                  ? 'bg-emerald-500'
                  : analysis.profitability_score >= 40
                  ? 'bg-amber-500'
                  : 'bg-red-500'
              }`}
            />
          </div>
        </div>
      </Section>

      {/* Tech Stack */}
      <Section title="Recommended Tech Stack" icon="🛠️" delay={0.25}>
        <div className="flex flex-wrap gap-2">
          {analysis.tech_stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </Section>

      {/* Competitors */}
      <Section title="Key Competitors" icon="🏆" delay={0.3}>
        <div className="space-y-3">
          {analysis.competitor.map((c, i) => (
            <div key={i} className="flex flex-col gap-1 pb-3 border-b border-white/5 last:border-0 last:pb-0">
              <span className="font-semibold text-white text-sm">{c.name}</span>
              <span className="text-slate-400 text-xs leading-relaxed">{c.difference}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Justification — full width */}
      <div className="md:col-span-2">
        <Section title="AI Justification" icon="🤖" delay={0.35}>
          <p className="text-slate-200 leading-relaxed">{analysis.justification}</p>
        </Section>
      </div>
    </div>
  );
}
