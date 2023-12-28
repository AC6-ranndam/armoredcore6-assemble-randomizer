import parameterList from "$lib/parts/parameter.json";
export function assemble(option, fixedParts) {
    let enList = [];
    let weightList = [];
    let partsList = [];
    let partsType = [];
    let en = 0;
    let weight = 0;
    const tankParts = parameterList["フレーム"]["脚部"].filter(function (element) {
        return element["脚部カテゴリ"] == "タンク";
    });
    let armLoadingExcess = false;
    let legLoadingExcess = false;
    let allWeaponSameType = false;
    var fixedPartsIndex = 0;
    while (true) {
        let weaponTypeList = { "leftArmUnit": Object.entries(parameterList["武器"]["腕部武装"]), "rightArmUnit": Object.entries(parameterList["武器"]["腕部武装"]).slice(1, 5), "leftBackUnit": Object.entries(parameterList["武器"]["背部武装"]), "rightBackUnit": Object.entries(parameterList["武器"]["背部武装"]).slice(1, 4) }
        Object.keys(weaponTypeList).forEach(function (element) {//左腕→右腕→左肩→右肩
            fixedPartsIndex = Object.keys(weaponTypeList).indexOf(element);
            let weaponParts = [];
            let categoryChoice = 0;
            let partsChoice = 0;
            let partsNames = [];
            let selectedParts;
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
                Object.keys(weaponParts).forEach(function (element) {
                    weaponParts[element][1] = weaponParts[element][1].filter(function (parts) {
                        return parts["パーツ名"] != "NONE";
                    });
                })
            }
            partsNames = weaponParts.map(item => item.name);
            if (Object.keys(fixedParts).length > 0 && fixedParts[fixedPartsIndex] != undefined) {
                categoryChoice = partsNames.indexOf(fixedParts[fixedPartsIndex]);

            } else {
                categoryChoice = Math.floor(Math.random() * weaponParts.length);
                partsChoice = Math.floor(Math.random() * weaponParts[categoryChoice][1].length);

            }
            selectedParts = weaponParts[categoryChoice][1][partsChoice];
            partsList.push(selectedParts);
            enList.push(selectedParts["EN負荷"]);
            weightList.push(selectedParts["重量"]);
            partsType.push(selectedParts["カテゴリー"]);
        });
        Object.keys(parameterList["フレーム"]).forEach(function (element) {
            fixedPartsIndex = Object.keys(parameterList["フレーム"]).indexOf(element);
            let frameParts = [];
            let partsNames = [];
            let choice = 0;
            let selectedParts;
            frameParts = parameterList["フレーム"][element];
            partsNames = frameParts.map(item => item.name);
            if (Object.keys(fixedParts).length > 0 && fixedParts[fixedPartsIndex + 4] != undefined) {
                choice = partsNames.indexOf(fixedParts[fixedPartsIndex + 4]);
            } else {
                choice = Math.floor(Math.random() * frameParts.length);
            }
            selectedParts = frameParts[choice];
            partsList.push(selectedParts);
            enList.push(selectedParts["EN負荷"]);
            weightList.push(selectedParts["重量"]);
            if("脚部カテゴリ" in selectedParts){
                partsType.push(selectedParts["脚部カテゴリ"]);
            }
        });
        Object.keys(parameterList["内装"]).forEach(function (element) {
            //fixedPartsIndex = Object.keys(parameterList["内装"].indexOf(element));
            let innerParts = [];
            let partsNames = [];
            let choice = 0;
            let selectedParts;
            innerParts = parameterList["内装"][element];
            if (element == "ブースター") {
                innerParts = parameterList["内装"][element].slice(0, parameterList["内装"][element].length - 1);
            }
            if (Object.keys(fixedParts).length > 0 && fixedParts[fixedPartsIndex + 4] != undefined) {
                choice = partsNames.indexOf(fixedParts[fixedPartsIndex + 4]);
            } else {
                choice = Math.floor(Math.random() * innerParts.length);
            }
            selectedParts = innerParts[choice];
            partsList.push(selectedParts);
            if (element != "ジェネレータ") {
                enList.push(selectedParts["EN負荷"]);
            }
            weightList.push(selectedParts["重量"]);

        })
        if (tankParts.some(element => element == partsList[7])) {
            enList[8] = 0
            weightList[8] = 0
            partsList[8] = parameterList["内装"]["ブースター"][12]
        }
        let extendedFunction = [];
        let choice = 0;
        let selectedParts;
        extendedFunction = parameterList["拡張機能"]
        if (option["extendedFunctionNonePermit"] !== true) {
            extendedFunction = extendedFunction.filter(function (parts) {
                return parts["パーツ名"] != "NONE";
            });
        }
        choice = Math.floor(Math.random()*extendedFunction.length);
        selectedParts = parameterList["拡張機能"][choice]
        partsList.push(selectedParts);
        en = enList.reduce(function (sum, element) {
            return sum + element;
        }, 0);
        weight = weightList.reduce(function (sum, element) {
            return sum + element;
        }, 0);
        legLoadingExcess = weight <= partsList[7]["積載上限"]
        armLoadingExcess = (weightList[0] + weightList[1]) <= partsList[6]["腕部積載上限"]
        allWeaponSameType = partsList.slice(0,4).every(element => element === partsList[0])
        if (en <= partsList[10]["EN出力"] * (partsList[5]["ジェネレータ出力補正"] / 100) && (legLoadingExcess || option["permitExcessLegWeight"]) && (armLoadingExcess || option["permitExcessArmWeight"]) && !(allWeaponSameType)) {
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
