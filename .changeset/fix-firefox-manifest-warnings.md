---
"@mute-tab/firefox": patch
---

Fix Firefox manifest warnings: remove unsupported `service_worker` key (use `scripts` only), bump `strict_min_version` to 140.0 to match when `data_collection_permissions` was introduced on desktop Firefox.
