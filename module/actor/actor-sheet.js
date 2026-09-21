/**
 * Extend the basic ActorSheet for all HoMM3 actor types.
 * @extends {ActorSheet}
 */
const TextEditorClass = foundry.applications?.ux?.TextEditor ?? globalThis.TextEditor;

export class HoMMActorSheet extends ActorSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["homm3rpg", "sheet", "actor"],
            template: "systems/homm3rpg/templates/actor/character-sheet.html",
            width: 860,
            height: 900,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "equipment"
                }
            ]
        });
    }

    get template() {
        const path = "systems/homm3rpg/templates/actor";
        return `${path}/${this.actor.type}-sheet.html`;
    }

    async getData() {
        const context = await super.getData();
        context.enrichedBiography = await TextEditorClass.enrichHTML(context.system.biography ?? "");
        context.enrichedTalents = await TextEditorClass.enrichHTML(context.system.talents ?? "");
        context.enrichedResources = await TextEditorClass.enrichHTML(context.system.resources ?? "");
        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (!this.options.editable) return;

        html.find(".rollable").on("click", this._onRoll.bind(this));

        html.find(".item-edit").click(ev => {
            const li = $(ev.currentTarget).parents(".item")[0];
            const item = this.actor.items.get(li.dataset.itemId);
            item.sheet.render(true);
        });

        html.find(".item-delete").click(ev => {
            const li = $(ev.currentTarget).parents(".item")[0];
            this.actor.deleteEmbeddedDocuments("Item", [li.dataset.itemId]);
        });

        html.find(".item-create").click(this._onItemCreate.bind(this));
    }

    _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        const type = header.dataset.type;
        const itemData = {
            name: game.i18n.localize("HOMM.newItem"),
            type: type,
            system: { slot: header.dataset.slot || "miscellaneous" }
        };
        return this.actor.createEmbeddedDocuments("Item", [itemData]);
    }

    _onRoll(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;

        if (!dataset.roll) return;

        const roll = new Roll(dataset.roll, this.actor.getRollData());
        const label = dataset.label || "";
        roll.roll().then(result => {
            const messageData = {
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor: label,
                content: `<div class="dice-roll"><h4 class="dice-total">${result.total}</h4></div>`
            };
            result.toMessage(messageData);
        });
    }
}
