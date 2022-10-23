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
function UpdateGUI(){
    notatison=player.notation;
    let tmpstring;
    document.getElementById("currency").innerHTML=format(player.money);
    document.getElementById("get-money-button").innerHTML=`Click to get ${format(player.clickMult,{dec: 2, smallDec: 0})} hydrogen`;
    document.getElementById("currency-per-second").innerHTML=format(currencyPerSecond);

    tmpstring=player.totalAstroids+[];
    if(player.astroidAmount.lessThan(player.totalAstroids)){
        tmpstring+=" - "+player.totalAstroids.minus(player.astroidAmount);
    }
    document.getElementById("dimB-text").innerHTML=`Hydrogen Astroids(${tmpstring}): requires ${format(player.astroidCost,{smallDec: 0})} Hydrogen Generator-${getDimboostRequiredGenID()}s`;
    document.getElementById("dimB-button").innerHTML= player.totalAstroids.greaterThanOrEqualTo(4) ? "Reset for a boost" : "Reset for a new generator"

    for(let i=0;i<player.amountOfGenerators;i++){
        let g=player.generatorList["hydrogen"][i];
        document.getElementById("gen"+(i+1)).innerHTML="Hydrogen Generator-"+(i+1)+"<br> Amount: " + format(g.amount)+"("+format(g.bought,{smallDec: 0})+") x"+format(g.totalMult);

        ChangeColorIfBuyable(
            document.getElementById("BG"+(i+1)),
            player.generatorList["hydrogen"][i].cost);
        document.getElementById("BG"+(i+1)).innerHTML="Cost: " + format(player.generatorList["hydrogen"][i].cost,{dec: 0, smallDec: 0});
    }
    ChangeColorIfBuyable(
        document.getElementById("dimB-button"),
        
        player.astroidCost,player.generatorList["hydrogen"][getDimboostRequiredGenID()-1].amount);
        
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
    document.getElementById("energy-text1").innerHTML=`${format(player.energy.astroidsAllocated,{dec: 2,smallDec: 0})} Astroids are producing ${format(energyPerSecond)} energy per second.`
    document.getElementById("energy-text2").innerHTML=`You have ${format(player.energy.amount)} energy, which is boosting all generators by ${format(getMultFromEnergy())}x.`
    document.getElementById("energy-text3").innerHTML=`Allocatable Astroids: ${format(allocatableAstroids)}, Total Astroids: ${format(player.totalAstroids)}`
    //fusion
    ShowIfBoolean(document.getElementById("unlock-fusion-button"),GetIfBuyable(fusionShowCost));
    ChangeColorIfBuyable(document.getElementById("unlock-fusion-button"),player.fusion.unlockCost);
}