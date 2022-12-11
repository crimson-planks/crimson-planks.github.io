function ChangeColorIfBuyable(element,cost,money=player.money){
    if(GetIfBuyable(cost,money)){
        element.classList.remove('unavailable-button');
        element.classList.add('buyable-button');
    }
    else{
        element.classList.remove('buyable-button');
        element.classList.add('unavailable-button');
    }
}
function ShowIfBoolean(element,boolean){
    if(boolean){
        element.classList.remove("hidden");
    }
    else{
        element.classList.add("hidden");
    }
}
function PutText(n){
    for(let i=0;i<n;i++){
        document.getElementById("genRow"+(i+1)).classList.remove("hidden");
    }
    for(let i=n;i<MAX_GENERATOR;i++){
        document.getElementById("genRow"+(i+1)).classList.add("hidden");
    }
    //console.log(tmp);
    player.amountOfGenerators=n;
}
function ToggleTab(tabName="floating-notation-tab"){
    let element=document.getElementById(tabName);
    ShowIfBoolean(element,[...element.classList].includes("hidden"));
}
function ChangeTab(tabName="generator-tab",sudo=false){
    if(!sudo&&tabName==selectedTab){
        ShowIfBoolean(document.getElementById(selectedTab),false);
        ShowIfBoolean(document.getElementById("generator-tab"),true);
        selectedTab="generator-tab";
        return "generator-tab";
    }
    ShowIfBoolean(document.getElementById(selectedTab),false);
    ShowIfBoolean(document.getElementById(tabName),true);
    ShowIfBoolean(document.getElementById("floating-notation-tab"),false);
    selectedTab=tabName;
    return tabName;
}
function ChangeNotation(notation){
    player.notation=notation;
}
function UpdateGUI(){
    let tmpstring="";
    document.getElementById("hydrogen").innerHTML=FormatValue(player.money);
    document.getElementById("get-money-button").innerHTML=`Click to get ${FormatValue(player.clickMult,{dec: 2, smallDec: 0})} hydrogen`;
    document.getElementById("hydrogen-per-second").innerHTML=FormatValue(currencyPerSecond);
    ShowIfBoolean(document.getElementById("fused-lost-hydrogen-text"),player.fusion.activated)
    if(player.fusion.activated){
        document.getElementById("fused-lost-hydrogen").innerHTML=FormatValue(GetFusedLoseRate(player.money));
    }
    tmpstring=player.totalAstroids.toString();
    if(player.astroidAmount.lessThan(player.totalAstroids)){
        tmpstring+=" - "+player.totalAstroids.minus(player.astroidAmount).toString();
    }
    document.getElementById("dimB-text").innerHTML=`Hydrogen Astroids(${tmpstring}): requires ${FormatValue(player.astroidCost,{smallDec: 0})} Hydrogen Generator-${RomanNumeralsUnit(getAstroidRequiredGenID()+1)}s`;
    document.getElementById("dimB-button").innerHTML= player.totalAstroids.greaterThanOrEqualTo(4) ? "Reset for a boost" : "Reset for a new generator"

    for(let i=0;i<player.amountOfGenerators;i++){
        let g=player.generatorList["H"][i];
        document.getElementById("gen"+(i)).innerHTML="Hydrogen Generator-"+(RomanNumeralsUnit(i+1))+"<br> Amount: " + FormatValue(g.amount)+"("+FormatValue(g.bought,{smallDec: 0})+") x"+FormatValue(g.mult);

        ChangeColorIfBuyable(
            document.getElementById("BG"+(i)),
            player.generatorList["H"][i].cost);
        document.getElementById("BG"+(i)).innerHTML="Cost: " + FormatValue(player.generatorList["H"][i].cost,{dec: 0, smallDec: 0});
    }
    ChangeColorIfBuyable(
        document.getElementById("dimB-button"),
        
        player.astroidCost,player.generatorList["H"][getAstroidRequiredGenID()].amount);
        
    ShowIfBoolean(
        document.getElementById("unlock-div"),
        GetIfBuyable(new Decimal("1"),player.totalAstroids));
    
    ShowIfBoolean(
        document.getElementById("unlock-energy-button"),
        !player.energy.unlocked);
    
    ChangeColorIfBuyable(
        document.getElementById("unlock-energy-button"),
        player.energy.unlockCost,
        player.astroidAmount);
    
    for(let i=0;i<tabArray.length;i++){
        //console.log(tmpHtml);
        ShowIfBoolean(document.getElementById(tabArray[i]+"-tab-button"),player[tabArray[i]].unlocked);
    }
    //energy
    document.getElementById("energy-text1").innerHTML=`${FormatValue(player.energy.astroidsAllocated,{smallDec: 0})} Astroids are producing ${FormatValue(energyPerSecond)} energy per second. (${FormatValue(player.energy.mult)} energy per astroid)`
    document.getElementById("energy-text2").innerHTML=`You have ${FormatValue(player.energy.amount)} energy, which is boosting all hydrogen generators by x${FormatValue(GetMultFromEnergy())}.`
    document.getElementById("energy-text3").innerHTML=`Allocatable Astroids: ${FormatValue(allocatableAstroids,{smallDec: 0})}, Total Astroids: ${FormatValue(player.totalAstroids,{smallDec: 0})}`

    document.getElementById("astroid-allocate-button1").innerHTML=`Allocate ${FormatValue(player.inputValue.astroidPerAllocation,{smallDec: 0})} Astroids`;
    document.getElementById("astroid-allocate-button2").innerHTML=`Allocate ${FormatValue(player.inputValue.astroidPerAllocation.mul(-1),{smallDec: 0})} Astroids`;
    document.getElementById("astroid-accel-button").innerHTML=`Astroid Accelation: gives ${FormatValue(GetEnergyMultFromAstroidAccel())}x boost to energy production`

    document.getElementById("energy-text4").innerHTML=`Energy Multiplier by Astroid Accelation: ${FormatValue(player.energy.multByAccel)}x`
    //fusion
    ShowIfBoolean(document.getElementById("unlock-fusion-button"),(!player.fusion.unlocked)&&GetIfBuyable(player.fusion.showCost));
    ChangeColorIfBuyable(document.getElementById("unlock-fusion-button"),player.fusion.unlockCost);

    document.getElementById("fuse-button").innerHTML=player.fusion.activated ? "Stop fusing hydrogen" : "Fuse hydrogen";
    tmpstring=`You have ${FormatValue(player.money)} hydrogen, producing ${FormatValue(heliumPerSecond)} helium per second.(Capped at ${FormatValue(player.fusion.productionCap)}/s)`;
    if(!player.fusion.activated){
        tmpstring=`<span style="text-decoration: line-through;">${tmpstring}</span>`
    }
    document.getElementById("fusion-text1").innerHTML=tmpstring;
    document.getElementById("helium").innerHTML=FormatValue(player.helium);

    //unlock description
    document.getElementById("unlock-energy-description").innerHTML=`Cost: ${FormatValue(player.energy.unlockCost,{smallDec:0})} Hydrogen Astroids`
    document.getElementById("unlock-fusion-description").innerHTML=`Cost: ${FormatValue(player.fusion.unlockCost,{smallDec:0})} hydrogen`

    //helium upgrades

    document.getElementById("he-11-description").innerHTML=`Each allocated astroid boosts energy per second.<br>(Currently: x${FormatValue(player.upgrades.He[11].value)})`;
    document.getElementById("he-12-description").innerHTML=`Unallocated astroids boost hydrogen generators based on unspent energy<br>(x${FormatValue(player.upgrades.He[12].value)})`;
    document.getElementById("he-13-description").innerHTML=`Energy production gets a boost based on amount of hydrogen.<br>(x${FormatValue(player.upgrades.He[13].value)})`
    document.getElementById("he-14-description").innerHTML=`Increase the cap of helium production<br>(x${FormatValue(player.upgrades.He[14].value)})`
    document.getElementById("he-21-description").innerHTML=`Increase the cap of helium production based on amount of helium<br>(x${FormatValue(player.upgrades.He[21].value)})`
    document.getElementById("he-22-description").innerHTML=`Hydrogen production gets a boost based on amount of helium<br>(x${FormatValue(player.upgrades.He[22].value)})`
    document.getElementById("he-24-description").innerHTML=`Unallocated astroids boost Hydrogen Generator-${RomanNumeralsUnit(player.upgrades.He[24].value)}`
    for(let i=0;i<2;i++){
        for(let j=0;j<4;j++){
            let id=i+1+""+(j+1)
            if(player.upgrades.He[id]===undefined) continue;
            if(player.upgrades.He[id].bought.gte(player.upgrades.He[id].type[1])){
                document.getElementById(`he-${id}-button`).classList.remove('buyable-button');
                document.getElementById(`he-${id}-button`).classList.add('bought-button');
                document.getElementById(`he-${id}-cost`).innerHTML=`MAXED(${player.upgrades.He[id].type[1]})`;
                continue;
            }
            ChangeColorIfBuyable(document.getElementById(`he-${id}-button`),player.upgrades.He[id].cost,player.helium)
            document.getElementById(`he-${id}-cost`).innerHTML=`Cost: ${FormatValue(player.upgrades.He[id].cost)}`
        }
    }
    //option

    if(selectedTab==="option-tab"){
        document.getElementById("option-notation-button").innerHTML=`Notation: ${notationNames[player.notation]}`
    }

    //statistics
    if(selectedTab==="statistics-tab"){
        document.getElementById("statistics-general").innerHTML=
        `You have made a total of ${FormatValue(player.totalHydrogen)} hydrogen.<br>
        You have played for ${FormatTime(playTime)}.<br>`
    }
}