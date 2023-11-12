export function load(event){
    console.log(event.locals.myData);
    return{
        query: event.locals.myData["name"]
    };
}