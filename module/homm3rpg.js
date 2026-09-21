// HoMM3 RPG system entry point
import { HoMMActor } from "./actor/actor.js";
import { HoMMActorSheet } from "./actor/actor-sheet.js";
import { HoMMItem } from "./item/item.js";
import { HoMMItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function () {
    game.homm3rpg = {
        apps: {
            HoMMActorSheet,
            HoMMItemSheet
        },
        entities: {
            HoMMActor,
            HoMMItem
        }
    };

    CONFIG.Actor.documentClass = HoMMActor;
    CONFIG.Item.documentClass = HoMMItem;

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("homm3rpg", HoMMActorSheet, {
        makeDefault: true,
        label: "HOMM.sheets.actor"
    });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("homm3rpg", HoMMItemSheet, {
        makeDefault: true,
        label: "HOMM.sheets.item"
    });

    Handlebars.registerHelper('concat', function () {
        let outStr = '';
        for (const arg in arguments) {
            if (typeof arguments[arg] != 'object') {
                outStr += arguments[arg];
            }
        }
        return outStr;
    });

    Handlebars.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });
});
