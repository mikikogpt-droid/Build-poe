import crossSlash from '../assets/poe2db/cross-slash.webp'
import feralInvocation from '../assets/poe2db/feral-invocation.webp'
import heraldOfIce from '../assets/poe2db/herald-of-ice.webp'
import lunarAssault from '../assets/poe2db/lunar-assault.webp'
import lunarBlessing from '../assets/poe2db/lunar-blessing.webp'
import overwhelmingPresence from '../assets/poe2db/overwhelming-presence.webp'
import pounce from '../assets/poe2db/pounce.webp'
import savageFury from '../assets/poe2db/savage-fury.webp'
import shred from '../assets/poe2db/shred.webp'

export type SkillIcon = {
  name: string
  src: string
  sourceId: string
}

export const skillIcons: SkillIcon[] = [
  { name: 'Lunar Assault', src: lunarAssault, sourceId: 'S3' },
  { name: 'Lunar Blessing', src: lunarBlessing, sourceId: 'S4' },
  { name: 'Shred', src: shred, sourceId: 'S5' },
  { name: 'Cross Slash', src: crossSlash, sourceId: 'S6' },
  { name: 'Pounce', src: pounce, sourceId: 'S7' },
  { name: 'Feral Invocation', src: feralInvocation, sourceId: 'S8' },
  { name: 'Savage Fury', src: savageFury, sourceId: 'S9' },
  { name: 'Overwhelming Presence', src: overwhelmingPresence, sourceId: 'S10' },
  { name: 'Herald of Ice', src: heraldOfIce, sourceId: 'S11' },
]
