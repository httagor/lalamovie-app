
const fs = require("fs");
const path = require("path");

const out = path.join(process.cwd(), "www");

fs.rmSync(out, {
  recursive: true,
  force: true
});

fs.mkdirSync(out, {
  recursive: true
});

for (const file of [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "sw.js"
]) {
  fs.copyFileSync(
    path.join(process.cwd(), file),
    path.join(out, file)
  );
}
