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