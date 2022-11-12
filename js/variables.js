const arrayOfTypes=[typeof(true), typeof(0), typeof(""), typeof(undefined)]
//max value of 64 bit floating point in javascript
const smallInfinity = new Decimal(Number.MAX_VALUE);

//max value with break_infinity.js
const mediumInfinity= new Decimal("1e9e15");
//new Decimal("10").pow(15).mul(9)
var currentVersion = "v0.0200";
var player = {
    money: new Decimal("0"),
    generatorList: {"H":[undefined]},
    notation: "scientific",
    createdVersion: currentVersion,
    amountOfGenerators: 0,
    currentMaxGenerator: 4,
    currentVisibleGenerators: 1,
    astroidAmount: new Decimal("0"),
    astroidCost: new Decimal("7"),
    astroidCostIncrease: new Decimal("7"),
    maxAstroidBoostGenerator: 1,
    createdTime: Date.now(),
    lastUpdate: Date.now(),
    clickAmount: new Decimal("0"),
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
        mult: new Decimal(1),
        defaultEnergy: new Decimal("0"),
        lastAccelEnergy: new Decimal(0),
        multByAccel: new Decimal(1)
    },
    currentChallange: "c0",
    costDriftStartValue: [
        new Decimal("11"),
        new Decimal("28"),
        new Decimal("2")
    ],
    fusion:{
        unlocked: false,
        unlockCost: new Decimal("1e90"),
        activated: false,
        hydrogenLoseRate: new Decimal("0.99"),
        hydrogenLoseDriftFactor: new Decimal("0.4")
    },
    helium: new Decimal(0),
    defaultHelium: new Decimal(0),
    inputValue:{
        astroidPerAllocation: new Decimal("1")
    },
    upgrades: {
        "He":{
            "11":{
                cost: new Decimal(10),
                value: new Decimal(1),
                bought: new Decimal(0)
            },
            "21":{
                cost: new Decimal("10000"),
                value: new Decimal(1),
                bought: false
            },
            "31":{
                cost: new Decimal("1e6"),
                value: new Decimal(1),
                bought: false
            },
            "41":{
                cost: new Decimal("1e30"),
                value: new Decimal(1),
                bought: new Decimal(1)
            }
        }
    }
}
const maxToleratedHeliumPerSecond = new Decimal("0.01");
var allocatableAstroids;
var currencyPerSecond = new Decimal("0");
var energyPerSecond = new Decimal("0");
var heliumPerSecond = new Decimal("0");
var selectedTab="generator-tab"
var tabArray=["generator", "energy", "fusion"];
var fusionShowCost= new Decimal("1e60");
var saveTimer=0;
var playTime;

const notationList=["scientific","engineering","engineering-alt","logarithm"];
const notationGroup=[
    ["scientific","engineering","engineering-alt"],
    ["logarithm"]];
const notationNames={
    "scientific":"Scientific",
    "engineering":"Engineering",
    "engineering-alt":"Alternative Engineering",
    "logarithm":"Logarithm"
}