import frame from "$lib/parts/frame.json";
import weapon from "$lib/parts/weapon.json";
import parameter from "$lib/parts/parameter.json";
export function assemble(option, fixedParts) {
    let enList = [];
    let weightList = [];
    let partsList = [];
    let partsType = [];
    let en = 0;
    let weight = 0;
    const tankParts = parameter["フレーム"]["脚部"].filter(function (element) {
        return element["脚部カテゴリ"] == "タンク";
    });
    let armLoadingExcess = false;
    let legLoadingExcess = false;
    var fixedPartsIndex = 0;
    while (true) {
        let weaponTypeList = { "rightArmUnit": Object.values(parameter["武器"]["腕部武装"]), "leftArmUnit": Object.values(parameter["武器"]["腕部武装"]).slice(1, 5), "rightBackUnit": Object.values(parameter["武器"]["背部武装"]), "leftBackUnit": Object.values(parameter["武器"]["背部武装"]).slice(1, 4) }
        Object.keys(weaponTypeList).forEach(function (element) {//右腕→左腕→右肩→左肩
            fixedPartsIndex = Object.keys(weaponTypeList).indexOf(element);
            console.log(element);
            let weaponParts = [];
            let choice = 0;
            let partsNames = [];
            if (option["hangerWeaponRate"] > 0) {
                if (Math.floor(Math.random() * 101) <= option["hangerWeaponRate"] && element.includes("Back")) {
                    if (element.includes("left")) {
                        weaponParts = weaponTypeList["leftArmUnit"]
                    } else {
                        weaponParts = weaponTypeList["rightArmUnit"]
                    }
                } else {
                    weaponParts = weaponTypeList[element];
                }
            } else {
                weaponParts = weaponTypeList[element];
            }
            if (option["armedNonePermit"] !== true) {
            }
            partsNames = weaponParts.map(item => item.name);
            if (Object.keys(fixedParts).length > 0 && fixedParts[fixedPartsIndex] != undefined) {
                choice = partsNames.indexOf(fixedParts[fixedPartsIndex]);
            } else {
                choice = Math.floor(Math.random() * weaponParts.length);
            }
            partsList.push(weaponParts[choice]);
            enList.push(weaponParts[choice]["en"]);
            weightList.push(weaponParts[choice]["weight"]);
            partsType.push(element);
        });
        break
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
            if (Object.keys(fixedParts).length > 0 && fixedParts[fixedPartsIndex + 4] != undefined) {
                choice = partsNames.indexOf(fixedParts[fixedPartsIndex + 4]);
            } else {
                choice = Math.floor(Math.random() * frameParts.length);
            }

            partsList.push(frameParts[choice]);
            enList.push(frameParts[choice]["en"]);
            weightList.push(frameParts[choice]["weight"]);
            partsType.push(element);
        });
        if (tankParts.some(element => element == partsList[7]["name"])) {
            enList[8] = 0
            weightList[8] = 0
            partsList[8] = frame["booster"][0]
        }
        en = enList.reduce(function (sum, element) {
            return sum + element;
        }, 0);
        weight = weightList.reduce(function (sum, element) {
            return sum + element;
        }, 0);
        legLoadingExcess = weight <= partsList[7]["Loading Limit"]
        armLoadingExcess = (weightList[0] + weightList[1]) <= partsList[6]["Loading Limit"]
        console.log(partsList[10]["en"], partsList[5]["outputCorrection"], partsList[10]["en"] * (partsList[5]["outputCorrection"] / 100))
        if (en - partsList[10]["en"] <= partsList[10]["en"] * (partsList[5]["outputCorrection"] / 100) && (legLoadingExcess || option["permitExcessLegWeight"]) && (armLoadingExcess || option["permitExcessArmWeight"])) {
            break;
        } else {
            enList = [];
            weightList = [];
            partsList = [];
            en = 0;
            weight = 0;
            partsType = [];
        }
    }
    return [partsList, enList, weightList, partsType, armLoadingExcess, legLoadingExcess];
}
