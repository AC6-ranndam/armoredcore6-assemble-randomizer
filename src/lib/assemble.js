import frame from "$lib/parts/frame.json";
import weapon from "$lib/parts/weapon.json";
export function assemble(option) {
    let en = 0;
    let weight = 0;
    let partsList = [];
    let partsType = [];
    while (true) {
        Object.keys(frame).forEach(function (element) {
            let frameParts = [];
            if (option["extendedFunctionNonePermit"] === true) {
                frameParts = frame[element].filter(function (parts) {
                    return parts["name"] != "NONE";
                });
            } else {
                frameParts = frame[element];
            }
            let choice = Math.floor(Math.random() * frameParts.length);
            partsList.push(frameParts[choice]["name"]);
            en += frameParts[choice]["en"];
            weight += frameParts[choice]["weight"];
            partsType.push(element);
        });
        Object.keys(weapon).forEach(function (element) {//左腕→左肩→右腕→右肩
            let weaponParts = [];
            if (option["armedNonePermit"] === true) {
                weaponParts = weapon[element].filter(function (parts) {
                    return parts["name"] != "NONE";
                });
            } else {
                weaponParts = weapon[element];
            }
            let choice = Math.floor(Math.random() * weaponParts.length);
            if (option["hangerWeaponRate"] > 0) {
                if (Math.floor(Math.random() * 101) < option["hangerWeaponRate"] && element.includes("shoulder")) {
                    if (element.includes("double")) {
                        weaponParts = Object.assign(weaponParts["double-hand-weapon"], weaponParts["double-shoulder-weapon"])
                    } else {
                        weaponParts = Object.assign(weapon["hand-weapon"], weapon["shoulder-weapon"])
                    }
                }
            }
            partsList.push(weaponParts[choice]["name"]);
            en += weaponParts[choice]["en"];
            weight += weaponParts[choice]["weight"];
            partsType.push(element);
        });
        if (en - partsList[4]["en"] <= partsList[4]["en"] && (weight <= partsList[3]["Loading Limit"] || option["permitExcessWeight"])) {
            break;
        } else {
            partsList = [];
            en = 0;
            weight = 0;
            partsType = [];
        }
    }
    return [partsList,en,weight,partsType];
}
