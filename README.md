# CPR Rolltable Dashboard

Standalone Foundry VTT module for the `cyberpunk-red-core` system. It is built as a Game Master console for quickly creating Night City scenes, market texture, street pressure, netrunner downtime, and repeatable rolltable chains.

## Features

- Foundry VTT v12-compatible toolbar dashboard
- GM-focused tab layout for quick generators, bundled rolltables, and custom chains
- Drag-and-drop Scene Builder layout customization with a personal Neural Cache for favorites and most-used generators
- In-dashboard **Latest Roll** result panel so rolls stay clean and visible inside the modal
- Night Market generation with location, clientele, danger, seller, duration, and merchants
- Merchant inventory generation using existing Cyberpunk RED core compendium items
- City encounter generation for daytime and nighttime travel
- Netrunner hustle generation with pay and complications
- Organized bundled RollTables for Economy, Hustles, Locations and Scenes, Factions and Gangs, and Corporate/Loot/Jobs
- Custom chained rolltable workflows for reusable GM procedures

## Requirements

- Foundry VTT v12
- Cyberpunk RED - CORE system (`cyberpunk-red-core`)

## Install

In Foundry VTT, go to **Settings → Add-on Modules → Install Module**.

Paste this manifest URL:

`https://github.com/Jesperhh01/cpr-rolltable-dashboard-module/releases/latest/download/module.json`

Click **Install**, then enable **CPR Rolltable Dashboard** in your world.

## How to Use

Open the dashboard from the token controls toolbar using the table icon.

### Quick Generators

Use this tab when you need something immediately during play:

- **Economy** contains Night Market and Merchant generators.
- **Hustles** contains Netrunner Hustle and Role Hustle chained generators.
- **Street Pressure** contains daytime and nighttime encounter generation.
- **Factions and Gangs**, **Locations and Scenes**, and **Corporate, Loot, and Jobs** generate connected table chains from the bundled Desktop sources.
- Use **Configure Deck** to reorder generator categories/cards, hide categories, and pin cards into **Neural Cache** for quick access.

Every roll appears in the **Latest Roll** panel on the right. Use **Post rolls to public chat** to control whether those results are also posted to the main chat.

### Bundled Rolltables

Use **Import Bundled Tables to World** once as a GM to create organized RollTables under a `CPR Rolltable Dashboard` folder. After import, individual bundled tables can be rolled directly from the dashboard.

The bundled rolltables are organized into GM-facing categories: **Economy**, **Hustles**, **Locations and Scenes**, **Buildings**, **Factions and Gangs**, and **Corporate, Loot, and Jobs**. The updated Desktop rolltable sources are included as generated module data, including role hustles, gang/cult generators, location generators, building generators, corporate/job tables, loot finds, and vendit inventories.

### Custom Chains

Use custom chains to build repeatable procedures, such as “roll location → roll encounter → roll complication.” Add steps, choose RollTables from the world or compendia, save the chain, then run it whenever you need that procedure.

## Notes

- The module is designed to stay system-compatible by generating merchant inventories from the existing CPR compendia instead of duplicating large portions of corebook item data.
- The bundled Dataterm and Desktop rolltable content is imported into world RollTables on demand.
- Future Desktop rolltable updates should update the `.txt` files, regenerate `scripts/desktop-rolltables.js` with `bun scripts/generate-desktop-rolltables.js`, rebuild the versioned dashboard bundle, and publish a new GitHub release with both `module.json` and `cpr-rolltable-dashboard.zip` assets.
