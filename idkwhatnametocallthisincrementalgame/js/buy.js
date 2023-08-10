//costIncrease
var ci={
    sumOfLinear(start,buyAmount,increase){
        return start.mul(buyAmount)
    },
    infiniteSumOf1divNExp(n){
        return Decimal.div(1,Decimal.sub(n,1));
    },
    sumOfExponential(start,buyAmount,increase){
        return ci.infiniteSumOf1divNExp(increase);
    }
}
/*
1+1/3+1/9+1/27+...
1/3+

*/