import { readFileSync, writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";

const svgSource = readFileSync(
  "public/icons/sound-off-filled-svgrepo-com.svg",
  "utf-8"
);

// Change fill to white
const svgWhite = svgSource.replace(/fill="#000000"/g, 'fill="#ffffff"');

for (const size of [16, 48, 128]) {
  const resvg = new Resvg(svgWhite, {
    fitTo: { mode: "width", value: size },
  });
  const png = resvg.render().asPng();
  writeFileSync(`public/icons/icon-${size}.png`, png);
  console.log(`Created public/icons/icon-${size}.png (${size}x${size})`);
}
