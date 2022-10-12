var decimalKeys=["mantissa", "exponent"];
function areEqual(array1=[], array2=[]){
    if(!(array1.length === array2.length)){
        return false;
    }
    return array1.every(function(element,index){
        if (element === array2[index]){
            return true;
          }
          return false;
    });
}
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
    if(areEqual(decimalKeys,Object.keys(object))){
        return new Decimal(""+object.mantissa+"e"+object.exponent);
    }
    if(typeof(object)==typeof({})){
        let returnObject={};
        for(key in object){
            returnObject[key]=convertToDecimal(object[key]);
        }
        return returnObject;
    }
    else if(typeof(object)==typeof([])){
        let returnArray=object.map(convertToDecimal);
        return returnArray;
    }
}
function save(){
    let saveString=JSON.stringify(convertToStringifiable(player));
    //console.log(saveString);
    localStorage.setItem("save",saveString);
}
function load(){
    let loadObject=convertToDecimal(JSON.parse(localStorage.getItem("save")));
    //console.log(loadObject);
    if(loadObject===null){
        return false;
    }
    player=jQuery.extend(true, { }, loadObject);
    putText(player.currentVisibleGenerators);
    return true;
}