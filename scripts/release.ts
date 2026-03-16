import { $ } from "bun";
import pkg from "../package.json";

const version = pkg.version;
const tag = `v${version}`;

await $`bun run build`;
await $`cd dist && zip -r ../chrome-mute-tab.zip . && cd ..`;
await $`gh release create ${tag} chrome-mute-tab.zip --title ${tag} --generate-notes`;
