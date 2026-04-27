import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import { donnees } from "@/data/biomad";

/**
 * On teste la logique du quiz sans dépendre du rendu JSX,
 * en isolant les fonctions de state dans un hook de test.
 */
function useQuizLogic() {
  const quiz = donnees.quiz;
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const isFinished = idx >= quiz.length;
  const current = !isFinished ? quiz[idx] : null;

  const answer = (i: number) => {
    if (answered) return;
    setAnswered(true);
    setSelected(i);
    if (current && i === current.correct) setScore((s) => s + 1);
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

  return { quiz, idx, score, answered, selected, isFinished, current, answer, next, restart, pct };
}

describe("logique du Quiz", () => {
  it("commence à la première question", () => {
    const { result } = renderHook(() => useQuizLogic());
    expect(result.current.idx).toBe(0);
    expect(result.current.score).toBe(0);
    expect(result.current.isFinished).toBe(false);
  });

  it("incrémente le score sur une bonne réponse", () => {
    const { result } = renderHook(() => useQuizLogic());
    const correctIdx = result.current.current!.correct;

    act(() => { result.current.answer(correctIdx); });

    expect(result.current.score).toBe(1);
    expect(result.current.answered).toBe(true);
    expect(result.current.selected).toBe(correctIdx);
  });

  it("ne change pas le score sur une mauvaise réponse", () => {
    const { result } = renderHook(() => useQuizLogic());
    const wrongIdx = result.current.current!.correct === 0 ? 1 : 0;

    act(() => { result.current.answer(wrongIdx); });

    expect(result.current.score).toBe(0);
    expect(result.current.answered).toBe(true);
  });

  it("ne permet pas de répondre deux fois à la même question", () => {
    const { result } = renderHook(() => useQuizLogic());
    const correctIdx = result.current.current!.correct;
    const wrongIdx = correctIdx === 0 ? 1 : 0;

    act(() => { result.current.answer(correctIdx); });
    act(() => { result.current.answer(wrongIdx); }); // tentative bloquée

    expect(result.current.score).toBe(1);
    expect(result.current.selected).toBe(correctIdx); // inchangé
  });

  it("avance à la question suivante avec next()", () => {
    const { result } = renderHook(() => useQuizLogic());
    act(() => { result.current.answer(0); });
    act(() => { result.current.next(); });

    expect(result.current.idx).toBe(1);
    expect(result.current.answered).toBe(false);
    expect(result.current.selected).toBeNull();
  });

  it("isFinished devient true après toutes les questions", () => {
    const { result } = renderHook(() => useQuizLogic());

    for (let i = 0; i < result.current.quiz.length; i++) {
      act(() => { result.current.answer(0); });
      act(() => { result.current.next(); });
    }

    expect(result.current.isFinished).toBe(true);
  });

  it("restart() réinitialise tout à zéro", () => {
    const { result } = renderHook(() => useQuizLogic());
    const correctIdx = result.current.current!.correct;

    act(() => { result.current.answer(correctIdx); });
    act(() => { result.current.next(); });
    act(() => { result.current.restart(); });

    expect(result.current.idx).toBe(0);
    expect(result.current.score).toBe(0);
    expect(result.current.answered).toBe(false);
    expect(result.current.isFinished).toBe(false);
  });

  it("calcule correctement le pourcentage de réussite", () => {
    const { result } = renderHook(() => useQuizLogic());
    const total = result.current.quiz.length;

    // Répondre correctement à toutes les questions
    for (let i = 0; i < total; i++) {
      const correctIdx = result.current.current!.correct;
      act(() => { result.current.answer(correctIdx); });
      act(() => { result.current.next(); });
    }

    expect(result.current.pct).toBe(100);
  });
});
