import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");
const js = readFileSync(new URL("./animations.js", import.meta.url), "utf8");

assert.match(html, /class="hero-brand"/);
assert.match(html, /<title>Tran Ba Thien Sinh \| Frontend Developer<\/title>/);
assert.match(html, /class="hero-layout"/);
assert.match(html, /class="hero-socials"/);
assert.doesNotMatch(html, /src="anh\.jpg"/);
assert.match(html, /src="assets\/thien-sinh-profile\.jpg" alt="Tran Ba Thien Sinh"/);
assert.match(html, /class="mobile-portrait" aria-hidden="true"/);
assert.match(html, /class="proof-points"/);
assert.match(html, /<div><dt>SaaS<\/dt><dd>Multi-tenant products<\/dd><\/div>/);
assert.match(html, /Enterprise delivery/);
assert.match(html, /Independent work/);
assert.match(html, /5\+ years/);
assert.match(html, /Finan/);
assert.match(html, /Mar 2026 - Present/);
assert.match(html, /Terralogic LLC/);
assert.match(html, /Oct 2021 - Feb 2026/);
assert.match(html, /Dashboard Module/);
assert.match(html, /Feb 2025 - Feb 2026/);
assert.match(html, /Ticket Management/);
assert.match(html, /Oct 2024 - Feb 2025/);
assert.doesNotMatch(html, /airbnb/i);
assert.doesNotMatch(js, /airbnb/i);
assert.equal((html.match(/<a class="project-card"[^>]*target="_blank"/g) || []).length, 5);
assert.doesNotMatch(html, /<article class="project-card"/);
for (const href of [
  "https://snippets-platform.vercel.app/",
  "https://order-food-silk-rho.vercel.app/",
  "https://snapgram-eight-lyart.vercel.app/",
  "https://camp-booking-kjsn.vercel.app/",
  "https://animate-gsap.vercel.app/",
]) {
  assert.match(html, new RegExp(`<a class="project-card"[^>]*href="${href}"[^>]*target="_blank"[^>]*rel="noreferrer"`));
}
assert.match(css, /--accent: #d8f26a/);
assert.match(css, /font-family: "Bebas Neue"/);
assert.match(css, /@media \(max-width: 760px\)/);
assert.match(css, /\.mobile-portrait \{ display: block;/);
assert.match(css, /\.hero-portrait \{ display: none;/);
assert.match(css, /\.mobile-portrait img \{[^}]*object-position: center 85%/);
assert.match(css, /\.proof-points dd \{ display: none;/);
assert.match(css, /\.proof-points div \{ min-height: 92px; padding: 14px; border: 1px solid #292929; background: #141414; \}/);
assert.match(css, /white-space: nowrap/);
assert.match(css, /\.proof-points dt \{[^}]*white-space: nowrap/);
assert.match(css, /\.proof-points dt \{[^}]*font-size: clamp\(20px, 2vw, 30px\)/);
