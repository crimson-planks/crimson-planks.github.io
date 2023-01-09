//max value of 64 bit floating point in javascript
const SMALL_INFINITY = new Decimal(Number.MAX_VALUE);

//max value with break_infinity.js
const MEDIUM_INFINITY= new Decimal("e9e15");
//new Decimal("10").pow(15).mul(9)
var currentVersion = "v0.00220-dev";
var notationOption={
    
}
var player = {
    money: new Decimal("0"),
    generatorList: {0:[undefined]},
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
        new Decimal("2"),
        new Decimal("4")
    ],
    fusion:{
        unlocked: false,
        unlockCost: new Decimal("1e90"),
        activated: false,
        loseRate: new Decimal("0.9"),
        loseDriftFactor: new Decimal("0.8")
    },
    helium: new Decimal(0),
    defaultHelium: new Decimal(0),
    inputValue:{
        astroidPerAllocation: new Decimal("1")
    },
    upgrades: {
        1:{
            "11":new Upgrade([1,100],[1,"11"],new Decimal('10')),
            "12":new Upgrade([1,1],[1,"12"],new Decimal('10000')),
            "13":new Upgrade([1,10],[1,"13"],new Decimal('1e6')),
            "14":new Upgrade([0],[1,"14"],new Decimal('1e7')),
            "21":new Upgrade([0],[1,"21"],new Decimal('1e3')),
            "22":new Upgrade([1,16],[1,"22"],new Decimal('1e17')),
            "23":new Upgrade([0],[1,"23"],new Decimal('1e35')),
            "24":new Upgrade([1,7],[1,"24"],new Decimal('1e50'))
        }
    }
}
var defaultPlayer={}
jQuery.extend(true, defaultPlayer, player);

const MAX_GENERATOR = 10;
const maxToleratedHeliumPerSecond = new Decimal("0.01");
var allocatableAstroids;
var currencyPerSecond = new Decimal("0");
var energyPerSecond = new Decimal("0");
var heliumPerSecond = new Decimal("0");
var selectedTab="generator-tab"
var tabArray=["generator", "energy", "fusion"];
var saveTimer=0;
var playTime;