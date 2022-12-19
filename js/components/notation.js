player.notationOption={
    general:{
        dec:2,
        smallDec:2,
        maxBeforeNotate:3,
        maxBeforeNegativePowerNotate: 2,
        maxExp: 9,
        maxNotatedLayer: 4,
        customNegative: false,
        negativeSign: '-',
        customNegativeExp: false,
        extraDigit: 0,
        hExpDec: 4,
        powerTower: false,
        base: 10,
        htmlSafe: true,
    },
    roman:{
        altFractions: false
    },
    letters:{
        maxFullShow: 7,
        show: 7
    },
    inequality:{
        smallDec:4,
        dec: 4,
        maxBeforeNotate: 15,
        maxBeforeNegativePowerNotate: 4,
        base: 3
    },
    seximal:{
        base: 6,
        maxBeforeNotate: 4,
        dec: 3,
        smallDec: 3
    }
}
const notationList=["scientific","engineering","engineering-alt","logarithm","letters","seximal","inequality"];
const notationGroup=[
    ["scientific","engineering","engineering-alt"],
    ["logarithm"],
    ["letters"],
    ["seximal"],
    ["inequality"],
];
const notationNames={
    "scientific":"Scientific",
    "engineering":"Engineering",
    "engineering-alt":"Alternative Engineering",
    "logarithm":"Logarithm",
    "letters":"Letters",
    "inequality":"Inequality",
    "seximal":"Seximal"
}