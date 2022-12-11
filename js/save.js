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
    if(object===Infinity) return "_Infinity";
    if(arrayOfTypes.includes(typeof(object))){
        return object;
    }
    if(new Decimal().constructor === object.constructor){
        return ConvertToObject({...object});
    }
    if(new Upgrade().constructor === object.constructor){
        return ConvertToObject({...object});
    }
    if(typeof(object)===typeof({})){
        let returnObject={};
        for(key in object){
            returnObject[key]=ConvertToObject(object[key]);
        }
        return returnObject;
    }
    else if(typeof(object)===typeof([])){
        let returnArray=object.map(ConvertToObject);
        return returnArray;
    }
}

function ConvertToClass(object){
    if(object===null) return object;
    if(arrayOfTypes.includes(typeof(object))){
        return object;
    }
    let objectKeys=Object.keys(object);
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
    if(typeof(object)==typeof({})){
        if(Array.isArray(object)){
            let returnArray=object.map(ConvertToClass);
            return returnArray;
        }
        let returnObject={};
        Object.keys(object).forEach(function(key){
            returnObject[key]=ConvertToClass(object[key]);
        });
        return returnObject;
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