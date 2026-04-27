/* eslint-disable max-len */

import { DESKTOP_ROLLTABLES, DESKTOP_TABLE_GROUPS } from "./desktop-rolltables.js";

export const DATATERM_TABLES = {
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
      { range: [6, 6], text: "A corp representative making \"off the book\" purchases." },
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
      { range: [3, 3], text: "A legitimate businessman doing business \"off the books\"." },
      { range: [4, 4], text: "A corp officer or worker who is selling \"lost\" items." },
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
  },
  ...DESKTOP_ROLLTABLES
};

export const FUTURE_TABLE_GROUPS = DESKTOP_TABLE_GROUPS;

export const NETRUNNER_HUSTLES = [
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

export const FOOD_GEAR_NAMES = ["Food Stick", "Kibble Pack", "MRE"];
export const CYBER_GEAR_MATCHERS = ["cyberdeck", "smart glasses", "battleglove", "linear frame"];
