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
    selectedTab=tabName;
    return tabName;
}
function ChangeNotation(notation){
    player.notation=notation;
}
function UpdateGUI(){
    let tmpstring;
    document.getElementById("currency").innerHTML=FormatValue(player.money);
    document.getElementById("get-money-button").innerHTML=`Click to get ${FormatValue(player.clickMult,{dec: 2, smallDec: 0})} hydrogen`;
    document.getElementById("currency-per-second").innerHTML=FormatValue(currencyPerSecond);

    tmpstring=player.totalAstroids+[];
    if(player.astroidAmount.lessThan(player.totalAstroids)){
        tmpstring+=" - "+player.totalAstroids.minus(player.astroidAmount);
    }
    document.getElementById("dimB-text").innerHTML=`Hydrogen Astroids(${tmpstring}): requires ${FormatValue(player.astroidCost,{smallDec: 0})} Hydrogen Generator-${getDimboostRequiredGenID()}s`;
    document.getElementById("dimB-button").innerHTML= player.totalAstroids.greaterThanOrEqualTo(4) ? "Reset for a boost" : "Reset for a new generator"

    for(let i=0;i<player.amountOfGenerators;i++){
        let g=player.generatorList["H"][i];
        document.getElementById("gen"+(i+1)).innerHTML="Hydrogen Generator-"+(i+1)+"<br> Amount: " + FormatValue(g.amount)+"("+FormatValue(g.bought,{smallDec: 0})+") x"+FormatValue(g.totalMult);

        ChangeColorIfBuyable(
            document.getElementById("BG"+(i+1)),
            player.generatorList["H"][i].cost);
        document.getElementById("BG"+(i+1)).innerHTML="Cost: " + FormatValue(player.generatorList["H"][i].cost,{dec: 0, smallDec: 0});
    }
    ChangeColorIfBuyable(
        document.getElementById("dimB-button"),
        
        player.astroidCost,player.generatorList["H"][getDimboostRequiredGenID()-1].amount);
        
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
    document.getElementById("energy-text2").innerHTML=`You have ${FormatValue(player.energy.amount)} energy, which is boosting all hydrogen generators by ${FormatValue(GetMultFromEnergy())}x.`
    document.getElementById("energy-text3").innerHTML=`Allocatable Astroids: ${FormatValue(allocatableAstroids,{smallDec: 0})}, Total Astroids: ${FormatValue(player.totalAstroids,{smallDec: 0})}`

    document.getElementById("astroid-allocate-button1").innerHTML=`Allocate ${FormatValue(player.inputValue.astroidPerAllocation,{smallDec: 0})} Astroids`;
    document.getElementById("astroid-allocate-button2").innerHTML=`Allocate ${FormatValue(player.inputValue.astroidPerAllocation.mul(-1),{smallDec: 0})} Astroids`;
    document.getElementById("astroid-accel-button").innerHTML=`Astroid Accelation: gives ${FormatValue(GetEnergyMultFromAstroidAccel())}x boost to energy production`

    document.getElementById("energy-text4").innerHTML=`Energy Multiplier by Astroid Accelation: ${FormatValue(player.energy.multByAccel)}x`
    //fusion
    ShowIfBoolean(document.getElementById("unlock-fusion-button"),(!player.fusion.unlocked)&&GetIfBuyable(fusionShowCost));
    ChangeColorIfBuyable(document.getElementById("unlock-fusion-button"),player.fusion.unlockCost);

    document.getElementById("fuse-button").innerHTML=player.fusion.activated ? "Stop fusing hydrogen" : "Fuse hydrogen";
    tmpstring=`You have ${FormatValue(player.money)} hydrogen and ${FormatValue(player.helium)} helium, producing ${FormatValue(heliumPerSecond)} helium per second.`;
    if(!player.fusion.activated){
        tmpstring=`<span style="text-decoration: line-through;">${tmpstring}</span>`
    }
    document.getElementById("fusion-text1").innerHTML=tmpstring;

    //unlock description
    document.getElementById("unlock-energy-description").innerHTML=`Cost: ${FormatValue(player.energy.unlockCost,{smallDec:0})} Hydrogen Astroids`
    document.getElementById("unlock-fusion-description").innerHTML=`Cost: ${FormatValue(player.fusion.unlockCost,{smallDec:0})} hydrogen`

    //helium upgrades

    document.getElementById("he-11-description").innerHTML=`Each allocated astroid boosts energy per second.<br>(Currently: ${FormatValue(player.upgrades.He["11"].value)}x)`;
    document.getElementById("he-21-description").innerHTML=`Unallocated astroids boost hydrogen generators based on unspent energy<br>(${FormatValue(player.upgrades.He["21"].value)}x)`;
    document.getElementById("he-31-description").innerHTML=`Energy production gets a boost based on amount of hydrogen.<br>(${FormatValue(player.upgrades.He["31"].value)}x)`
    document.getElementById("he-41-description").innerHTML=`Helium slowly decay when not fusing<br>(${FormatValue(player.upgrades.He["41"].value)}x/s)`
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(player.upgrades.He[i+1+[]+(j+1)]===undefined) continue;
            if(player.upgrades.He[i+1+[]+(j+1)].bought===true){
                document.getElementById(`he-${i+1+[]+(j+1)}-button`).classList.remove('buyable-button');
                document.getElementById(`he-${i+1+[]+(j+1)}-button`).classList.add('bought-button');
                continue;
            }
            ChangeColorIfBuyable(document.getElementById(`he-${i+1+[]+(j+1)}-button`),player.upgrades.He[i+1+[]+(j+1)].cost,player.helium)
            document.getElementById(`he-${i+1+[]+(j+1)}-cost`).innerHTML=`Cost: ${FormatValue(player.upgrades.He[i+1+[]+(j+1)].cost)}`
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
        You have played for ${playTime}`
    }
}