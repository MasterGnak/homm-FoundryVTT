/**
 * Extend the base Actor with HoMM3-specific preparation.
 * @extends {Actor}
 */
export class HoMMActor extends Actor {
    prepareData() {
        super.prepareData();
        if (this.type === "character") this._prepareCharacterData();
    }

    _prepareCharacterData() {
        const system = this.system;

        // total CV bonus from equipped gear
        system.gearBonus = this.items
            .filter(item => item.type === "gear" && item.system.equipped)
            .reduce((acc, item) => acc + (item.system.combatValueBonus || 0), 0);
    }
}
