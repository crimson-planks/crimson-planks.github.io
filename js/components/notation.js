player.notationOption={
    general:{
        dec:2,
        smallDec:2,
        maxBeforeNotate:3,
        maxBeforeNegativePowerNotate: 2,
        subMaxBeforeNotate: 9,
        subMaxBeforeNegativePowerNotate: 9,
        maxExp: 9,
        maxNotatedLayer: 4,
        customNegative: false,
        negativeSign: '-',
        customNegativeExp: false,
        extraDigit: 0,
        hExpDec: 4,
        expDec: 4,
        powerTower: false,
        base: 10,
        htmlSafe: true,
        maxFullShow: 7,
        show: 7,
        maxNotatedBracketCount: 3,
        subNotationArray: ["_same"]
    },
    roman:{
        altFractions: false
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
const notationList=["scientific","engineering","engineering-alt","logarithm","letters","emoji","seximal","inequality","standard"];
const notationGroup=[
    ["scientific","engineering","engineering-alt"],
    ["logarithm"],
    ["letters","emoji","standard"],
    ["seximal"],
    ["inequality"],
];
const notationNames={
    "scientific":"Scientific",
    "engineering":"Engineering",
    "engineering-alt":"Alternative Engineering",
    "logarithm":"Logarithm",
    "letters":"Letters",
    "emoji":"Emoji",
    "inequality":"Inequality",
    "seximal":"Seximal",
    "standard":"Standard"
}