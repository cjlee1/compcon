import EncounterBase, { EncounterBaseNPC } from './EncounterBase'
import newId from './newId'
import NPC from './NPC'

export interface IActiveEncounterData {
  id: string
  name: string
  notes: string
  npcs: any[]
}

export class ActiveNPC {
  id: string
  name: string
  baseNPC: NPC
  hp: number
  heat: number
  structure: number
  stress: number
  destroyed: boolean
  static baseStatuses: { name: string }[] = require('lancer-data').statuses
  statuses: string[]

  constructor(npc: EncounterBaseNPC) {
    this.id = newId()
    this.name = npc.name
    this.baseNPC = npc.npc
    const { stats } = this.baseNPC
    this.hp = stats.hp
    this.heat = 0
    this.structure = stats.structure
    this.stress = 0
    this.destroyed = false
    this.statuses = []
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      npc: this.baseNPC.serialize(),
      hp: this.hp,
      heat: this.heat,
      structure: this.structure,
      stress: this.stress,
      destroyed: this.destroyed,
      statuses: this.statuses,
    }
  }

  static deserialize(obj: ReturnType<ActiveNPC['serialize']>) {
    const baseNPC = NPC.deserialize(obj.npc)
    const activeNPC = new ActiveNPC({
      id: '',
      name: '',
      count: 1,
      npc: baseNPC,
    })
    if (obj.id) activeNPC.id = obj.id
    activeNPC.name = obj.name || baseNPC.name || 'unnamed'
    activeNPC.hp = obj.hp
    activeNPC.heat = obj.heat
    activeNPC.structure = obj.structure
    activeNPC.stress = obj.stress
    activeNPC.destroyed = obj.destroyed
    activeNPC.statuses = obj.statuses
    return activeNPC
  }
}

export default class ActiveEncounter {
  id: string = newId()
  name: string
  notes: string
  npcs: ActiveNPC[]

  constructor()
  constructor(enc: EncounterBase) {
    this.name = enc.name
    this.notes = enc.notes
    this.npcs = enc.npcs.map(npc => new ActiveNPC(npc))
  }

  serialize(): IActiveEncounterData {
    return {
      id: this.id,
      name: this.name,
      notes: this.notes,
      npcs: this.npcs.map(npc => npc.serialize()),
    }
  }

  static deserialize(enc: IActiveEncounterData) {
    activeEnc.name = enc.name
    activeEnc.notes = enc.notes
    if (enc instanceof EncounterBase) {
      activeEnc.npcs = enc.npcs.map(npc => new ActiveNPC(npc))
    } else {
      activeEnc.npcs = enc.npcs.map(n => ActiveNPC.deserialize(n))
      activeEnc.id = enc.id
    }
  }
}
