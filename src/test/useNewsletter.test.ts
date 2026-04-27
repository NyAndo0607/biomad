import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useNewsletter } from "@/hooks/useNewsletter";

// ── Mock import.meta.env ─────────────────────────────────────────────────────
vi.stubEnv("VITE_RESEND_API_KEY", "");
vi.stubEnv("VITE_NEWSLETTER_TO", "test@biomad.mg");

describe("useNewsletter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("démarre avec l'état initial correct", () => {
    const { result } = renderHook(() => useNewsletter());
    expect(result.current.email).toBe("");
    expect(result.current.status).toBe("idle");
    expect(result.current.errorMessage).toBeNull();
  });

  it("met à jour l'email quand setEmail est appelé", () => {
    const { result } = renderHook(() => useNewsletter());
    act(() => {
      result.current.setEmail("test@example.com");
    });
    expect(result.current.email).toBe("test@example.com");
  });

  it("passe en mode 'loading' pendant la soumission (mode démo)", async () => {
    const { result } = renderHook(() => useNewsletter());

    act(() => { result.current.setEmail("test@example.com"); });

    const submitPromise = act(async () => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    // Pendant le délai simulé, le statut doit être "loading"
    expect(result.current.status).toBe("loading");

    await act(async () => { vi.advanceTimersByTime(1000); });
    await submitPromise;
  });

  it("passe en 'success' en mode démo (sans clé API)", async () => {
    const { result } = renderHook(() => useNewsletter());
    act(() => { result.current.setEmail("test@example.com"); });

    await act(async () => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.status).toBe("success");
    expect(result.current.email).toBe(""); // email réinitialisé
  });

  it("repasse en 'idle' après le délai de succès", async () => {
    const { result } = renderHook(() => useNewsletter());
    act(() => { result.current.setEmail("test@example.com"); });

    await act(async () => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.status).toBe("success");

    await act(async () => { vi.advanceTimersByTime(5000); });
    expect(result.current.status).toBe("idle");
  });

  it("passe en 'error' si l'API Resend renvoie une erreur", async () => {
    vi.stubEnv("VITE_RESEND_API_KEY", "re_fake_key");

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Invalid API key" }),
    }) as unknown as typeof fetch;

    const { result } = renderHook(() => useNewsletter());
    act(() => { result.current.setEmail("test@example.com"); });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.status).toBe("error");
    expect(result.current.errorMessage).toBe("Invalid API key");
  });

  it("appelle fetch avec les bons paramètres quand une clé est définie", async () => {
    vi.stubEnv("VITE_RESEND_API_KEY", "re_real_key");
    vi.stubEnv("VITE_NEWSLETTER_TO", "admin@biomad.mg");

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "abc123" }),
    }) as unknown as typeof fetch;
    global.fetch = mockFetch;

    const { result } = renderHook(() => useNewsletter());
    act(() => { result.current.setEmail("user@example.com"); });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer re_real_key" }),
      })
    );
    expect(result.current.status).toBe("success");
  });
});
