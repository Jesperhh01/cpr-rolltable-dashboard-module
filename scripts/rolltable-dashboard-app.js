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
const ROOT_FOLDER_NAME = "CPR Rolltable Dashboard";
const REQUIRED_SYSTEM_ID = "cyberpunk-red-core";

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

function localize(key) {
  return game.i18n.localize(key);
}

function deepClone(data) {
  return foundry.utils.deepClone(data);
}

function notify(type, key) {
  const message = localize(key);
  ui.notifications[type](message);
}

function getDatatermGroups() {
  return [
    {
      label: localize(`${MODULE_ID}.group.nightMarkets`),
      description: localize(`${MODULE_ID}.group.nightMarketsHelp`),
      tableKeys: [
        "nightMarkets",
        "nightMarketClientele",
        "nightMarketDanger",
        "nightMarketSeller",
        "nightMarketDuration",
      ],
    },
    {
      label: localize(`${MODULE_ID}.group.netrunnerHustles`),
      description: localize(`${MODULE_ID}.group.netrunnerHustlesHelp`),
      tableKeys: [
        "netrunnerHustleChart",
        "netrunnerWhatWentWrong",
        "netrunnerTroubleNow",
        "netrunnerOpportunity",
      ],
    },
    {
      label: localize(`${MODULE_ID}.group.cityEncounters`),
      description: localize(`${MODULE_ID}.group.cityEncountersHelp`),
      tableKeys: [
        "cityDayType",
        "cityNightType",
        "cityNonViolent",
        "cityViolent",
        "cityEnvironmental",
      ],
    },
  ].concat(
    FUTURE_TABLE_GROUPS.map((group) => ({
      label: group.label,
      description: group.description,
      tableKeys: group.tableKeys,
      empty: group.tableKeys.length === 0,
    }))
  );
}

function localizedCategoryLabel(key) {
  return localize(CATEGORY_CHOICES[key]);
}

async function getSystemCompendiumDocs(compendiumId) {
  const pack = game.packs.get(compendiumId);
  if (!pack) return [];
  return pack.getDocuments();
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
    this._lastResult = null;
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
      tabs: [{ navSelector: ".cpr-dashboard-tabs", contentSelector: ".cpr-dashboard-body", initial: "generators" }],
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
      lastResult: this._lastResult,
      datatermGroups: getDatatermGroups().map((group) => ({
        ...group,
        tables: group.tableKeys.map((tableKey) => ({ key: tableKey, name: DATATERM_TABLES[tableKey].name, formula: DATATERM_TABLES[tableKey].formula })),
      })),
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".js-generate-night-market").click(() => this._generateNightMarket());
    html.find(".js-generate-merchant").click(() => this._generateMerchantChat(html.find("[name='merchantCategory']").val()));
    html.find(".js-generate-encounter").click(() => this._generateEncounter(html.find("[name='encounterPeriod']").val()));
    html.find(".js-generate-netrunner-hustle").click(() => this._generateNetrunnerHustle(html.find("[name='netrunnerRankBand']").val()));
    html.find(".js-roll-bundled-table").click((event) => this._rollBundledTable(event.currentTarget.dataset.tableKey));

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
    const { postToChat = true } = options;
    const timestamp = new Date().toLocaleTimeString();
    this._lastResult = { title, lines, timestamp };
    this._renderResultPanel();
    if (!postToChat) return;
    const content = [`<h2>${title}</h2>`, "<ul>"]
      .concat(lines.map((line) => `<li>${line}</li>`))
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
    panel.removeClass("is-empty");
    panel.find(".cpr-result-empty").hide();
    panel.find(".cpr-result-content").show();
    panel.find(".cpr-result-title").text(this._lastResult.title);
    panel.find(".cpr-result-time").text(this._lastResult.timestamp);
    const list = panel.find(".cpr-result-lines");
    list.empty();
    this._lastResult.lines.forEach((line) => list.append($(`<li>${line}</li>`)));
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
    ]);
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
    const shuffled = foundry.utils.shuffle(pool);
    return {
      category: finalCategory,
      categoryLabel: localizedCategoryLabel(finalCategory),
      count,
      items: shuffled.slice(0, Math.min(count, shuffled.length)).map((item) => ({
        name: item.name,
        price: item.system?.price?.market ?? "?",
      })),
    };
  }

  async _getMerchantPool(categoryKey) {
    if (!this._merchantCache) this._merchantCache = await this._buildMerchantCache();
    return this._merchantCache[categoryKey] || [];
  }

  async _buildMerchantCache() {
    const [gear, weapons, armor, cyberware, clothing, drugs] = await Promise.all([
      getSystemCompendiumDocs("cyberpunk-red-core.core_gear"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_weapons"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_armor"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_cyberware"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_clothing"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_drugs"),
    ]);
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
    this._lastResult = {
      title: localize(`${MODULE_ID}.import.resultTitle`),
      timestamp: new Date().toLocaleTimeString(),
      lines: [localize(created > 0 ? `${MODULE_ID}.import.success` : `${MODULE_ID}.import.alreadyExists`)],
    };
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
