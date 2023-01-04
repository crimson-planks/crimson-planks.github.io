Decimal.fromObject=function(o){const l=function(o){if(o==="_Infinity") return Infinity;return o};if(typeof o!==typeof {})return o;return Decimal.fromComponents(l(o.sign),l(o.layer),l(o.mag))}
Decimal.MagAbs=function(amount){
    if(amount.eq(0)){
        return amount;
    }
    if(amount.abs().lt(1)){
        if(amount.layer==0){
            return amount.abs().recip();
        }
        else{
            return Decimal.fromComponents(1,amount.layer,Math.abs(amount.mag))
        }
    }
    else{
        return amount.abs();
    }
}