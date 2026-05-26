export type GuideSource = {
  id: string
  label: string
  url: string
}

export const guideSources: GuideSource[] = [
  {
    "id": "S1",
    "label": "PoE2DB - Version 0.5.0 / The Runes of Aldur",
    "url": "https://poe2db.tw/us/Version_0.5.0"
  },
  {
    "id": "S2",
    "label": "PoE2DB - Shaman Ascendancy",
    "url": "https://poe2db.tw/us/Shaman"
  },
  {
    "id": "S3",
    "label": "PoE2DB - Lunar Assault",
    "url": "https://poe2db.tw/us/Lunar_Assault"
  },
  {
    "id": "S4",
    "label": "PoE2DB - Lunar Blessing",
    "url": "https://poe2db.tw/us/Lunar_Blessing"
  },
  {
    "id": "S5",
    "label": "PoE2DB - Shred",
    "url": "https://poe2db.tw/us/Shred"
  },
  {
    "id": "S6",
    "label": "PoE2DB - Cross Slash",
    "url": "https://poe2db.tw/us/Cross_Slash"
  },
  {
    "id": "S7",
    "label": "PoE2DB - Pounce",
    "url": "https://poe2db.tw/us/Pounce"
  },
  {
    "id": "S8",
    "label": "PoE2DB - Feral Invocation",
    "url": "https://poe2db.tw/us/Feral_Invocation"
  },
  {
    "id": "S9",
    "label": "PoE2DB - Savage Fury",
    "url": "https://poe2db.tw/us/Savage_Fury"
  },
  {
    "id": "S10",
    "label": "PoE2DB - Overwhelming Presence",
    "url": "https://poe2db.tw/us/Overwhelming_Presence"
  },
  {
    "id": "S11",
    "label": "PoE2DB - Herald of Ice",
    "url": "https://poe2db.tw/us/Herald_of_Ice"
  },
  {
    "id": "S12",
    "label": "PoE2DB - Talismans",
    "url": "https://poe2db.tw/us/Talismans"
  },
  {
    "id": "S13",
    "label": "PoE2DB - Support Gems",
    "url": "https://poe2db.tw/us/Support_Gems"
  },
  {
    "id": "S14",
    "label": "PoE2DB - Lineage Supports",
    "url": "https://poe2db.tw/us/Lineage_Supports"
  },
  {
    "id": "S15",
    "label": "PoE2DB - Jewels and unique jewels",
    "url": "https://poe2db.tw/us/Jewels"
  },
  {
    "id": "S16",
    "label": "PoE2DB - Notable passive database",
    "url": "https://poe2db.tw/us/Notable"
  },
  {
    "id": "S17",
    "label": "PoE2DB - Passive Skill Tree 0.5 planner",
    "url": "https://poe2db.tw/th/passive-skill-tree/"
  }
]

export const sourceById = Object.fromEntries(
  guideSources.map((source) => [source.id, source]),
) as Record<string, GuideSource>
