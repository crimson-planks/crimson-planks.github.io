function AreArraysEqual(array1=[], array2=[]){
    //shallow compare

    if(array1.length !== array2.length){
        return false;
    }
    return array1.every(function(element,index){
        if (element === array2[index]){
            return true;
          }
          return false;
    });
}
function ConvertToObject(object){
    if(object===null) return object;
    //if(object===Infinity) return "_Infinity";
    if(object===Infinity) return {_isInfinity:true}
    if(typeof object==="number"&&isNaN(object)) return {_isNaN: true};
    if(["boolean","number","string"].includes(typeof object)){
        return object;
    }
    if(typeof object==="undefined"){
        return {_isUndefined: true}
    }
    if(typeof object==="bigint"){return {_type: "bigint",payload: object.toString()}};
    if(typeof object==="function"){
        return {_type: "function",payload: object.toString()};
    }
    if(new Decimal().constructor === object.constructor){
        return ConvertToObject({...object});
    }
    if(new Upgrade().constructor === object.constructor){
        return ConvertToObject({...object});
    }
    if(typeof object==="object"){
        if(Array.isArray(object)){
            let returnArray=object.map(ConvertToObject);
            return returnArray;
        }
        let returnObject={};
        for(key in object){
            returnObject[key]=ConvertToObject(object[key]);
        }
        return returnObject;
    }
    return object;
}

function ConvertToClass(object){
    if(object===null) return object;
    if(object==="null") return object;
    if(["boolean","number","string","undefined"].includes(typeof(object))){
        return object;
    }
    let objectKeys=Object.keys(object);
    //legacy support
    if(object==="_Infinity") return Infinity;
    //new infinity representation
    if(object._isUndefined===true) return undefined;
    if(object._isInfinity===true) return Infinity;
    if(object._isNaN===true) return NaN;
    if(object._type==="function") return Function(object.payload);
    if(object._type==="bigint") return BigInt(object.payload);
    if(typeof(object)=="object"){
        Object.keys(object).forEach(function(key){
            object[key]=ConvertToClass(object[key]);
        });
        if(AreArraysEqual(Object.keys(new Decimal()),objectKeys)){
            //for break_infinity.js
            /*
            return new Decimal(""+object.mantissa+"e"+object.exponent);
            */
    
            //for break_eternity.js
            ({sign,mag,layer}=object);
            return Decimal.fromComponents(sign,layer,mag);
        }
        if(AreArraysEqual(Object.keys(new Upgrade()),objectKeys)){
            //Upgrade object has multiple Decimal objects in it
            //Object.keys(object).forEach((key)=>object[key]=ConvertToClass(object[key]));
            return Upgrade.fromObject(object);
        }
        if(AreArraysEqual(Object.keys(new Generator()),objectKeys)){
            return Generator.fromObject(object);
        }
        if(Array.isArray(object)){
            return object.map(ConvertToClass);
        }
        return object;
    }
}
function save(){
    let saveString=JSON.stringify(ConvertToObject(player));
    //console.log(saveString);
    localStorage.setItem("save",saveString);
    $.notify("Game Saved",{style: "blue"});
}
function load(){
    let loadObject=ConvertToClass(JSON.parse(localStorage.getItem("save")));
    //console.log(loadObject);
    if(loadObject===null){
        return false;
    }
    jQuery.extend(true, player, loadObject);
    //player={...player, ...loadObject}
    //console.log(player.currentVisibleGenerators)
    if(player.currentVisibleGenerators===undefined){
        return true;
    }
    PutText(player.currentVisibleGenerators);
    return true;
}