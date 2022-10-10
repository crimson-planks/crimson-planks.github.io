function calMult(){
    for(let i=0;i<MAX_GENERATOR;i++){
        g=player.GeneratorList["hydrogen"][i];
        g.totalMult=g.mult.mul(g.multByDimB);
        //console.log(1);
    }
}