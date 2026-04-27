import { useState } from "react";
import { motion } from "framer-motion";
import { donnees } from "@/data/biomad";
import { Button } from "@/components/ui/button";
import { Brain, Trophy, ArrowRight, RotateCcw } from "lucide-react";

export function QuizSection() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const quiz = donnees.quiz;
  const isFinished = idx >= quiz.length;
  const current = !isFinished ? quiz[idx] : null;

  const answer = (i: number) => {
    if (answered) return;
    setAnswered(true);
    setSelected(i);
    if (i === current!.correct) setScore((s) => s + 1);
  };

  const next = () => {
    setIdx((i) => i + 1);
    setAnswered(false);
    setSelected(null);
  };

  const restart = () => {
    setIdx(0);
    setScore(0);
    setAnswered(false);
    setSelected(null);
  };

  const pct = Math.round((score / quiz.length) * 100);

  return (
    <section id="quiz" className="py-16 sm:py-20 md:py-28 bg-gradient-nature text-primary-foreground relative overflow-hidden" aria-label="Quiz interactif">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
      <div className="container px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/50 mb-4">
            <Brain className="w-4 h-4" aria-hidden="true" />
            Quiz interactif
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Connais-tu Madagascar ?
          </h2>
          <p className="text-primary-foreground/60 font-light max-w-lg mx-auto">
            Testez vos connaissances sur la biodiversité malgache
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary-foreground/[0.06] border border-primary-foreground/10 rounded-3xl max-w-2xl mx-auto p-6 sm:p-8 md:p-10 backdrop-blur-sm"
          role="region"
          aria-label="Zone du quiz"
        >
          {/* Progress */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 bg-primary-foreground/15 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className="h-full bg-green-accent rounded-full"
                animate={{ width: `${(idx / quiz.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-sm opacity-60 whitespace-nowrap font-medium">
              {isFinished ? "Terminé!" : `${idx + 1} / ${quiz.length}`}
            </span>
          </div>

          {isFinished ? (
            <div className="text-center py-10">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-green-accent" aria-hidden="true" />
              <div className="font-display text-7xl font-bold mb-3">{score}/{quiz.length}</div>
              <p className="text-lg opacity-70 mb-4">
                {score >= 4 ? "🏆 Excellent ! Tu es un expert !" : score >= 3 ? "👍 Pas mal !" : "🌱 Continue à apprendre !"}
              </p>
              <div className="w-full max-w-xs mx-auto bg-primary-foreground/10 rounded-full h-3 mb-8 overflow-hidden">
                <motion.div
                  className="h-full bg-green-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
              <button onClick={restart} className="bg-primary-foreground text-primary px-8 py-3.5 rounded-2xl font-bold hover:-translate-y-0.5 hover:shadow-nature-hover transition-all cursor-pointer inline-flex items-center gap-2">
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                Rejouer
              </button>
            </div>
          ) : current && (
            <>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl mb-3 leading-snug">{current.q}</h3>
              <p className="text-sm opacity-50 mb-8 flex items-center gap-2">💡 {current.hint}</p>

              <div className="space-y-3" role="radiogroup" aria-label="Options de réponse">
                {current.opts.map((opt, i) => {
                  let cls = "bg-primary-foreground/[0.06] border-2 border-primary-foreground/15 hover:bg-primary-foreground/[0.12] hover:border-primary-foreground/30";
                  if (answered) {
                    if (i === current.correct) cls = "bg-green-accent/20 border-2 border-green-accent";
                    else if (i === selected) cls = "bg-destructive/20 border-2 border-destructive/50";
                    else cls = "bg-primary-foreground/[0.03] border-2 border-primary-foreground/5 opacity-50";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => answer(i)}
                      disabled={answered}
                      role="radio"
                      aria-checked={selected === i}
                      className={`w-full text-left px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl text-sm transition-all cursor-pointer disabled:cursor-default ${cls}`}
                    >
                      <span className="font-medium">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-5 rounded-2xl text-sm leading-relaxed ${
                    selected === current.correct
                      ? "bg-green-accent/15 border border-green-accent/30"
                      : "bg-destructive/15 border border-destructive/30"
                  }`}
                >
                  {selected === current.correct ? "✅ " : "❌ "}{current.expl}
                </motion.div>
              )}

              {answered && (
                <div className="flex justify-end mt-6">
                  <Button variant="hero" onClick={next} className="rounded-2xl">
                    Question suivante <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
