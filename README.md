# CPR Rolltable Dashboard

Standalone Foundry VTT module for the `cyberpunk-red-core` system. It is built as a Game Master console for quickly creating Night City scenes, market texture, street pressure, netrunner downtime, and repeatable rolltable chains.

## Features

- Foundry VTT v12-compatible toolbar dashboard
- GM-focused tab layout for quick generators, bundled rolltables, and custom chains
- In-dashboard **Latest Roll** result panel so rolls stay clean and visible inside the modal
- Night Market generation with location, clientele, danger, seller, duration, and merchants
- Merchant inventory generation using existing Cyberpunk RED core compendium items
- City encounter generation for daytime and nighttime travel
- Netrunner hustle generation with pay and complications
- Dataterm table import to organized world RollTables
- Custom chained rolltable workflows for reusable GM procedures
- Reserved Gang Generator and Location Generator groups for upcoming rolltable source files

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

- **Generate Night Market** creates a market setup and two merchant inventories.
- **Generate Merchant** creates a focused vendor inventory by item category.
- **Generate Encounter** creates a daytime or nighttime city complication.
- **Generate Netrunner Hustle** resolves downtime pay and possible follow-up trouble.

Every roll appears in the **Latest Roll** panel on the right and is also posted to chat for a table-visible log.

### Bundled Rolltables

Use **Import Bundled Tables to World** once as a GM to create organized RollTables under a `CPR Rolltable Dashboard` folder. After import, individual bundled tables can be rolled directly from the dashboard.

The Gang Generator and Location Generator sections are already reserved for future updates, but the current source files on the Desktop were empty, so no actual gang/location table rows were imported in this release.

### Custom Chains

Use custom chains to build repeatable procedures, such as “roll location → roll encounter → roll complication.” Add steps, choose RollTables from the world or compendia, save the chain, then run it whenever you need that procedure.

## Notes

- The module is designed to stay system-compatible by generating merchant inventories from the existing CPR compendia instead of duplicating large portions of corebook item data.
- The bundled Dataterm content included here comes from the user-requested public source pages and is imported into world RollTables on demand.
- Future rolltable updates should add real table rows to the grouped data structure in `scripts/dataterm-tables.js` and publish a new GitHub release with both `module.json` and `cpr-rolltable-dashboard.zip` assets.
