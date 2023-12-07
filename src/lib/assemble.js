import frame from "$lib/parts/frame.json";
import weapon from "$lib/parts/weapon.json";
export function assemble(option, fixedParts) {
    let en = 0;
    let weight = 0;
    let partsList = [];
    let partsType = [];
    const tankParts = ["LG-022T BORNEMISSZA", "VE-42B", "EL-TL-11 FORTALEZA"]
    const partsTypeIndex = Object.keys(Object.assign(frame,weapon));
    var fixedPartsIndex = 0;
    while (true) {
        Object.keys(weapon).forEach(function (element) {//右腕→左腕→右肩→左肩
            fixedPartsIndex = Object.keys(weapon).indexOf(element);
            let weaponParts = [];
            let choice = 0;
            let partsNames = [];
            if (option["hangerWeaponRate"] > 0) {
                if (Math.floor(Math.random() * 101) <= option["hangerWeaponRate"] && element.includes("shoulder")) {
                    if (element.includes("double")) {
                        weaponParts = weapon["double-hand-weapon"].concat(weapon["double-shoulder-weapon"])
                    } else {
                        weaponParts = weapon["hand-weapon"].concat(weapon["shoulder-weapon"])
                    }
                } else {
                    weaponParts = weapon[element];
                }
            } else {
                weaponParts = weapon[element];
            }
            if (option["armedNonePermit"] !== true) {
                weaponParts = weaponParts.filter(function (parts) {
                    return parts["name"] != "NONE";
                });
            }
            partsNames = weaponParts.map(item => item.name);
            if (Object.keys(fixedParts).length > 0 && fixedParts[fixedPartsIndex] != undefined) {
                choice = partsNames.indexOf(fixedParts[fixedPartsIndex]);
            } else {
                choice = Math.floor(Math.random() * weaponParts.length);
            }
            partsList.push(weaponParts[choice]);
            en += weaponParts[choice]["en"];
            weight += weaponParts[choice]["weight"];
            partsType.push(element);
        });
        Object.keys(frame).forEach(function (element) {
            fixedPartsIndex = Object.keys(frame).indexOf(element);
            let frameParts = [];
            let partsNames = [];
            let choice = 0;
            if (option["extendedFunctionNonePermit"] !== true) {
                frameParts = frame[element].filter(function (parts) {
                    return parts["name"] != "NONE";
                });
            } else {
                frameParts = frame[element];
            }
            partsNames = frameParts.map(item => item.name);
            if (Object.keys(fixedParts).length > 0 && fixedParts[fixedPartsIndex+4] != undefined) {
                choice = partsNames.indexOf(fixedParts[fixedPartsIndex+4]);
            } else {
                choice = Math.floor(Math.random() * frameParts.length);
            }

            partsList.push(frameParts[choice]);
            en += frameParts[choice]["en"];
            weight += frameParts[choice]["weight"];
            partsType.push(element);
        });
        if (tankParts.some(element => element["name"] == partsList[7]["name"])) {
            en -= partsList[8]["en"]
            weight -= partsList[8]["weight"]
            partsList[8] = frame["booster"][0]
        }
        if (en - partsList[10]["en"] <= partsList[10]["en"] && (weight <= partsList[7]["Loading Limit"] || option["permitExcessWeight"])) {
            break;
        } else {
            partsList = [];
            en = 0;
            weight = 0;
            partsType = [];
        }
    }
    return [partsList, en, weight, partsType];
}
