import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

assert.match(html, /class="hero-brand"/);
assert.match(html, /class="hero-layout"/);
assert.match(html, /class="hero-socials"/);
assert.doesNotMatch(html, /src="anh\.jpg"/);
assert.match(html, /src="assets\/thien-sinh-profile\.jpg" alt="Tran Ba Thien Sinh"/);
assert.match(html, /class="mobile-portrait" aria-hidden="true"/);
assert.match(html, /class="proof-points"/);
assert.match(html, /1,000\+ <span class="metric-suffix">users<\/span>/);
assert.match(html, /Enterprise delivery/);
assert.match(html, /Independent work/);
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
assert.match(css, /\.metric-suffix \{ display: none;/);
