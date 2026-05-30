import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * Lightweight smoke test for the landing page content.
 *
 * We don't need a full DOM render here — the home page is presentational and
 * static. Instead we assert that the key brand vocabulary the rebrand depends
 * on (artist name, label, radio stations, etc.) is present in the source,
 * so accidental deletions or copy regressions show up as a failed test.
 */
describe("Home landing page", () => {
  const homePath = path.resolve(
    process.cwd(),
    "client/src/pages/Home.tsx"
  );
  const source = fs.readFileSync(homePath, "utf8");

  it("references the SoundMaster T wordmark", () => {
    expect(source.toLowerCase()).toContain("soundmaster");
  });

  it("positions SoundMaster T as a 1996 ghetto house pioneer evolved into house/techno", () => {
    expect(source).toMatch(/1996/);
    expect(source.toLowerCase()).toMatch(/ghetto house/);
    expect(source.toLowerCase()).toMatch(/pioneer|originator/);
    expect(source.toLowerCase()).toMatch(/house/);
    expect(source.toLowerCase()).toMatch(/techno/);
  });

  it("preserves the Chicago radio + Atlanta legacy references", () => {
    expect(source).toMatch(/B96/);
    expect(source).toMatch(/WGCI/);
    expect(source).toMatch(/Power 92/);
    expect(source.toLowerCase()).toMatch(/atlanta/);
  });

  it("renders all required sections", () => {
    for (const id of ["sound", "releases", "legacy", "shows", "contact"]) {
      expect(source).toMatch(new RegExp(`id="${id}"`));
    }
  });

  it("includes the volumetric hero atmosphere layers", () => {
    // Back smoke layers behind the lasers
    expect(source).toMatch(/smoke-layer smoke-1/);
    expect(source).toMatch(/smoke-layer smoke-2/);
    expect(source).toMatch(/smoke-layer smoke-3/);
    // Front smoke layers in front of the lasers (true volumetric sandwich)
    expect(source).toMatch(/smoke-front-1/);
    expect(source).toMatch(/smoke-front-2/);
    // Animated red laser beams + bloom
    expect(source).toMatch(/laser laser-left/);
    expect(source).toMatch(/laser laser-right/);
    expect(source).toMatch(/laser-bloom/);
  });
});
