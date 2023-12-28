export function parameterFormation(result) {
    let enSum = result[1].reduce(function (sum, en) {
        return sum + en;
    }, 0);
    let weightSum = result[2].reduce(function (sum, weight) {
        return sum + weight;
    }, 0);
    let parameter = {
        "EN負荷": enSum,
        "ジェネレータ出力": parseInt(result[0][10]["EN出力"] * (result[0][5]["ジェネレータ出力補正"] / 100)),
        "総重量": weightSum,
        "脚部積載重量": result[0][7]["積載上限"],
        "武器総重量": result[2][0] + result[2][1],
        "腕部積載重量": result[0][6]["腕部積載上限"],
    }
    return parameter;
}