/* eslint-disable max-len, no-await-in-loop */

import {
  DATATERM_TABLES,
  FUTURE_TABLE_GROUPS,
  NETRUNNER_HUSTLES,
  FOOD_GEAR_NAMES,
  CYBER_GEAR_MATCHERS,
} from "./dataterm-tables.js";

export const MODULE_ID = "cpr-rolltable-dashboard";
const CHAIN_SETTING = "rolltableDashboardChains";
const POST_TO_CHAT_SETTING = "postRollsToChat";
const ROOT_FOLDER_NAME = "CPR Rolltable Dashboard";
const REQUIRED_SYSTEM_ID = "cyberpunk-red-core";
const RESULT_HISTORY_LIMIT = 50;

const MERCHANT_ACTOR_NAMES = {
  foodAndDrugs: ["Food and Drugs"],
  personalElectronics: ["Electronics Merchant"],
  weaponsAndArmor: ["Weapon Merchant", "Weapons Merchant"],
  cyberware: ["Cyberware Merchant"],
  clothingAndFashionware: ["Clothing Merchant", "Fashionware Merchant", "Cyberware Merchant"],
  survivalGear: ["Survival Gear Merchant"],
};

const MERCHANT_INVENTORY_ITEM_TYPES = new Set([
  "ammo",
  "armor",
  "clothing",
  "cyberdeck",
  "cyberware",
  "drug",
  "gear",
  "itemUpgrade",
  "netarch",
  "program",
  "vehicle",
  "weapon",
]);

const CATEGORY_CHOICES = {
  random: `${MODULE_ID}.category.random`,
  foodAndDrugs: `${MODULE_ID}.category.foodAndDrugs`,
  personalElectronics: `${MODULE_ID}.category.personalElectronics`,
  weaponsAndArmor: `${MODULE_ID}.category.weaponsAndArmor`,
  cyberware: `${MODULE_ID}.category.cyberware`,
  clothingAndFashionware: `${MODULE_ID}.category.clothingAndFashionware`,
  survivalGear: `${MODULE_ID}.category.survivalGear`,
};

const RANK_CHOICES = {
  rank1to4: `${MODULE_ID}.rank.1to4`,
  rank5to7: `${MODULE_ID}.rank.5to7`,
  rank8to10: `${MODULE_ID}.rank.8to10`,
};

const PERIOD_CHOICES = {
  day: `${MODULE_ID}.period.day`,
  night: `${MODULE_ID}.period.night`,
};

const REPEAT_CHOICES = {
  once: `${MODULE_ID}.repeat.once`,
  fixed: `${MODULE_ID}.repeat.fixed`,
  previousNumeric: `${MODULE_ID}.repeat.previousNumeric`,
};

const NETRUNNER_HUSTLE_CHOICE = "datatermNetrunnerHustle";

const VENDIT_CATEGORIES = [
  { range: [1, 4], label: "Food", tableNamePart: "Food" },
  { range: [5, 8], label: "Personal", tableNamePart: "Personal" },
  { range: [9, 10], label: "Weird stuff", tableNamePart: "Weird" },
];

function localize(key) {
  return game.i18n.localize(key);
}

function format(key, data) {
  return game.i18n.format(key, data);
}

function deepClone(data) {
  return foundry.utils.deepClone(data);
}

function shuffleArray(items) {
  const shuffled = Array.from(items);
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function notify(type, key) {
  const message = localize(key);
  ui.notifications[type](message);
}

function getImportedTableKeys(groupLabel) {
  return FUTURE_TABLE_GROUPS.find((group) => group.label === groupLabel)?.tableKeys ?? [];
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getDatatermGroups() {
  return [
    {
      label: localize(`${MODULE_ID}.group.economy`),
      description: localize(`${MODULE_ID}.group.economyHelp`),
      tableKeys: [
        "nightMarkets",
        "nightMarketClientele",
        "nightMarketDanger",
        "nightMarketSeller",
        "nightMarketDuration",
      ],
    },
    {
      label: localize(`${MODULE_ID}.group.hustles`),
      description: localize(`${MODULE_ID}.group.hustlesHelp`),
      tableKeys: [
        "netrunnerHustleChart",
        "netrunnerWhatWentWrong",
        "netrunnerTroubleNow",
        "netrunnerOpportunity",
        ...getImportedTableKeys("Role Hustles"),
      ],
    },
    {
      label: localize(`${MODULE_ID}.group.locations`),
      description: localize(`${MODULE_ID}.group.locationsHelp`),
      tableKeys: [
        "cityDayType",
        "cityNightType",
        "cityNonViolent",
        "cityViolent",
        "cityEnvironmental",
        ...getImportedTableKeys("Locations and Scenes"),
      ],
    },
    {
      label: localize(`${MODULE_ID}.group.factions`),
      description: localize(`${MODULE_ID}.group.factionsHelp`),
      tableKeys: getImportedTableKeys("Factions and Gangs"),
    },
    {
      label: localize(`${MODULE_ID}.group.corporateLoot`),
      description: localize(`${MODULE_ID}.group.corporateLootHelp`),
      tableKeys: getImportedTableKeys("Corporate, Loot, and Jobs"),
    },
    {
      label: localize(`${MODULE_ID}.group.whats`),
      description: localize(`${MODULE_ID}.group.whatsHelp`),
      tableKeys: getImportedTableKeys("What's..?"),
    },
  ];
}

function getSceneBuilderGroups() {
  return FUTURE_TABLE_GROUPS.map((group) => {
    const chains = [];
    group.tableKeys.forEach((tableKey) => {
      const table = DATATERM_TABLES[tableKey];
      if (!table) return;
      const [baseName] = table.name.split(" - ");
      let chain = chains.find((entry) => entry.label === baseName);
      if (!chain) {
        chain = { id: `${slugify(group.label)}:${slugify(baseName)}`, label: baseName, tableKeys: [] };
        chains.push(chain);
      }
      chain.tableKeys.push(tableKey);
    });
    return {
      label: group.label,
      description: group.description,
      chains,
    };
  });
}

function findSceneBuilderChain(chainId) {
  return getSceneBuilderGroups()
    .flatMap((group) => group.chains.map((chain) => ({ ...chain, groupLabel: group.label })))
    .find((chain) => chain.id === chainId);
}

function findSceneBuilderChainByLabel(groupLabel, chainLabel) {
  return getSceneBuilderGroups()
    .flatMap((group) => group.chains.map((chain) => ({ ...chain, groupLabel: group.label })))
    .find((chain) => chain.groupLabel === groupLabel && chain.label === chainLabel);
}

function getChainChoices(groupLabel) {
  const group = getSceneBuilderGroups().find((entry) => entry.label === groupLabel);
  if (!group) return {};
  return Object.fromEntries(group.chains.map((chain) => [chain.id, chain.label]));
}

function getHustleChoices() {
  return {
    [NETRUNNER_HUSTLE_CHOICE]: localize(`${MODULE_ID}.generator.netrunnerHustle`),
    ...getChainChoices("Role Hustles"),
  };
}

function localizedCategoryLabel(key) {
  return localize(CATEGORY_CHOICES[key]);
}

async function getSystemCompendiumDocs(compendiumId) {
  const pack = game.packs.get(compendiumId);
  if (!pack) return [];
  return pack.getDocuments();
}

function getWorldSellableItems() {
  return game.items.filter((item) => MERCHANT_INVENTORY_ITEM_TYPES.has(item.type));
}

function dedupeItemsByTypeAndName(items) {
  const seen = new Set();
  const deduped = [];
  for (const item of items) {
    const key = `${item.type}:${item.name}`.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }
  return deduped;
}

async function getOrCreateFolder(name, parentFolder = null) {
  const parentId = parentFolder?.id ?? null;
  const existing = game.folders.find(
    (folder) =>
      folder.name === name &&
      folder.type === "RollTable" &&
      (folder.folder?.id ?? null) === parentId
  );
  if (existing) return existing;
  return Folder.create({ name, type: "RollTable", folder: parentId });
}

export default class CPRRolltableDashboard extends FormApplication {
  constructor(object = {}, options = {}) {
    super(object, options);
    this._tableChoices = null;
    this._merchantCache = null;
    this._resultHistory = [];
    this._activeTab = "generators";
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: MODULE_ID,
      title: localize(`${MODULE_ID}.title`),
      template: `modules/${MODULE_ID}/templates/rolltable-dashboard.hbs`,
      width: 900,
      height: 780,
      closeOnSubmit: false,
      submitOnChange: false,
      submitOnClose: false,
      resizable: true,
      classes: super.defaultOptions.classes.concat([MODULE_ID]),
    });
  }

  static showApp() {
    if (!this._instance) this._instance = new CPRRolltableDashboard();
    this._instance.render(true);
  }

  async getData() {
    const chains = deepClone(game.settings.get(MODULE_ID, CHAIN_SETTING) || []);
    return {
      isGM: game.user.isGM,
      customChains: chains,
      tableChoices: await this._getTableChoices(),
      categoryChoices: CATEGORY_CHOICES,
      rankChoices: RANK_CHOICES,
      periodChoices: PERIOD_CHOICES,
      repeatChoices: REPEAT_CHOICES,
      resultHistory: this._resultHistory,
      hasResultHistory: this._resultHistory.length > 0,
      postToChat: game.settings.get(MODULE_ID, POST_TO_CHAT_SETTING),
      roleHustleChoices: getHustleChoices(),
      datatermGroups: getDatatermGroups().map((group) => ({
        ...group,
        tables: group.tableKeys.map((tableKey) => ({ key: tableKey, name: DATATERM_TABLES[tableKey].name, formula: DATATERM_TABLES[tableKey].formula })),
      })),
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    this._activateDashboardTab(html, this._activeTab);
    html.find(".cpr-dashboard-tabs .item").click((event) => {
      event.preventDefault();
      this._activateDashboardTab(html, event.currentTarget.dataset.tab);
    });

    html.find(".js-generate-night-market").click(() => this._generateNightMarket());
    html.find(".js-generate-merchant").click(() => this._generateMerchantChat(html.find("[name='merchantCategory']").val()));
    html.find(".js-generate-encounter").click(() => this._generateEncounter(html.find("[name='encounterPeriod']").val()));
    html.find(".js-generate-role-hustle").click(() => this._generateHustle(html.find("[name='roleHustleGenerator']").val(), html.find("[name='roleHustleRankBand']").val()));
    html.find(".js-generate-desktop-chain").click((event) => this._generateDesktopChain(html.find(`[name='${event.currentTarget.dataset.selectName}']`).val()));
    html.find(".js-generate-named-chain").click((event) => this._generateNamedDesktopChain(event.currentTarget.dataset.groupLabel, event.currentTarget.dataset.chainLabel));
    html.find(".js-generate-vendit").click(() => this._generateVendit());
    html.find(".js-toggle-public-chat").change((event) => game.settings.set(MODULE_ID, POST_TO_CHAT_SETTING, event.currentTarget.checked));
    html.find(".js-roll-bundled-table").click((event) => this._rollBundledTable(event.currentTarget.dataset.tableKey));
    html.find(".js-clear-result-history").click(() => this._clearResultHistory());
    html.on("click", ".js-populate-night-market-merchants", (event) => this._populateNightMarketMerchants(event.currentTarget.dataset.resultId));

    if (!game.user.isGM) return;

    html.find(".js-import-bundled").click(() => this._importBundledTables());
    html.find(".js-add-chain").click(() => this._addChain());
    html.find(".js-add-step").click((event) => this._addStep(event.currentTarget.dataset.chainId));
    html.find(".js-remove-step").click((event) => this._removeStep(event.currentTarget.dataset.chainId, Number(event.currentTarget.dataset.stepIndex)));
    html.find(".js-save-chain").click((event) => this._saveChain(event.currentTarget.dataset.chainId));
    html.find(".js-run-chain").click((event) => this._runChain(event.currentTarget.dataset.chainId));
    html.find(".js-delete-chain").click((event) => this._deleteChain(event.currentTarget.dataset.chainId));
  }

  async _updateObject() {}

  _activateDashboardTab(html, tabName) {
    if (!tabName) return;
    this._activeTab = tabName;
    html.find(".cpr-dashboard-tabs .item").removeClass("active");
    html.find(`.cpr-dashboard-tabs .item[data-tab="${tabName}"]`).addClass("active");
    html.find(".cpr-dashboard-body .tab").removeClass("active");
    html.find(`.cpr-dashboard-body .tab[data-tab="${tabName}"]`).addClass("active");
  }

  async _getTableChoices() {
    if (this._tableChoices) return this._tableChoices;
    const choices = {};
    game.tables.forEach((table) => {
      choices[table.uuid] = `World :: ${table.name}`;
    });
    const rollTablePacks = game.packs.filter((pack) => pack.metadata.type === "RollTable");
    for (const pack of rollTablePacks) {
      const docs = await pack.getDocuments();
      docs.forEach((doc) => {
        choices[doc.uuid] = `${pack.metadata.label} :: ${doc.name}`;
      });
    }
    this._tableChoices = choices;
    return choices;
  }

  async _publishResult(title, lines, options = {}) {
    const { postToChat = game.settings.get(MODULE_ID, POST_TO_CHAT_SETTING), allowHtml = false, metadata = null, actions = [] } = options;
    const safeTitle = allowHtml ? title : escapeHtml(title);
    const safeLines = allowHtml ? lines : lines.map((line) => escapeHtml(line));
    const timestamp = new Date().toLocaleTimeString();
    this._resultHistory.unshift({ id: foundry.utils.randomID(), title: safeTitle, lines: safeLines, timestamp, metadata, actions });
    this._resultHistory = this._resultHistory.slice(0, RESULT_HISTORY_LIMIT);
    this._renderResultPanel();
    if (!postToChat) return;
    const content = [`<h2>${safeTitle}</h2>`, "<ul>"]
      .concat(safeLines.map((line) => `<li>${line}</li>`))
      .concat(["</ul>"])
      .join("");
    await ChatMessage.create({
      content,
      speaker: ChatMessage.getSpeaker({ alias: title }),
    });
  }

  _renderResultPanel() {
    if (!this.rendered || !this.element?.length) return;
    const panel = this.element.find(".cpr-result-panel");
    const hasHistory = this._resultHistory.length > 0;
    panel.toggleClass("is-empty", !hasHistory);
    panel.find(".cpr-result-empty").toggle(!hasHistory);
    panel.find(".cpr-result-content").toggle(hasHistory);
    panel.find(".js-clear-result-history").toggle(hasHistory);
    const feed = panel.find(".cpr-result-feed");
    feed.empty();
    this._resultHistory.forEach((result) => {
      const item = $("<article class='cpr-result-entry'></article>");
      const header = $("<div class='cpr-result-meta'></div>");
      header.append($(`<strong class="cpr-result-title">${result.title}</strong>`));
      header.append($(`<span class="cpr-result-time">${result.timestamp}</span>`));
      const list = $("<ol class='cpr-result-lines'></ol>");
      result.lines.forEach((line) => list.append($(`<li>${line}</li>`)));
      const actions = this._renderResultActions(result);
      item.append(header);
      if (actions) item.append(actions);
      item.append(list);
      feed.append(item);
    });
  }

  _renderResultActions(result) {
    if (!game.user.isGM || !Array.isArray(result.actions) || result.actions.length === 0) return null;
    const actions = $("<div class='cpr-result-actions'></div>");
    result.actions.forEach((action) => {
      if (action.type !== "populateNightMarketMerchants") return;
      const button = $(`<button type="button" class="cpr-result-action js-populate-night-market-merchants" data-result-id="${result.id}">${escapeHtml(localize(`${MODULE_ID}.button.populateMerchants`))}</button>`);
      actions.append(button);
    });
    return actions.children().length > 0 ? actions : null;
  }

  _clearResultHistory() {
    this._resultHistory = [];
    this._renderResultPanel();
  }

  _rollInlineTable(tableDef) {
    const max = tableDef.results[tableDef.results.length - 1].range[1];
    const total = Math.floor(Math.random() * max) + 1;
    return tableDef.results.find((result) => total >= result.range[0] && total <= result.range[1]);
  }

  async _rollFormula(formula) {
    const roll = new Roll(formula);
    await roll.evaluate();
    return roll;
  }

  async _rollBundledTable(tableKey) {
    const table = await this._ensureBundledTable(tableKey);
    if (!table) return;
    const draw = await table.draw({ displayChat: false });
    await this._publishResult(DATATERM_TABLES[tableKey].name, (draw.results || []).map((result) => result.text));
  }

  async _generateEncounter(period) {
    const typeResult = this._rollInlineTable(period === "day" ? DATATERM_TABLES.cityDayType : DATATERM_TABLES.cityNightType).text;
    let encounterTable = DATATERM_TABLES.cityViolent;
    if (typeResult === "Non-Violent") encounterTable = DATATERM_TABLES.cityNonViolent;
    if (typeResult === "Environmental") encounterTable = DATATERM_TABLES.cityEnvironmental;
    await this._publishResult(localize(`${MODULE_ID}.encounter.title`), [
      `${localize(`${MODULE_ID}.period.label`)}: ${localize(PERIOD_CHOICES[period])}`,
      `${localize(`${MODULE_ID}.encounter.type`)}: ${typeResult}`,
      this._rollInlineTable(encounterTable).text,
    ]);
  }

  async _generateNetrunnerHustle(rankBand) {
    const hustle = NETRUNNER_HUSTLES[(await this._rollFormula("1d10")).total - 1];
    const complicationRoll = await this._rollFormula("1d6");
    const lines = [
      `${localize(`${MODULE_ID}.rank.label`)}: ${localize(RANK_CHOICES[rankBand])}`,
      `${localize(`${MODULE_ID}.hustle.result`)}: ${hustle.text}`,
      `${localize(`${MODULE_ID}.hustle.pay`)}: ${hustle.pay[rankBand]} eb`,
    ];
    if (hustle.complicationOn && complicationRoll.total <= hustle.complicationOn) {
      lines.push(
        `${localize(`${MODULE_ID}.hustle.complication`)}: ${this._rollInlineTable(DATATERM_TABLES.netrunnerWhatWentWrong).text}`,
        `${localize(`${MODULE_ID}.hustle.trouble`)}: ${this._rollInlineTable(DATATERM_TABLES.netrunnerTroubleNow).text}`,
        `${localize(`${MODULE_ID}.hustle.opportunity`)}: ${this._rollInlineTable(DATATERM_TABLES.netrunnerOpportunity).text}`,
      );
    }
    await this._publishResult(localize(`${MODULE_ID}.hustle.title`), lines);
  }

  async _generateHustle(choice, rankBand) {
    if (choice === NETRUNNER_HUSTLE_CHOICE) {
      await this._generateNetrunnerHustle(rankBand);
      return;
    }
    await this._generateRoleHustle(choice, rankBand);
  }

  _getChainTable(chain, tableNamePart) {
    const tableKey = chain.tableKeys.find((key) => DATATERM_TABLES[key].name.includes(tableNamePart));
    return tableKey ? DATATERM_TABLES[tableKey] : null;
  }

  _parseHustleResult(text, rankBand) {
    const parts = text.split(" / ");
    const payIndex = { rank1to4: 1, rank5to7: 2, rank8to10: 3 }[rankBand];
    const complication = Number(parts[4]);
    return {
      result: parts[0],
      pay: parts[payIndex] ?? "?",
      complicationOn: Number.isNaN(complication) ? null : complication,
    };
  }

  async _generateRoleHustle(chainId, rankBand) {
    const chain = findSceneBuilderChain(chainId);
    if (!chain) return;
    const hustleTable = this._getChainTable(chain, "Hustle Chart");
    if (!hustleTable) return;
    const hustle = this._parseHustleResult(this._rollInlineTable(hustleTable).text, rankBand);
    const complicationRoll = await this._rollFormula("1d6");
    const lines = [
      `${localize(`${MODULE_ID}.rank.label`)}: ${localize(RANK_CHOICES[rankBand])}`,
      `${localize(`${MODULE_ID}.hustle.result`)}: ${hustle.result}`,
      `${localize(`${MODULE_ID}.hustle.pay`)}: ${hustle.pay} eb`,
    ];
    if (hustle.complicationOn) {
      lines.push(`${localize(`${MODULE_ID}.hustle.complicationRoll`)}: ${complicationRoll.total}/${hustle.complicationOn}`);
    }
    if (hustle.complicationOn && complicationRoll.total <= hustle.complicationOn) {
      const wentWrong = this._getChainTable(chain, "What Went Wrong");
      const trouble = this._getChainTable(chain, "So What is the Trouble Now");
      const opportunity = this._getChainTable(chain, "What is the Opportunity");
      if (wentWrong) lines.push(`${localize(`${MODULE_ID}.hustle.complication`)}: ${this._rollInlineTable(wentWrong).text}`);
      if (trouble) lines.push(`${localize(`${MODULE_ID}.hustle.trouble`)}: ${this._rollInlineTable(trouble).text}`);
      if (opportunity) lines.push(`${localize(`${MODULE_ID}.hustle.opportunity`)}: ${this._rollInlineTable(opportunity).text}`);
    }
    await this._publishResult(chain.label, lines);
  }

  async _generateDesktopChain(chainId) {
    const chain = findSceneBuilderChain(chainId);
    if (!chain) return;
    const lines = chain.tableKeys.map((tableKey) => {
      const table = DATATERM_TABLES[tableKey];
      const label = table.name.replace(`${chain.label} - `, "");
      return `${label}: ${this._rollInlineTable(table).text}`;
    });
    await this._publishResult(chain.label, lines);
  }

  async _generateNamedDesktopChain(groupLabel, chainLabel) {
    const chain = findSceneBuilderChainByLabel(groupLabel, chainLabel);
    if (!chain) return;
    await this._generateDesktopChain(chain.id);
  }

  _getVenditTable(category) {
    const tableKey = getImportedTableKeys("What's..?").find((key) => DATATERM_TABLES[key].name.includes(category.tableNamePart));
    return tableKey ? DATATERM_TABLES[tableKey] : null;
  }

  async _generateVendit() {
    const categoryRoll = await this._rollFormula("1d10");
    const itemCountRoll = await this._rollFormula("1d10");
    const category = VENDIT_CATEGORIES.find((entry) => categoryRoll.total >= entry.range[0] && categoryRoll.total <= entry.range[1]);
    const table = category ? this._getVenditTable(category) : null;
    if (!category || !table) return;
    const items = [];
    const seen = new Set();
    while (items.length < itemCountRoll.total && seen.size < table.results.length) {
      const item = this._rollInlineTable(table).text;
      if (seen.has(item)) continue;
      seen.add(item);
      items.push(item);
    }
    await this._publishResult(localize(`${MODULE_ID}.vendit.title`), [
      `${localize(`${MODULE_ID}.vendit.categoryRoll`)}: ${categoryRoll.total} (${category.label})`,
      `${localize(`${MODULE_ID}.vendit.itemCount`)}: ${itemCountRoll.total}`,
      ...items.map((item) => `- ${item}`),
    ]);
  }

  async _generateNightMarket() {
    const categories = Object.keys(CATEGORY_CHOICES).filter((key) => key !== "random");
    const firstCategory = categories[Math.floor(Math.random() * categories.length)];
    let secondCategory = firstCategory;
    while (secondCategory === firstCategory) {
      secondCategory = categories[Math.floor(Math.random() * categories.length)];
    }
    const merchants = [
      await this._generateMerchantInventory(firstCategory),
      await this._generateMerchantInventory(secondCategory),
    ];
    await this._publishResult(localize(`${MODULE_ID}.nightMarket.title`), [
      `${localize(`${MODULE_ID}.nightMarket.location`)}: ${this._rollInlineTable(DATATERM_TABLES.nightMarkets).text}`,
      `${localize(`${MODULE_ID}.nightMarket.clientele`)}: ${this._rollInlineTable(DATATERM_TABLES.nightMarketClientele).text}`,
      `${localize(`${MODULE_ID}.nightMarket.danger`)}: ${this._rollInlineTable(DATATERM_TABLES.nightMarketDanger).text}`,
      `${localize(`${MODULE_ID}.nightMarket.seller`)}: ${this._rollInlineTable(DATATERM_TABLES.nightMarketSeller).text}`,
      `${localize(`${MODULE_ID}.nightMarket.duration`)}: ${this._rollInlineTable(DATATERM_TABLES.nightMarketDuration).text}`,
      ...merchants.flatMap((merchant, index) => {
        const lines = [
          `<strong>${localize(`${MODULE_ID}.nightMarket.merchant`)} ${index + 1}: ${merchant.categoryLabel}</strong>`,
          `${localize(`${MODULE_ID}.nightMarket.itemCount`)}: ${merchant.count}`,
        ];
        merchant.items.forEach((item) => lines.push(`- ${item.name} (${item.price} eb)`));
        return lines;
      }),
    ], {
      allowHtml: true,
      metadata: { type: "nightMarket", merchants },
      actions: [{ type: "populateNightMarketMerchants" }],
    });
  }

  async _generateMerchantChat(category) {
    const merchant = await this._generateMerchantInventory(category);
    await this._publishResult(localize(`${MODULE_ID}.nightMarket.merchantTitle`), [
      `${localize(`${MODULE_ID}.nightMarket.merchantCategory`)}: ${merchant.categoryLabel}`,
      `${localize(`${MODULE_ID}.nightMarket.itemCount`)}: ${merchant.count}`,
      ...merchant.items.map((item) => `- ${item.name} (${item.price} eb)`),
    ]);
  }

  async _generateMerchantInventory(categoryKey) {
    let finalCategory = categoryKey;
    if (!finalCategory || finalCategory === "random") {
      const options = Object.keys(CATEGORY_CHOICES).filter((key) => key !== "random");
      finalCategory = options[Math.floor(Math.random() * options.length)];
    }
    const count = (await this._rollFormula("1d10")).total;
    const pool = await this._getMerchantPool(finalCategory);
    const shuffled = shuffleArray(pool);
    return {
      category: finalCategory,
      categoryLabel: localizedCategoryLabel(finalCategory),
      count,
      items: shuffled.slice(0, Math.min(count, shuffled.length)).map((item) => ({
        name: item.name,
        price: item.system?.price?.market ?? "?",
        sourceUuid: item.uuid,
      })),
    };
  }

  async _getMerchantPool(categoryKey) {
    if (!this._merchantCache) this._merchantCache = await this._buildMerchantCache();
    return this._merchantCache[categoryKey] || [];
  }

  async _buildMerchantCache() {
    const [coreGear, coreWeapons, coreArmor, coreCyberware, coreClothing, coreDrugs] = await Promise.all([
      getSystemCompendiumDocs("cyberpunk-red-core.core_gear"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_weapons"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_armor"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_cyberware"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_clothing"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_drugs"),
    ]);
    const worldItems = getWorldSellableItems();
    const gear = dedupeItemsByTypeAndName([...worldItems.filter((item) => item.type === "gear"), ...coreGear]);
    const weapons = dedupeItemsByTypeAndName([...worldItems.filter((item) => item.type === "weapon"), ...coreWeapons]);
    const armor = dedupeItemsByTypeAndName([...worldItems.filter((item) => item.type === "armor"), ...coreArmor]);
    const cyberware = dedupeItemsByTypeAndName([...worldItems.filter((item) => item.type === "cyberware"), ...coreCyberware]);
    const clothing = dedupeItemsByTypeAndName([...worldItems.filter((item) => item.type === "clothing"), ...coreClothing]);
    const drugs = dedupeItemsByTypeAndName([...worldItems.filter((item) => item.type === "drug"), ...coreDrugs]);
    return {
      foodAndDrugs: [...drugs, ...gear.filter((item) => FOOD_GEAR_NAMES.includes(item.name))],
      personalElectronics: gear.filter((item) => item.system?.isElectronic === true),
      weaponsAndArmor: [...weapons, ...armor],
      cyberware: [
        ...cyberware,
        ...gear.filter((item) => CYBER_GEAR_MATCHERS.some((matcher) => item.name.toLowerCase().includes(matcher))),
      ],
      clothingAndFashionware: [...clothing, ...cyberware.filter((item) => item.system?.type === "fashionware")],
      survivalGear: gear.filter((item) => {
        if (FOOD_GEAR_NAMES.includes(item.name)) return false;
        if (item.system?.isElectronic === true) return false;
        return !CYBER_GEAR_MATCHERS.some((matcher) => item.name.toLowerCase().includes(matcher));
      }),
    };
  }

  async _populateNightMarketMerchants(resultId) {
    if (!game.user.isGM) {
      notify("warn", `${MODULE_ID}.merchantPopulate.gmOnly`);
      return;
    }
    const result = this._resultHistory.find((entry) => entry.id === resultId);
    const merchants = result?.metadata?.type === "nightMarket" ? result.metadata.merchants : [];
    if (!merchants.length) {
      notify("warn", `${MODULE_ID}.merchantPopulate.missingResult`);
      return;
    }
    const populated = [];
    const missingActors = [];
    const missingItems = [];
    for (const merchant of merchants) {
      const actor = this._findMerchantActor(merchant.category);
      if (!actor) {
        missingActors.push(merchant.categoryLabel);
        continue;
      }
      const created = await this._replaceMerchantInventory(actor, merchant.items, missingItems);
      populated.push(`${actor.name} (${created})`);
    }
    if (populated.length > 0) {
      ui.notifications.info(format(`${MODULE_ID}.merchantPopulate.success`, { actors: populated.join(", ") }));
    }
    if (missingActors.length > 0) {
      ui.notifications.warn(format(`${MODULE_ID}.merchantPopulate.missingActors`, { categories: missingActors.join(", ") }));
    }
    if (missingItems.length > 0) {
      ui.notifications.warn(format(`${MODULE_ID}.merchantPopulate.missingItems`, { items: missingItems.join(", ") }));
    }
  }

  _findMerchantActor(category) {
    const candidateNames = MERCHANT_ACTOR_NAMES[category] || [];
    const normalizedCandidates = candidateNames.map((name) => name.toLowerCase());
    return game.actors.find((actor) => normalizedCandidates.includes(actor.name.toLowerCase())) || null;
  }

  async _replaceMerchantInventory(actor, items, missingItems) {
    const deletableItemIds = actor.items
      .filter((item) => MERCHANT_INVENTORY_ITEM_TYPES.has(item.type) && item.system?.core !== true)
      .map((item) => item.id);
    if (deletableItemIds.length > 0) {
      await actor.deleteEmbeddedDocuments("Item", deletableItemIds, { deleteInstalled: true, unloadAmmo: true });
    }
    const itemData = [];
    for (const item of items) {
      const source = item.sourceUuid ? await fromUuid(item.sourceUuid) : null;
      if (!source) {
        missingItems.push(item.name);
        continue;
      }
      const data = source.toObject();
      delete data._id;
      if (data.system?.core === true) data.system.core = false;
      itemData.push(data);
    }
    if (itemData.length === 0) return 0;
    const created = await actor.createEmbeddedDocuments("Item", itemData, { createInstalled: true });
    return created.length;
  }

  async _importBundledTables() {
    const root = await getOrCreateFolder(ROOT_FOLDER_NAME);
    const folders = {};
    const groupNames = [...new Set(Object.values(DATATERM_TABLES).map((table) => table.folder))];
    for (const name of groupNames) {
      folders[name] = await getOrCreateFolder(name, root);
    }
    let created = 0;
    for (const tableDef of Object.values(DATATERM_TABLES)) {
      const folder = folders[tableDef.folder];
      const existing = game.tables.find((table) => table.name === tableDef.name && table.folder?.id === folder.id);
      if (existing) continue;
      await RollTable.create({
        name: tableDef.name,
        description: tableDef.name,
        formula: tableDef.formula,
        replacement: true,
        displayRoll: true,
        img: "icons/svg/d20-black.svg",
        folder: folder.id,
        results: tableDef.results.map((result) => ({
          _id: foundry.utils.randomID(),
          type: "text",
          text: result.text,
          range: result.range,
          weight: result.range[1] - result.range[0] + 1,
          drawn: false,
          img: "icons/svg/d20-black.svg",
          documentCollection: "",
          documentId: null,
        })),
      });
      created += 1;
    }
    notify("notify", created > 0 ? `${MODULE_ID}.import.success` : `${MODULE_ID}.import.alreadyExists`);
    this._resultHistory.unshift({
      id: foundry.utils.randomID(),
      title: escapeHtml(localize(`${MODULE_ID}.import.resultTitle`)),
      timestamp: new Date().toLocaleTimeString(),
      lines: [escapeHtml(localize(created > 0 ? `${MODULE_ID}.import.success` : `${MODULE_ID}.import.alreadyExists`))],
    });
    this._resultHistory = this._resultHistory.slice(0, RESULT_HISTORY_LIMIT);
    this._tableChoices = null;
    this.render(true);
  }

  async _ensureBundledTable(tableKey) {
    const name = DATATERM_TABLES[tableKey].name;
    let table = game.tables.find((entry) => entry.name === name);
    if (table) return table;
    await this._importBundledTables();
    table = game.tables.find((entry) => entry.name === name);
    return table || null;
  }

  async _addChain() {
    const chains = deepClone(game.settings.get(MODULE_ID, CHAIN_SETTING) || []);
    chains.push({
      id: foundry.utils.randomID(),
      name: localize(`${MODULE_ID}.customChain.newName`),
      category: "",
      steps: [{ label: localize(`${MODULE_ID}.customChain.step`), tableUuid: "", repeatMode: "once", repeatValue: 1 }],
    });
    await game.settings.set(MODULE_ID, CHAIN_SETTING, chains);
    this.render(true);
  }

  async _addStep(chainId) {
    const chains = deepClone(game.settings.get(MODULE_ID, CHAIN_SETTING) || []);
    const chain = chains.find((entry) => entry.id === chainId);
    if (!chain) return;
    chain.steps.push({ label: localize(`${MODULE_ID}.customChain.step`), tableUuid: "", repeatMode: "once", repeatValue: 1 });
    await game.settings.set(MODULE_ID, CHAIN_SETTING, chains);
    this.render(true);
  }

  async _removeStep(chainId, stepIndex) {
    const chains = deepClone(game.settings.get(MODULE_ID, CHAIN_SETTING) || []);
    const chain = chains.find((entry) => entry.id === chainId);
    if (!chain) return;
    chain.steps.splice(stepIndex, 1);
    if (chain.steps.length === 0) {
      chain.steps.push({ label: localize(`${MODULE_ID}.customChain.step`), tableUuid: "", repeatMode: "once", repeatValue: 1 });
    }
    await game.settings.set(MODULE_ID, CHAIN_SETTING, chains);
    this.render(true);
  }

  async _saveChain(chainId) {
    const chains = deepClone(game.settings.get(MODULE_ID, CHAIN_SETTING) || []);
    const index = chains.findIndex((entry) => entry.id === chainId);
    if (index === -1) return;
    const parsed = this._readChain(chainId);
    if (!parsed) return;
    chains[index] = parsed;
    await game.settings.set(MODULE_ID, CHAIN_SETTING, chains);
    notify("notify", `${MODULE_ID}.chain.saved`);
    this.render(true);
  }

  async _deleteChain(chainId) {
    const chains = deepClone(game.settings.get(MODULE_ID, CHAIN_SETTING) || []).filter((entry) => entry.id !== chainId);
    await game.settings.set(MODULE_ID, CHAIN_SETTING, chains);
    this.render(true);
  }

  _readChain(chainId) {
    const chainElement = this.form.querySelector(`.cpr-chain-card[data-chain-id="${chainId}"]`);
    if (!chainElement) return null;
    return {
      id: chainId,
      name: chainElement.querySelector("[name='chain-name']")?.value?.trim() || localize(`${MODULE_ID}.customChain.newName`),
      category: chainElement.querySelector("[name='chain-category']")?.value?.trim() || "",
      steps: Array.from(chainElement.querySelectorAll(".cpr-chain-step")).map((stepElement) => ({
        label: stepElement.querySelector("[name='step-label']")?.value?.trim() || localize(`${MODULE_ID}.customChain.step`),
        tableUuid: stepElement.querySelector("[name='step-table-uuid']")?.value || "",
        repeatMode: stepElement.querySelector("[name='step-repeat-mode']")?.value || "once",
        repeatValue: Number(stepElement.querySelector("[name='step-repeat-value']")?.value || 1),
      })),
    };
  }

  async _runChain(chainId) {
    const chain = this._readChain(chainId);
    if (!chain) return;
    const lines = [];
    let previousNumeric = 1;
    for (const step of chain.steps) {
      if (!step.tableUuid) continue;
      const table = await fromUuid(step.tableUuid);
      if (!table) {
        lines.push(`${step.label}: ${localize(`${MODULE_ID}.error.missingTable`)}`);
        continue;
      }
      let repeatCount = 1;
      if (step.repeatMode === "fixed") repeatCount = Math.max(1, Number(step.repeatValue) || 1);
      if (step.repeatMode === "previousNumeric") repeatCount = Math.max(1, previousNumeric || 1);
      const rolled = [];
      for (let i = 0; i < repeatCount; i += 1) {
        const draw = await table.draw({ displayChat: false });
        const [result] = draw.results || [];
        if (!result) continue;
        const text = result.text ?? result.description ?? table.name;
        rolled.push(text);
        previousNumeric = this._extractNumericResult(result, previousNumeric);
      }
      lines.push(`<strong>${step.label}</strong>: ${rolled.join("; ")}`);
    }
    await this._publishResult(chain.name, lines);
  }

  _extractNumericResult(result, fallback = 1) {
    const text = result.text ?? result.description ?? "";
    const match = text.match(/\d+/);
    if (match) return Number(match[0]);
    if (Array.isArray(result.range) && result.range.length > 0) return Number(result.range[0]) || fallback;
    return fallback;
  }
}

export function registerRolltableDashboard() {
  game.settings.register(MODULE_ID, CHAIN_SETTING, {
    scope: "world",
    config: false,
    type: Array,
    default: [],
  });

  game.settings.register(MODULE_ID, POST_TO_CHAT_SETTING, {
    scope: "client",
    config: false,
    type: Boolean,
    default: true,
  });

  Hooks.on("getSceneControlButtons", (controls) => {
    const tokenControls = controls.find((control) => control.name === "token");
    if (!tokenControls) return;
    if (tokenControls.tools.find((tool) => tool.name === MODULE_ID)) return;
    tokenControls.tools.push({
      name: MODULE_ID,
      title: localize(`${MODULE_ID}.title`),
      icon: "fa-solid fa-table-cells-large",
      button: true,
      onClick: () => {
        if (game.system.id !== REQUIRED_SYSTEM_ID) {
          notify("warn", `${MODULE_ID}.warning.systemMismatch`);
          return;
        }
        CPRRolltableDashboard.showApp();
      },
    });
  });
}
