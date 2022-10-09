function format(amount, dec=2, smalldec=2, notation="scientific"){
    if(notation=="scientific"){
        let power=Math.floor(amount.log10());
        let mentissa=amount.dividedBy(new Decimal("10").pow(power));
        if(power < 3) return amount.toFixed(smalldec);
        return mentissa.toFixed(dec) + "e" + power;
    }
}