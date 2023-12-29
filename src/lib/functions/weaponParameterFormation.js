export function weaponParameterFormation(parameterList) {
    let armweaponListExcludedPartialNONE = JSON.parse(JSON.stringify(Object.values(parameterList["武器"]["腕部武装"]).map(element => element)))
    armweaponListExcludedPartialNONE[1].shift()//実弾武器の中に存在する"NONE"を除去
    let armweaponListExcludedNONE = JSON.parse(JSON.stringify(armweaponListExcludedPartialNONE))
    armweaponListExcludedNONE[0].shift()//実弾武器の中に存在する"NONE"を除去
    let backweaponListExcludedPartialNONE = JSON.parse(JSON.stringify(Object.values(parameterList["武器"]["背部武装"]).map(element => element)))
    backweaponListExcludedPartialNONE[1].shift()//シールドの中に存在する"NONE"を除去
    let weaponFormationedParameter = [Object.values(parameterList["武器"]["腕部武装"]).slice(1, 5).flat(),armweaponListExcludedPartialNONE.flat(),(Object.values(parameterList["武器"]["背部武装"]).slice(1, 4).flat()).concat(armweaponListExcludedPartialNONE.slice(1, 5).flat()), backweaponListExcludedPartialNONE.flat().concat(armweaponListExcludedNONE).flat()]
    return weaponFormationedParameter;
}