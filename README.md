# HoMM3 RPG — FoundryVTT System

Unofficial HoMM3-flavoured RPG system for FoundryVTT v12+, with editable sheets built from the HoMM3 RPG character list PDF.

## Sheets

- **Character** (`Actor.type = "character"`) — identity (name, class, origin, lineage, alignment, motivation, level), 4 attributes, 8 traits, 10 skills, vitality/injuries/range/EXP/spell points, talents & resources (rich text), equipment slots, gear list, spellbook table, biography.
- **Companion** (`Actor.type = "companion"`) — name, alignment, combat value, range, vitality, casualties, gear, qualities, special abilities.
- **Unit** (`Actor.type = "unit"`) — army-block stats: type, alignment, moniker, army points, unit size, attack, range, defense, combat value, vitality, casualties, gear, qualities, special abilities.

## Items

- **Gear** — slot dropdown, equipped flag, CV/attack/defense/range bonuses. Equipped gear CV bonuses sum into the character's `system.gearBonus`.
- **Spell** — school, level (1–5), cost, range, effects.

Attributes and traits are clickable rollers (`1d20 + value`).

## Install

Copy/symlink this folder into your Foundry `systems/` directory (or install via manifest URL once hosted), then create actors of the desired type.

## Structure

```
module/homm3rpg.js        entry point; sheet + document registration
module/actor/             actor class + sheet
module/item/              item class + sheet
templates/actor/          character-sheet.html, companion-sheet.html, unit-sheet.html
templates/item/           gear-sheet.html, spell-sheet.html
template.json             data model for all actor/item types
lang/en.json              localization
```

Not affiliated with Ubisoft/New World Computing; for fan use only.
