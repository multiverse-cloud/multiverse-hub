import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const warnings = [];

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function addFailure(message) {
  failures.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function assertUnique(items, key, label) {
  const seen = new Map();

  for (const item of items) {
    const value = item?.[key];
    if (!value) {
      addFailure(`${label}: missing ${key}`);
      continue;
    }

    if (seen.has(value)) {
      addFailure(`${label}: duplicate ${key} "${value}"`);
    }

    seen.set(value, item);
  }
}

function validateSlug(value, label) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    addFailure(`${label}: invalid slug "${value}"`);
  }
}

function validateJsonCollection(relativePath, collectionKey, label, slugKey = "slug") {
  const data = readJson(relativePath);
  const items = data[collectionKey];

  if (!Array.isArray(items)) {
    addFailure(`${label}: expected ${collectionKey} array in ${relativePath}`);
    return [];
  }

  assertUnique(items, "id", label);
  assertUnique(items, slugKey, label);

  for (const item of items) {
    if (item?.[slugKey]) validateSlug(item[slugKey], `${label} ${item.id || item[slugKey]}`);
    if (item?.published === false) continue;
    if (!item?.title && !item?.name) addWarning(`${label}: "${item?.id || item?.[slugKey]}" has no title/name`);
  }

  return items;
}

function validateTools() {
  const source = readText("lib/tools-data.ts");
  const blocks =
    source.match(
      /\{\s*id:\s*'[^']+'[\s\S]*?categorySlug:\s*'[^']+'[\s\S]*?slug:\s*'[^']+'[\s\S]*?implemented:\s*(?:true|false)[\s\S]*?\n\s*\}/g,
    ) || [];
  const tools = blocks.map((block) => {
    const id = block.match(/id:\s*'([^']+)'/)?.[1];
    const slug = block.match(/slug:\s*'([^']+)'/)?.[1];
    const categorySlug = block.match(/categorySlug:\s*'([^']+)'/)?.[1];
    const name = block.match(/name:\s*'([^']+)'/)?.[1];
    return { id, slug, categorySlug, name };
  });

  if (tools.length < 100) {
    addFailure(`Tools: expected at least 100 tool definitions, found ${tools.length}`);
  }

  assertUnique(tools, "id", "Tools");
  assertUnique(tools, "slug", "Tools");

  for (const tool of tools) {
    if (tool.slug) validateSlug(tool.slug, `Tool ${tool.id || tool.slug}`);
    if (!tool.categorySlug) addFailure(`Tool ${tool.id || tool.slug}: missing categorySlug`);
    if (!tool.name) addWarning(`Tool ${tool.id || tool.slug}: missing name`);
  }
}

function validateUiStore() {
  const data = readJson("data/ui-imported-store.json");
  const items = data.items;

  if (!Array.isArray(items)) {
    addFailure("UI store: expected items array");
    return;
  }

  assertUnique(items, "id", "UI store");

  const previewKeys = items.map((item) => ({
    id: item.id,
    previewClass: item.previewClass || item.id,
  }));
  assertUnique(previewKeys, "previewClass", "UI preview keys");

  for (const item of items) {
    if (!item.title) addFailure(`UI store: ${item.id} missing title`);
    if (!item.htmlCode && !item.previewDocument) {
      addFailure(`UI store: ${item.id} missing preview/source HTML`);
    }
  }
}

function main() {
  validateTools();
  validateJsonCollection("data/prompt-local-store.json", "prompts", "Prompts");
  validateJsonCollection("data/template-local-store.json", "templates", "Templates");
  validateJsonCollection("data/discover-local-store.json", "lists", "Discover");
  validateUiStore();

  for (const warning of warnings) {
    console.warn(`warn: ${warning}`);
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error(`error: ${failure}`);
    }
    process.exit(1);
  }

  console.log("Content validation passed");
}

main();
