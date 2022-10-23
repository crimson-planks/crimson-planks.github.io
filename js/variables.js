const arrayOfTypes=[typeof(true), typeof(0), typeof(""), typeof(undefined)]
//max value of 64 bit floating point in javascript
const smallInfinity = new Decimal(Number.MAX_VALUE);

//max value with break_infinity.js
const mediumInfinity= new Decimal("1e9e15");
//new Decimal("10").pow(15).mul(9)
var currentVersion = "a0.1.0+20221018r1";
var player = {
    money: new Decimal("0"),
    generatorList: {"hydrogen":[]},
    notation: "scientific",
    createdVersion: currentVersion,
    amountOfGenerators: 0,
    currentMaxGenerator: 4,
    currentVisibleGenerators: 1,
    astroidAmount: new Decimal("0"),
    astroidCost: new Decimal("7"),
    astroidCostIncrease: new Decimal("7"),
    lastUpdate: Date.now(),
    clickAmount: 0,
    clickMult: new Decimal("1"),
    defaultMoney: new Decimal("0"),
    totalAstroids: new Decimal("0"),
    totalHydrogen: new Decimal("0"),
    costDriftFactor: new Decimal("0.5"),
    generator: {
        unlocked: false
    },
    energy: {
        unlocked: false,
        unlockCost: new Decimal("2"),
        astroidsAllocated: new Decimal("0"),
        amount: new Decimal("0"),
        mult: new Decimal(1)
    },
    currentChallange: "c0", 
    costDriftStartValue: [
        new Decimal("11"),
        new Decimal("28"),
    ],
    fusion:{
        unlocked: false,
        unlockCost: new Decimal("1e100")
    }
}
var allocatableAstroids;
var currencyPerSecond = new Decimal("0");
var energyPerSecond = new Decimal("0");
var selectedTab="generator-tab"
var tabArray=["generator", "energy"];
var fusionShowCost= new Decimal("1e60");
({notation}=player);
var dev={
    repeatNotification(amount=50){
        for(let i=0;i<amount;i++){
        $.notify("Test String");
        }
    }
}