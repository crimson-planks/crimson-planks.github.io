var money=new Decimal("0");
var GeneratorList = []
var lastUpdate = Date.now()

const amountOfGenerators = 8

for (let i = 0; i < 10; i++) {
  let generator = {
    cost: new Decimal("10"),
    bought: 0,
    amount: new Decimal("0"),
    mult: new Decimal("1")
  }
  GeneratorList.push(generator)
}

function clickButton(){
    money = money.plus(new Decimal("1"));
}


function format(amount, notation=0){
    if(notation==0){
        let power=Math.floor(amount.log10());
        let mentissa=amount.dividedBy(new Decimal("10").pow(power));
        if(power < 3) return amount.toFixed(2);
        return mentissa.toFixed(2) + "e" + power;
    }
}
function UpdateGUI(){
    document.getElementById("currency").innerHTML=format(money);
    for(let i=0;i<amountOfGenerators;i++){
        let g=GeneratorList[i];
        document.getElementById("gen"+(i+1)).innerHTML="Amount: " + format(g.amount);
    }
}
function productionLoop(diff){
    money=money.plus(GeneratorList[0].amount.mul(GeneratorList[0].mult).mul(new Decimal(diff)));
    for(let i=1;i<amountOfGenerators;i++){
        n=GeneratorList[i-1];
        n.amount=n.amount.plus(GeneratorList[i].amount.mul(GeneratorList[i].mult).mul(new Decimal(diff)));
    }
}

function MainLoop(){
    var diff = (Date.now() - lastUpdate)/1000;
    console.log(lastUpdate)
    productionLoop(diff);
    UpdateGUI();
    lastUpdate = Date.now();
}
setInterval(MainLoop, 50);