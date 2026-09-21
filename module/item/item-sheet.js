/**
 * Extend the basic ItemSheet for gear and spells.
 * @extends {ItemSheet}
 */
const TextEditorClass = foundry.applications?.ux?.TextEditor ?? globalThis.TextEditor;

export class HoMMItemSheet extends ItemSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["homm3rpg", "sheet", "item"],
            width: 520,
            height: 480
        });
    }

    get template() {
        const path = "systems/homm3rpg/templates/item";
        return `${path}/${this.item.type}-sheet.html`;
    }

    async getData() {
        const context = await super.getData();
        context.system = context.item.system;
        context.enrichedDescription = await TextEditorClass.enrichHTML(context.system.description ?? "", { async: true });
        return context;
    }
}
