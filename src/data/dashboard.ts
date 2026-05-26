export type DashboardModule = {
  id: string
  label: string
  title: string
  summary: string
  pageRefs: number[]
}

export type ChecklistItem = {
  id: string
  label: string
  detail: string
  pageRef: number
}

export const dashboardModules: DashboardModule[] = [
  {
    id: 'overview',
    label: 'Dashboard',
    title: 'ภาพรวมบิลด์',
    summary:
      'เล่นเป็น Shaman self-hit Werewolf ที่ใช้ Lunar Assault เป็นปุ่มหลัก, Freeze เพื่อคุมแพ็ก, แล้วปิดงานด้วย Shred + Cross Slash และ Feral Invocation',
    pageRefs: [1, 2, 34],
  },
  {
    id: 'checklist',
    label: 'Checklist',
    title: 'เช็กบิลด์ตัวเอง',
    summary:
      'ใช้เป็นรายการตรวจของจริงก่อนเข้า endgame: อาวุธ, Spirit, Freeze, Rage, defense, jewels และ payoff loop',
    pageRefs: [6, 7, 33],
  },
  {
    id: 'skills',
    label: 'Skill Setup',
    title: 'ชุดสกิลหลัก',
    summary:
      'แกนหลักคือ Lunar Assault, Lunar Blessing, Shred, Cross Slash, Pounce, Feral Invocation และ aura/spirit package',
    pageRefs: [2, 9, 10, 11],
  },
  {
    id: 'spirit',
    label: 'Spirit',
    title: 'Spirit package',
    summary:
      'จัดลำดับ Spirit ให้ core package ทำงานก่อน Wolf Pack โดยมีเป้าหมายใช้งานจริงราว 120 และดันไป 150 เมื่อของพร้อม',
    pageRefs: [12, 13, 14],
  },
  {
    id: 'gear',
    label: 'Gear',
    title: 'ของและการคราฟต์',
    summary:
      'Talisman two-handed melee เป็นอาวุธหลัก เน้น pDPS, attack speed, extra cold และช่องทางเสริมจาก jewels/crafting',
    pageRefs: [18, 19, 20, 21, 22],
  },
  {
    id: 'rotation',
    label: 'Rotation',
    title: 'จังหวะเล่น',
    summary:
      'เข้าแพ็กด้วย Pounce/positioning, ปาดด้วย Lunar Assault, สร้าง fragment เมื่อศัตรู Frozen, แล้วปิด rare ด้วย Cross Slash',
    pageRefs: [24, 25, 26],
  },
  {
    id: 'trouble',
    label: 'Troubleshoot',
    title: 'แก้ปัญหาบิลด์',
    summary:
      'ถ้าดาเมจไม่มา, freeze ไม่ติด, Spirit ไม่พอ หรือยืนไม่ไหว ให้ไล่เช็กตามอาการแทนการเปลี่ยนบิลด์ทั้งชุด',
    pageRefs: [29, 30, 31, 32],
  },
  {
    id: 'sources',
    label: 'Sources',
    title: 'แหล่งอ้างอิง',
    summary:
      'ตัวเลขและ mechanic ที่เสริมจาก PDF ผูกกับ PoE2DB เท่านั้น ส่วนคำแนะนำยังคงเป็น Build Decision ตามคู่มือเดิม',
    pageRefs: [35],
  },
]

export const checklistItems: ChecklistItem[] = [
  {
    id: 'weapon',
    label: 'Talisman อัปเกรดจริง',
    detail: 'pDPS สูงกว่าเดิมชัดเจน, attack speed ดี และมีอย่างน้อย 1 stat เสริม damage',
    pageRef: 33,
  },
  {
    id: 'rage',
    label: 'Rage uptime ไม่หลุด',
    detail: 'Lunar Blessing กดแล้วจังหวะ rare/boss pack ไม่ขาดช่วง',
    pageRef: 33,
  },
  {
    id: 'freeze',
    label: 'Freeze ใช้งานได้จริง',
    detail: 'Lunar Assault ทำให้ rare ทั่วไป Frozen/Chilled ได้สม่ำเสมอ',
    pageRef: 33,
  },
  {
    id: 'payoff',
    label: 'Fragment payoff เห็นผล',
    detail: 'Shred -> Cross Slash ทำให้ rare หายหรือเลือดหายก้อนใหญ่',
    pageRef: 33,
  },
  {
    id: 'spirit',
    label: 'Spirit core package เปิดครบ',
    detail: 'อย่างน้อย 120 Spirit และเป้าหมาย 150 Spirit เมื่อเข้าสู่ endgame',
    pageRef: 33,
  },
  {
    id: 'defense',
    label: 'Defense ไม่บางเกินไป',
    detail: 'res capped, life ไม่ต่ำ และมี layer จาก Shaman/Runic Ward/gear',
    pageRef: 33,
  },
  {
    id: 'jewels',
    label: 'Jewels ให้ค่าจริง',
    detail: 'มี jewel socket ที่เพิ่ม damage, Spirit หรือ life แทนการใส่ของตามชื่อเฉยๆ',
    pageRef: 33,
  },
]

export const rotationSteps = [
  'เปิดจังหวะด้วย Pounce หรือเดินเข้ามุมที่ปลอดภัย',
  'ใช้ Lunar Assault เป็นปุ่ม clear หลักเพื่อสร้าง cold/freeze pressure',
  'เมื่อศัตรู Frozen ให้ใช้ Shred เพื่อสร้าง Ice Fragments',
  'ปิด rare หรือ pack หนาด้วย Cross Slash เพื่อดึง fragment มาระเบิด',
  'ใช้ Lunar Blessing, Savage Fury และ Feral Invocation เป็น burst window',
]

