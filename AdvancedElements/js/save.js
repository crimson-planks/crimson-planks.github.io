var decimalKeys=["mantissa", "exponent"];

function convertToStringifiable(object){
    if(object==null) return object;
    if(arrayOfTypes.includes(typeof(object))){
        return object;
    }
    if(new Decimal().constructor == object.constructor){
        return {mantissa: object.mantissa,exponent: object.exponent};
    }
    if(typeof(object)==typeof({})){
        let returnObject={};
        for(key in object){
            returnObject[key]=convertToStringifiable(object[key]);
        }
        return returnObject;
    }
    else if(typeof(object)==typeof([])){
        let returnArray=object.map(convertToStringifiable);
        return returnArray;
    }
}

function convertToDecimal(object){
    if(object==null) return object;
    if(arrayOfTypes.includes(typeof(object))){
        return object;
    }
    if(decimalKeys == Object.keys(object)){
        return new Decimal(""+object.mantissa+"e"+object.exponent);
    }
    if(typeof(object)==typeof({})){
        let returnObject={};
        for(key in object){
            returnObject[key]=convertToStringifiable(object[key]);
        }
        return returnObject;
    }
    else if(typeof(object)==typeof([])){
        let returnArray=object.map(convertToStringifiable);
        return returnArray;
    }
}
function save(){
    let stringifiableObject=convertToStringifiable(player);
    let saveString=JSON.stringify(player);
    //console.log(saveString);
    localStorage.setItem("save",saveString);
}
function load(){
    player = JSON.parse(localStorage.getItem("save"));
}