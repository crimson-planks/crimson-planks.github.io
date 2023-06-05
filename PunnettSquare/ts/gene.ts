enum Dominance{
    reccesive = 0,
    dominant = 1
}
export class Gene{
    dominance: Dominance
    value: string
    constructor(value: string){
        this.value = value
    }
    toString(): string{
        return this.value
    }
}