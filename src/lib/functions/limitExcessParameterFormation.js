export function limitExcessParameterFormation(result) {
    let limitExcess = []
    for (let i = 0; i < Object.values(result).length; i++) {
        if(i % 2 == 0){
            if(Object.values(result)[i]>Object.values(result)[i+1]){
                limitExcess.push(true)
            }else{
                limitExcess.push(false)
            }
        }
    }
    return limitExcess;
}