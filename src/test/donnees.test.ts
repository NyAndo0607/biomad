import { describe, it, expect } from "vitest";
import { donnees, uicnClass, threatPct, threatColor, fauneSlides } from "@/data/biomad";

describe("donnees.flore", () => {
  it("charge les 8 espèces de flore depuis le JSON", () => {
    expect(donnees.flore).toHaveLength(8);
  });

  it("chaque espèce possède les champs obligatoires", () => {
    donnees.flore.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("nom");
      expect(item).toHaveProperty("sci");
      expect(item).toHaveProperty("uicn");
      expect(item).toHaveProperty("description");
      expect(Array.isArray(item.usages)).toBe(true);
    });
  });

  it("le Baobab est bien EN (En Danger)", () => {
    const baobab = donnees.flore.find((f) => f.nom === "Baobab");
    expect(baobab).toBeDefined();
    expect(baobab?.uicn).toBe("EN");
  });

  it("la Vanille est bien LC (Préoccupation mineure)", () => {
    const vanille = donnees.flore.find((f) => f.nom === "Vanille");
    expect(vanille?.uicn).toBe("LC");
  });
});

describe("donnees.menacees", () => {
  it("charge 4 espèces menacées", () => {
    expect(donnees.menacees).toHaveLength(4);
  });

  it("l'Indri est CR (En Danger Critique)", () => {
    const indri = donnees.menacees.find((m) => m.sci === "Indri indri");
    expect(indri?.uicn).toBe("CR");
  });

  it("la population est un nombre positif", () => {
    donnees.menacees.forEach((m) => {
      expect(m.population).toBeGreaterThan(0);
      expect(m.populationMax).toBeGreaterThanOrEqual(m.population);
    });
  });
});

describe("donnees.parcs", () => {
  it("charge 4 parcs nationaux", () => {
    expect(donnees.parcs).toHaveLength(4);
  });

  it("les coordonnées GPS sont valides", () => {
    donnees.parcs.forEach((p) => {
      expect(p.lat).toBeGreaterThan(-90);
      expect(p.lat).toBeLessThan(90);
      expect(p.lng).toBeGreaterThan(-180);
      expect(p.lng).toBeLessThan(180);
    });
  });

  it("Tsingy de Bemaraha est bien dans la région Menabe", () => {
    const tsingy = donnees.parcs.find((p) => p.nom.includes("Tsingy"));
    expect(tsingy?.region).toBe("Menabe");
  });
});

describe("donnees.quiz", () => {
  it("charge 5 questions de quiz", () => {
    expect(donnees.quiz).toHaveLength(5);
  });

  it("chaque question a exactement 4 options", () => {
    donnees.quiz.forEach((q) => {
      expect(q.opts).toHaveLength(4);
    });
  });

  it("la réponse correcte est un index valide", () => {
    donnees.quiz.forEach((q) => {
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(q.opts.length);
    });
  });
});

describe("donnees.calendrier", () => {
  it("contient les 12 mois", () => {
    const mois = Object.keys(donnees.calendrier);
    expect(mois).toHaveLength(12);
    expect(mois).toContain("Janvier");
    expect(mois).toContain("Décembre");
  });

  it("chaque mois a un conseil non vide", () => {
    Object.values(donnees.calendrier).forEach((conseil) => {
      expect(conseil.length).toBeGreaterThan(0);
    });
  });
});

describe("donnees.articles", () => {
  it("charge 3 articles de blog", () => {
    expect(donnees.articles).toHaveLength(3);
  });

  it("chaque article a un auteur et un temps de lecture", () => {
    donnees.articles.forEach((a) => {
      expect(a.author.length).toBeGreaterThan(0);
      expect(a.readTime).toMatch(/\d+ min/);
    });
  });
});

describe("donnees.galerie", () => {
  it("contient 12 photos", () => {
    expect(donnees.galerie).toHaveLength(12);
  });

  it("chaque photo a une catégorie valide", () => {
    const validCats = new Set(["Flore", "Faune", "Paysage"]);
    donnees.galerie.forEach((g) => {
      expect(validCats.has(g.category)).toBe(true);
    });
  });
});

describe("helpers UICN", () => {
  it("uicnClass couvre tous les statuts", () => {
    ["LC", "NT", "VU", "EN", "CR"].forEach((code) => {
      expect(uicnClass[code]).toBeDefined();
    });
  });

  it("threatPct : CR > EN > VU > NT > LC", () => {
    expect(threatPct.CR).toBeGreaterThan(threatPct.EN);
    expect(threatPct.EN).toBeGreaterThan(threatPct.VU);
    expect(threatPct.VU).toBeGreaterThan(threatPct.NT);
    expect(threatPct.NT).toBeGreaterThan(threatPct.LC);
  });

  it("threatColor est une couleur hex valide pour chaque statut", () => {
    Object.values(threatColor).forEach((color) => {
      expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});

describe("fauneSlides", () => {
  it("contient 4 slides pour le carrousel", () => {
    expect(fauneSlides).toHaveLength(4);
  });

  it("chaque slide a image, alt, tag, title et description", () => {
    fauneSlides.forEach((slide) => {
      expect(slide.image).toBeTruthy();
      expect(slide.alt.length).toBeGreaterThan(0);
      expect(slide.tag.length).toBeGreaterThan(0);
      expect(slide.title.length).toBeGreaterThan(0);
      expect(slide.description.length).toBeGreaterThan(0);
    });
  });
});
