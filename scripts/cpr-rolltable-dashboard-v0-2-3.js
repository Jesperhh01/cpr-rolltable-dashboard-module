// scripts/dataterm-tables.js
var DATATERM_TABLES = {
  nightMarkets: {
    name: "Dataterm: Night Markets - Where Is It Located?",
    folder: "Night Markets",
    formula: "1d60",
    results: [
      { range: [1, 3], text: "Under an overpass behind a chainlink fence." },
      { range: [4, 6], text: "Inside an abandoned building down a back alley." },
      { range: [7, 9], text: "In an alleyway hidden from view from main streets." },
      { range: [10, 12], text: "In a room of a megabuilding at least 10 floors up." },
      { range: [13, 15], text: "In a parking lot with a bunch of circled vans." },
      { range: [16, 18], text: "On the roof of a collection of tenement slums." },
      { range: [19, 21], text: "On the roof of an office building or tower." },
      { range: [22, 24], text: "In an abandoned train station or metro tunnel." },
      { range: [25, 27], text: "Inside a burned out bus junked in an empty lot." },
      { range: [28, 30], text: "In an empty lot or patch of dirt somewhere." },
      { range: [31, 33], text: "In an abandoned warehouse or factory." },
      { range: [34, 36], text: "In a junkyard or dump, hidden by the piles of stuff." },
      { range: [37, 39], text: "Spread out throughout a food or fish market." },
      { range: [40, 42], text: "Inside a nightclub, off the main dance floor." },
      { range: [43, 45], text: "Inside a blown out building among the rubble." },
      { range: [46, 48], text: "In the middle of the road, blocking traffic." },
      { range: [49, 51], text: "In a park or recreational lot." },
      { range: [52, 54], text: "In a maintenance tunnel under the street." },
      { range: [55, 57], text: "In an old tunnel or storm drain." },
      { range: [58, 60], text: "In the back room of a legitimate shop." }
    ]
  },
  nightMarketClientele: {
    name: "Dataterm: Night Markets - Clientele",
    folder: "Night Markets",
    formula: "1d10",
    results: [
      { range: [1, 1], text: "Edgerunners looking for better gear." },
      { range: [2, 2], text: "Fixers and teams looking for stuff to acquire." },
      { range: [3, 3], text: "Average people looking for deals or cool stuff to have." },
      { range: [4, 4], text: "Wealthy people looking for luxury goods or new stuff." },
      { range: [5, 5], text: "Corpo acquisition teams making official purchases." },
      { range: [6, 6], text: 'A corp representative making "off the book" purchases.' },
      { range: [7, 7], text: "Independent businesses trying to find cheap materials." },
      { range: [8, 8], text: "Gangers who found their way here, I guess, buying things?" },
      { range: [9, 9], text: "Nomads looking for materials to move or ship." },
      { range: [10, 10], text: "A random club or group here for a specific reason." }
    ]
  },
  nightMarketDanger: {
    name: "Dataterm: Night Markets - What Is Dangerous About This Market?",
    folder: "Night Markets",
    formula: "1d10",
    results: [
      { range: [1, 1], text: "Some of the people here are ready for violence at any time." },
      { range: [2, 2], text: "A private security team has been hired to guard the place." },
      { range: [3, 3], text: "The market is taking place in or near gang territory." },
      { range: [4, 4], text: "The location has traps, some marked, some not marked." },
      { range: [5, 5], text: "There is a toxic substance or hazard that people try to avoid." },
      { range: [6, 6], text: "The NCPD is currently hunting one or more people here." },
      { range: [7, 7], text: "Two or more of the clients/vendors here are bitter enemies." },
      { range: [8, 8], text: "One of the PCs' enemies is here and may see them." },
      { range: [9, 9], text: "Someone or some group is planning to attack the market." },
      { range: [10, 10], text: "There are strict etiquette codes, violate them and get shot." }
    ]
  },
  nightMarketSeller: {
    name: "Dataterm: Night Markets - Who Is Selling Here?",
    folder: "Night Markets",
    formula: "1d10",
    results: [
      { range: [1, 1], text: "Nomads who have transported the material here." },
      { range: [2, 2], text: "A fixers team who is flipping the goods." },
      { range: [3, 3], text: 'A legitimate businessman doing business "off the books".' },
      { range: [4, 4], text: 'A corp officer or worker who is selling "lost" items.' },
      { range: [5, 5], text: "Some scavengers who stripped or scavenged the items." },
      { range: [6, 6], text: "Some edgerunners selling a haul from a job." },
      { range: [7, 7], text: "Some boostergangers repurposing stolen items." },
      { range: [8, 8], text: "Homeless people who found something valuable." },
      { range: [9, 9], text: "A corp representative attempting to make extra sales." },
      { range: [10, 10], text: "Someone strange, and no one knows how they got the stuff." }
    ]
  },
  nightMarketDuration: {
    name: "Dataterm: Night Markets - How Long Will This Be Here?",
    folder: "Night Markets",
    formula: "1d10",
    results: [
      { range: [1, 3], text: "The market is only here for a few hours or until the organizer tells everybody to clear out." },
      { range: [4, 5], text: "The market is planned to be here for a full night assuming nothing bad happens." },
      { range: [6, 7], text: "The market is intermittent and usually stays for about a day." },
      { range: [8, 9], text: "This is a usual market that stays for a couple of days each month." },
      { range: [10, 10], text: "The market is here regularly, for about a week each month depending upon supply." }
    ]
  },
  netrunnerHustleChart: {
    name: "Dataterm: Netrunner Hustles - Hustle Chart",
    folder: "Netrunner Hustles",
    formula: "1d10",
    results: [
      { range: [1, 1], text: "Cracked a municipal system and sold the data to a fixer." },
      { range: [2, 2], text: "Cracked a corp system and sold the data to a fixer." },
      { range: [3, 3], text: "Nothing you found worth it or no one would pay this week." },
      { range: [4, 4], text: "Found an old data cache, cracked it, and sold it." },
      { range: [5, 5], text: "Dropped a virus into a system, and got paid to remove it." },
      { range: [6, 6], text: "Stole data from a corp and gave it back for a fee." },
      { range: [7, 7], text: "Coded a nasty virus and found a buyer for it." },
      { range: [8, 8], text: "Someone paid you to sabotage a municipal system." },
      { range: [9, 9], text: "You pen-tested a corp system and got a good payout." },
      { range: [10, 10], text: "Did some temp net security for a fee and stopped a break-in." }
    ]
  },
  netrunnerWhatWentWrong: {
    name: "Dataterm: Netrunner Hustles - What Went Wrong?",
    folder: "Netrunner Hustles",
    formula: "1d60",
    results: [
      { range: [1, 3], text: "Your target was more hardened than you thought." },
      { range: [4, 6], text: "Your work triggered a police investigation." },
      { range: [7, 9], text: "You had to fight another netrunner to get your pay." },
      { range: [10, 12], text: "You had to crack some heads to get your pay." },
      { range: [13, 15], text: "The client wanted you to do something horrible." },
      { range: [16, 18], text: "A media attempted to interfere with your work." },
      { range: [19, 21], text: "Netwatch really screwed everything up." },
      { range: [22, 24], text: "Your client screwed you on the job." },
      { range: [25, 27], text: "An innocent person interfered with your job." },
      { range: [28, 30], text: "The data is way more dangerous than you thought." },
      { range: [31, 33], text: "An enemy attempted to sabotage your hustle." },
      { range: [34, 36], text: "A colleague/contact was somehow harmed." },
      { range: [37, 39], text: "You and a fellow netrunner competed for pay." },
      { range: [40, 42], text: "There was a cyberpsycho at the job site." },
      { range: [43, 45], text: "The police broke into the place unexpectedly." },
      { range: [46, 48], text: "Someone important ended up dead on your job." },
      { range: [49, 51], text: "A mysterious entity paid you to abandon your job." },
      { range: [52, 54], text: "Someone tipped off the target that you were coming." },
      { range: [55, 57], text: "Security was way tighter for an unrelated reason." },
      { range: [58, 60], text: "You had to kill people to get out safely." }
    ]
  },
  netrunnerTroubleNow: {
    name: "Dataterm: Netrunner Hustles - So What Is the Trouble Now?",
    folder: "Netrunner Hustles",
    formula: "1d10",
    results: [
      { range: [1, 1], text: "You may be attacked or ambushed soon." },
      { range: [2, 2], text: "An ally or friend may be attacked or ambushed soon." },
      { range: [3, 3], text: "You will have to pay off or fight off someone." },
      { range: [4, 4], text: "Something valuable to you has been stolen or lost." },
      { range: [5, 5], text: "Someone holds you responsible for their troubles." },
      { range: [6, 6], text: "An enemy or rival may benefit greatly from this." },
      { range: [7, 7], text: "You may not be able to effectively hustle next time." },
      { range: [8, 8], text: "You are going to attract a lot of unwanted attention." },
      { range: [9, 9], text: "A contact or ally may abandon or begin to distrust you." },
      { range: [10, 10], text: "You may be required to do more work." }
    ]
  },
  netrunnerOpportunity: {
    name: "Dataterm: Netrunner Hustles - What Is the Opportunity if You Fix This?",
    folder: "Netrunner Hustles",
    formula: "1d6",
    results: [
      { range: [1, 1], text: "This could net you a bit of extra pay." },
      { range: [2, 2], text: "You could get a new ally or contact out of this." },
      { range: [3, 3], text: "You could get some valuable item from this." },
      { range: [4, 4], text: "You might get something vital to completing another job." },
      { range: [5, 5], text: "You may find/receive an opportunity for a lucrative run." },
      { range: [6, 6], text: "Someone will owe you a big favor." }
    ]
  },
  cityDayType: {
    name: "Dataterm: City Encounters - Daytime Type",
    folder: "City Encounters",
    formula: "1d6",
    results: [
      { range: [1, 2], text: "Non-Violent" },
      { range: [3, 4], text: "Violent" },
      { range: [5, 6], text: "Environmental" }
    ]
  },
  cityNightType: {
    name: "Dataterm: City Encounters - Nighttime Type",
    folder: "City Encounters",
    formula: "1d10",
    results: [
      { range: [1, 1], text: "Non-Violent" },
      { range: [2, 5], text: "Violent" },
      { range: [6, 6], text: "Environmental" },
      { range: [7, 10], text: "Violent" }
    ]
  },
  cityNonViolent: {
    name: "Dataterm: City Encounters - Non-Violent",
    folder: "City Encounters",
    formula: "1d10",
    results: [
      { range: [1, 1], text: "A group of homeless people or working poor — Asking or demanding money from you with threat of force." },
      { range: [2, 2], text: "A crowd of noisy party goers or flashy urban youths — Standing around doing something that blocks your path." },
      { range: [3, 3], text: "A crowd of corporate workers or plain civilians — Loudly shouting at you and everyone else about something." },
      { range: [4, 4], text: "One or more gangsters with pistols and minimal armor — Telling you and everyone else that they need to leave the area." },
      { range: [5, 5], text: "One or more police officers in patrol gear with pistols — Questioning you about your business or your stuff." },
      { range: [6, 6], text: "A group of corporate suits with bodyguards nearby — Attempting to aggressively sell you food, junk, or cheap drugs." },
      { range: [7, 7], text: "One or more insane looking people with wild clothing or rags — Following you but not attempting to directly approach you." },
      { range: [8, 8], text: "Corporate technicians or corpo operatives — They are doing their job in the street, but you are in the way." },
      { range: [9, 9], text: "A group of nomads nearby to or inside their vehicles — Looking over or looting a dead or nearly dead body." },
      { range: [10, 10], text: "One or more street salesmen or loud street stalls — Doing something truly weird..." }
    ]
  },
  cityViolent: {
    name: "Dataterm: City Encounters - Violent",
    folder: "City Encounters",
    formula: "1d10",
    results: [
      { range: [1, 1], text: "A group of homeless people or working poor — Ambushing you to kill you and/or take your stuff." },
      { range: [2, 2], text: "A group of drugged out psychos with deadly weapons — Demanding your stuff or else they’ll kill you." },
      { range: [3, 3], text: "A crew for an organized crime outfit with lots of guns — Demanding a toll to pass through an area or else they’ll kill you." },
      { range: [4, 4], text: "One or more gangsters with pistols, SMGs, and some armor — Fighting with another group, and you are in the way." },
      { range: [5, 5], text: "A squad of policemen with heavier armor and weapons — Looting some bodies after a firefight, and you just walked in." },
      { range: [6, 6], text: "A group of corporate suits with bodyguards nearby — Beating up some innocents for some reason, and you are there." },
      { range: [7, 7], text: "A cyberpsycho — Destroying or burning down a building." },
      { range: [8, 8], text: "Some solos or enforcers with heavy armaments — Brutally murdering someone in the street." },
      { range: [9, 9], text: "A group of nomads nearby to or inside their vehicles — Having a celebration or wild party, and they don’t like you there." },
      { range: [10, 10], text: "Some wretched scavengers with lots of weapons — Patrolling an area they control, and they want you gone now!" }
    ]
  },
  cityEnvironmental: {
    name: "Dataterm: City Encounters - Environmental",
    folder: "City Encounters",
    formula: "1d10",
    results: [
      { range: [1, 1], text: "A nearby building or piece of concrete/metal infrastructure — Something violently explodes near you and either starts a fire or threatens to start a fire." },
      { range: [2, 2], text: "An abandoned or destroyed vehicle — Something violently explodes near you and either starts a fire or threatens to start a fire." },
      { range: [3, 3], text: "A manhole open or closed — Hazardous chemicals and/or noxious gas are released over a wide area, threatening everyone in that space." },
      { range: [4, 4], text: "A nearby door or doorway — An obvious trap has been laid to kill you or someone else who passes by." },
      { range: [5, 5], text: "The roadway beneath you — An obvious trap has been laid to kill you or someone else who passes by." },
      { range: [6, 6], text: "A pole, post, or utility tower nearby — Something heavy, sharp, and/or dangerous threatens to hit you or fall on you." },
      { range: [7, 7], text: "A dead body or multiple dead bodies — Something heavy, sharp, and/or dangerous threatens to hit you or fall on you." },
      { range: [8, 8], text: "A piece of junk or pile of junk and trash — Something either blocks your way, makes passage difficult, or draws a crowd that blocks your path." },
      { range: [9, 9], text: "A suspicious but mundane item (radio, briefcase, wallet, etc.) — Something either blocks your way, makes passage difficult, or draws a crowd that blocks your path." },
      { range: [10, 10], text: "An empty stall or cart — Something either blocks your way, makes passage difficult, or draws a crowd that blocks your path." }
    ]
  }
};
var FUTURE_TABLE_GROUPS = [
  {
    label: "Gang Generators",
    description: "Reserved for the Desktop rolltables source file. No rows were imported because Gang generators.txt is currently empty.",
    tableKeys: []
  },
  {
    label: "Location Generators",
    description: "Reserved for the Desktop rolltables source file. No rows were imported because Location generators.txt is currently empty.",
    tableKeys: []
  }
];
var NETRUNNER_HUSTLES = [
  { text: "Cracked a municipal system and sold the data to a fixer.", pay: { rank1to4: 100, rank5to7: 200, rank8to10: 500 }, complicationOn: 2 },
  { text: "Cracked a corp system and sold the data to a fixer.", pay: { rank1to4: 200, rank5to7: 300, rank8to10: 600 }, complicationOn: 3 },
  { text: "Nothing you found worth it or no one would pay this week.", pay: { rank1to4: 0, rank5to7: 100, rank8to10: 300 }, complicationOn: null },
  { text: "Found an old data cache, cracked it, and sold it.", pay: { rank1to4: 200, rank5to7: 300, rank8to10: 600 }, complicationOn: 3 },
  { text: "Dropped a virus into a system, and got paid to remove it.", pay: { rank1to4: 200, rank5to7: 300, rank8to10: 600 }, complicationOn: 3 },
  { text: "Stole data from a corp and gave it back for a fee.", pay: { rank1to4: 200, rank5to7: 300, rank8to10: 600 }, complicationOn: 3 },
  { text: "Coded a nasty virus and found a buyer for it.", pay: { rank1to4: 200, rank5to7: 300, rank8to10: 600 }, complicationOn: 3 },
  { text: "Someone paid you to sabotage a municipal system.", pay: { rank1to4: 200, rank5to7: 300, rank8to10: 500 }, complicationOn: 3 },
  { text: "You pen-tested a corp system and got a good payout.", pay: { rank1to4: 100, rank5to7: 200, rank8to10: 500 }, complicationOn: 2 },
  { text: "Did some temp net security for a fee and stopped a break-in.", pay: { rank1to4: 100, rank5to7: 200, rank8to10: 500 }, complicationOn: 2 }
];
var FOOD_GEAR_NAMES = ["Food Stick", "Kibble Pack", "MRE"];
var CYBER_GEAR_MATCHERS = ["cyberdeck", "smart glasses", "battleglove", "linear frame"];

// scripts/rolltable-dashboard-app-v0-2-2.js
var MODULE_ID = "cpr-rolltable-dashboard";
var CHAIN_SETTING = "rolltableDashboardChains";
var ROOT_FOLDER_NAME = "CPR Rolltable Dashboard";
var REQUIRED_SYSTEM_ID = "cyberpunk-red-core";
var CATEGORY_CHOICES = {
  random: `${MODULE_ID}.category.random`,
  foodAndDrugs: `${MODULE_ID}.category.foodAndDrugs`,
  personalElectronics: `${MODULE_ID}.category.personalElectronics`,
  weaponsAndArmor: `${MODULE_ID}.category.weaponsAndArmor`,
  cyberware: `${MODULE_ID}.category.cyberware`,
  clothingAndFashionware: `${MODULE_ID}.category.clothingAndFashionware`,
  survivalGear: `${MODULE_ID}.category.survivalGear`
};
var RANK_CHOICES = {
  rank1to4: `${MODULE_ID}.rank.1to4`,
  rank5to7: `${MODULE_ID}.rank.5to7`,
  rank8to10: `${MODULE_ID}.rank.8to10`
};
var PERIOD_CHOICES = {
  day: `${MODULE_ID}.period.day`,
  night: `${MODULE_ID}.period.night`
};
var REPEAT_CHOICES = {
  once: `${MODULE_ID}.repeat.once`,
  fixed: `${MODULE_ID}.repeat.fixed`,
  previousNumeric: `${MODULE_ID}.repeat.previousNumeric`
};
function localize(key) {
  return game.i18n.localize(key);
}
function deepClone(data) {
  return foundry.utils.deepClone(data);
}
function shuffleArray(items) {
  const shuffled = Array.from(items);
  for (let index = shuffled.length - 1;index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
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
        "nightMarketDuration"
      ]
    },
    {
      label: localize(`${MODULE_ID}.group.netrunnerHustles`),
      description: localize(`${MODULE_ID}.group.netrunnerHustlesHelp`),
      tableKeys: [
        "netrunnerHustleChart",
        "netrunnerWhatWentWrong",
        "netrunnerTroubleNow",
        "netrunnerOpportunity"
      ]
    },
    {
      label: localize(`${MODULE_ID}.group.cityEncounters`),
      description: localize(`${MODULE_ID}.group.cityEncountersHelp`),
      tableKeys: [
        "cityDayType",
        "cityNightType",
        "cityNonViolent",
        "cityViolent",
        "cityEnvironmental"
      ]
    }
  ].concat(FUTURE_TABLE_GROUPS.map((group) => ({
    label: group.label,
    description: group.description,
    tableKeys: group.tableKeys,
    empty: group.tableKeys.length === 0
  })));
}
function localizedCategoryLabel(key) {
  return localize(CATEGORY_CHOICES[key]);
}
async function getSystemCompendiumDocs(compendiumId) {
  const pack = game.packs.get(compendiumId);
  if (!pack)
    return [];
  return pack.getDocuments();
}
async function getOrCreateFolder(name, parentFolder = null) {
  const parentId = parentFolder?.id ?? null;
  const existing = game.folders.find((folder) => folder.name === name && folder.type === "RollTable" && (folder.folder?.id ?? null) === parentId);
  if (existing)
    return existing;
  return Folder.create({ name, type: "RollTable", folder: parentId });
}

class CPRRolltableDashboard extends FormApplication {
  constructor(object = {}, options = {}) {
    super(object, options);
    this._tableChoices = null;
    this._merchantCache = null;
    this._lastResult = null;
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
      classes: super.defaultOptions.classes.concat([MODULE_ID])
    });
  }
  static showApp() {
    if (!this._instance)
      this._instance = new CPRRolltableDashboard;
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
        tables: group.tableKeys.map((tableKey) => ({ key: tableKey, name: DATATERM_TABLES[tableKey].name, formula: DATATERM_TABLES[tableKey].formula }))
      }))
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
    html.find(".js-generate-netrunner-hustle").click(() => this._generateNetrunnerHustle(html.find("[name='netrunnerRankBand']").val()));
    html.find(".js-roll-bundled-table").click((event) => this._rollBundledTable(event.currentTarget.dataset.tableKey));
    if (!game.user.isGM)
      return;
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
    if (!tabName)
      return;
    this._activeTab = tabName;
    html.find(".cpr-dashboard-tabs .item").removeClass("active");
    html.find(`.cpr-dashboard-tabs .item[data-tab="${tabName}"]`).addClass("active");
    html.find(".cpr-dashboard-body .tab").removeClass("active");
    html.find(`.cpr-dashboard-body .tab[data-tab="${tabName}"]`).addClass("active");
  }
  async _getTableChoices() {
    if (this._tableChoices)
      return this._tableChoices;
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
    if (!postToChat)
      return;
    const content = [`<h2>${title}</h2>`, "<ul>"].concat(lines.map((line) => `<li>${line}</li>`)).concat(["</ul>"]).join("");
    await ChatMessage.create({
      content,
      speaker: ChatMessage.getSpeaker({ alias: title })
    });
  }
  _renderResultPanel() {
    if (!this.rendered || !this.element?.length)
      return;
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
    if (!table)
      return;
    const draw = await table.draw({ displayChat: false });
    await this._publishResult(DATATERM_TABLES[tableKey].name, (draw.results || []).map((result) => result.text));
  }
  async _generateEncounter(period) {
    const typeResult = this._rollInlineTable(period === "day" ? DATATERM_TABLES.cityDayType : DATATERM_TABLES.cityNightType).text;
    let encounterTable = DATATERM_TABLES.cityViolent;
    if (typeResult === "Non-Violent")
      encounterTable = DATATERM_TABLES.cityNonViolent;
    if (typeResult === "Environmental")
      encounterTable = DATATERM_TABLES.cityEnvironmental;
    await this._publishResult(localize(`${MODULE_ID}.encounter.title`), [
      `${localize(`${MODULE_ID}.period.label`)}: ${localize(PERIOD_CHOICES[period])}`,
      `${localize(`${MODULE_ID}.encounter.type`)}: ${typeResult}`,
      this._rollInlineTable(encounterTable).text
    ]);
  }
  async _generateNetrunnerHustle(rankBand) {
    const hustle = NETRUNNER_HUSTLES[(await this._rollFormula("1d10")).total - 1];
    const complicationRoll = await this._rollFormula("1d6");
    const lines = [
      `${localize(`${MODULE_ID}.rank.label`)}: ${localize(RANK_CHOICES[rankBand])}`,
      `${localize(`${MODULE_ID}.hustle.result`)}: ${hustle.text}`,
      `${localize(`${MODULE_ID}.hustle.pay`)}: ${hustle.pay[rankBand]} eb`
    ];
    if (hustle.complicationOn && complicationRoll.total <= hustle.complicationOn) {
      lines.push(`${localize(`${MODULE_ID}.hustle.complication`)}: ${this._rollInlineTable(DATATERM_TABLES.netrunnerWhatWentWrong).text}`, `${localize(`${MODULE_ID}.hustle.trouble`)}: ${this._rollInlineTable(DATATERM_TABLES.netrunnerTroubleNow).text}`, `${localize(`${MODULE_ID}.hustle.opportunity`)}: ${this._rollInlineTable(DATATERM_TABLES.netrunnerOpportunity).text}`);
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
      await this._generateMerchantInventory(secondCategory)
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
          `${localize(`${MODULE_ID}.nightMarket.itemCount`)}: ${merchant.count}`
        ];
        merchant.items.forEach((item) => lines.push(`- ${item.name} (${item.price} eb)`));
        return lines;
      })
    ]);
  }
  async _generateMerchantChat(category) {
    const merchant = await this._generateMerchantInventory(category);
    await this._publishResult(localize(`${MODULE_ID}.nightMarket.merchantTitle`), [
      `${localize(`${MODULE_ID}.nightMarket.merchantCategory`)}: ${merchant.categoryLabel}`,
      `${localize(`${MODULE_ID}.nightMarket.itemCount`)}: ${merchant.count}`,
      ...merchant.items.map((item) => `- ${item.name} (${item.price} eb)`)
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
        price: item.system?.price?.market ?? "?"
      }))
    };
  }
  async _getMerchantPool(categoryKey) {
    if (!this._merchantCache)
      this._merchantCache = await this._buildMerchantCache();
    return this._merchantCache[categoryKey] || [];
  }
  async _buildMerchantCache() {
    const [gear, weapons, armor, cyberware, clothing, drugs] = await Promise.all([
      getSystemCompendiumDocs("cyberpunk-red-core.core_gear"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_weapons"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_armor"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_cyberware"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_clothing"),
      getSystemCompendiumDocs("cyberpunk-red-core.core_drugs")
    ]);
    return {
      foodAndDrugs: [...drugs, ...gear.filter((item) => FOOD_GEAR_NAMES.includes(item.name))],
      personalElectronics: gear.filter((item) => item.system?.isElectronic === true),
      weaponsAndArmor: [...weapons, ...armor],
      cyberware: [
        ...cyberware,
        ...gear.filter((item) => CYBER_GEAR_MATCHERS.some((matcher) => item.name.toLowerCase().includes(matcher)))
      ],
      clothingAndFashionware: [...clothing, ...cyberware.filter((item) => item.system?.type === "fashionware")],
      survivalGear: gear.filter((item) => {
        if (FOOD_GEAR_NAMES.includes(item.name))
          return false;
        if (item.system?.isElectronic === true)
          return false;
        return !CYBER_GEAR_MATCHERS.some((matcher) => item.name.toLowerCase().includes(matcher));
      })
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
      if (existing)
        continue;
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
          documentId: null
        }))
      });
      created += 1;
    }
    notify("notify", created > 0 ? `${MODULE_ID}.import.success` : `${MODULE_ID}.import.alreadyExists`);
    this._lastResult = {
      title: localize(`${MODULE_ID}.import.resultTitle`),
      timestamp: new Date().toLocaleTimeString(),
      lines: [localize(created > 0 ? `${MODULE_ID}.import.success` : `${MODULE_ID}.import.alreadyExists`)]
    };
    this._tableChoices = null;
    this.render(true);
  }
  async _ensureBundledTable(tableKey) {
    const name = DATATERM_TABLES[tableKey].name;
    let table = game.tables.find((entry) => entry.name === name);
    if (table)
      return table;
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
      steps: [{ label: localize(`${MODULE_ID}.customChain.step`), tableUuid: "", repeatMode: "once", repeatValue: 1 }]
    });
    await game.settings.set(MODULE_ID, CHAIN_SETTING, chains);
    this.render(true);
  }
  async _addStep(chainId) {
    const chains = deepClone(game.settings.get(MODULE_ID, CHAIN_SETTING) || []);
    const chain = chains.find((entry) => entry.id === chainId);
    if (!chain)
      return;
    chain.steps.push({ label: localize(`${MODULE_ID}.customChain.step`), tableUuid: "", repeatMode: "once", repeatValue: 1 });
    await game.settings.set(MODULE_ID, CHAIN_SETTING, chains);
    this.render(true);
  }
  async _removeStep(chainId, stepIndex) {
    const chains = deepClone(game.settings.get(MODULE_ID, CHAIN_SETTING) || []);
    const chain = chains.find((entry) => entry.id === chainId);
    if (!chain)
      return;
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
    if (index === -1)
      return;
    const parsed = this._readChain(chainId);
    if (!parsed)
      return;
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
    if (!chainElement)
      return null;
    return {
      id: chainId,
      name: chainElement.querySelector("[name='chain-name']")?.value?.trim() || localize(`${MODULE_ID}.customChain.newName`),
      category: chainElement.querySelector("[name='chain-category']")?.value?.trim() || "",
      steps: Array.from(chainElement.querySelectorAll(".cpr-chain-step")).map((stepElement) => ({
        label: stepElement.querySelector("[name='step-label']")?.value?.trim() || localize(`${MODULE_ID}.customChain.step`),
        tableUuid: stepElement.querySelector("[name='step-table-uuid']")?.value || "",
        repeatMode: stepElement.querySelector("[name='step-repeat-mode']")?.value || "once",
        repeatValue: Number(stepElement.querySelector("[name='step-repeat-value']")?.value || 1)
      }))
    };
  }
  async _runChain(chainId) {
    const chain = this._readChain(chainId);
    if (!chain)
      return;
    const lines = [];
    let previousNumeric = 1;
    for (const step of chain.steps) {
      if (!step.tableUuid)
        continue;
      const table = await fromUuid(step.tableUuid);
      if (!table) {
        lines.push(`${step.label}: ${localize(`${MODULE_ID}.error.missingTable`)}`);
        continue;
      }
      let repeatCount = 1;
      if (step.repeatMode === "fixed")
        repeatCount = Math.max(1, Number(step.repeatValue) || 1);
      if (step.repeatMode === "previousNumeric")
        repeatCount = Math.max(1, previousNumeric || 1);
      const rolled = [];
      for (let i = 0;i < repeatCount; i += 1) {
        const draw = await table.draw({ displayChat: false });
        const [result] = draw.results || [];
        if (!result)
          continue;
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
    if (match)
      return Number(match[0]);
    if (Array.isArray(result.range) && result.range.length > 0)
      return Number(result.range[0]) || fallback;
    return fallback;
  }
}
function registerRolltableDashboard() {
  game.settings.register(MODULE_ID, CHAIN_SETTING, {
    scope: "world",
    config: false,
    type: Array,
    default: []
  });
  Hooks.on("getSceneControlButtons", (controls) => {
    const tokenControls = controls.find((control) => control.name === "token");
    if (!tokenControls)
      return;
    if (tokenControls.tools.find((tool) => tool.name === MODULE_ID))
      return;
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
      }
    });
  });
}

// scripts/module-v0-2-2.js
Hooks.once("init", () => {
  registerRolltableDashboard();
});
