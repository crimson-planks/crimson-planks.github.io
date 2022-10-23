var decimalKeys=Object.keys(new Decimal());
function AreEqual(array1=[], array2=[]){
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
function ConvertToStringifiable(object){
    if(object===null) return object;
    if(arrayOfTypes.includes(typeof(object))){
        return object;
    }
    if(new Decimal().constructor === object.constructor){
        return {...object};
    }
    if(typeof(object)===typeof({})){
        let returnObject={};
        for(key in object){
            returnObject[key]=ConvertToStringifiable(object[key]);
        }
        return returnObject;
    }
    else if(typeof(object)===typeof([])){
        let returnArray=object.map(ConvertToStringifiable);
        return returnArray;
    }
}

function ConvertToDecimal(object){
    if(object===null) return object;
    if(arrayOfTypes.includes(typeof(object))){
        return object;
    }
    if(AreEqual(decimalKeys,Object.keys(object))){
        //for break_infinity.js
        /*
        return new Decimal(""+object.mantissa+"e"+object.exponent);
        */

        //for break_eternity.js
        ({sign,mag,layer}=object);
        return Decimal.fromComponents(sign,layer,mag);
    }
    if(typeof(object)==typeof({})){
        let returnObject={};
        for(key in object){
            returnObject[key]=ConvertToDecimal(object[key]);
        }
        return returnObject;
    }
    else if(typeof(object)==typeof([])){
        let returnArray=object.map(ConvertToDecimal);
        return returnArray;
    }
}
function save(){
    let saveString=JSON.stringify(ConvertToStringifiable(player));
    //console.log(saveString);
    localStorage.setItem("save",saveString);
    $.notify("Game Saved",{style: "blue"});
}
function load(){
    let loadObject=ConvertToDecimal(JSON.parse(localStorage.getItem("save")));
    //console.log(loadObject);
    if(loadObject===null){
        return false;
    }
    jQuery.extend(true, player, loadObject);
    //player={...player, ...loadObject}
    console.log(player.currentVisibleGenerators)
    if(player.currentVisibleGenerators===undefined){
        return true;
    }
    PutText(player.currentVisibleGenerators);
    return true;
}