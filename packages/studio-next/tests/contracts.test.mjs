
import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const types = fs.readFileSync(new URL("../src/types.ts", import.meta.url), "utf8");
const server = fs.readFileSync(new URL("../src/server.ts", import.meta.url), "utf8");
const manifest = JSON.parse(fs.readFileSync(new URL("../src/theme-manifest.json", import.meta.url), "utf8"));

test("SDK stays independent from NAFS internal application imports", () => {
  for (const source of [types, server]) {
    assert.doesNotMatch(source, /apps\/(web|storefront|site)|services\/erp|storify-reference/);
    assert.doesNotMatch(source, /tenant[_-]?id.*headers?/i);
  }
});

test("theme fallback and versions are stable", () => {
  assert.equal(manifest.fallback, "electronics");
  assert.deepEqual(manifest.themes, { electronics: "2.0.0", essential: "2.0.0", lavishta: "1.0.0" });
});


test("delivery client targets a same-origin BFF by default and has no commerce authority", () => {
  assert.match(server, /\/api\/studio\/v1/);
  assert.match(server, /options\.commerce \?\? emptyCommerce/);
  assert.doesNotMatch(server, /\/api\/products|commerce\/products/);
});


test("SDK can read published site content only through the BFF projection", () => {
  assert.match(server, /getPublishedContent/);
  assert.match(server, /delivery\/sites/);
  assert.doesNotMatch(server, /studio_blog_posts|studio_pages|select .* from/i);
});
