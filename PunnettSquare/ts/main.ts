import { Gene } from "./gene";
var Table = {
    makeTableElement(tableArrayArray: Array<Array<string>>): HTMLTableElement {
        const tableElement = document.createElement("table")
        tableArrayArray.forEach(arrayOfString => {
            const trElement = document.createElement("tr")
            arrayOfString.forEach(str => {
                const tdElement = document.createElement("td")
                const node = document.createTextNode(str)
                tdElement.appendChild(node)
                trElement.appendChild(tdElement)
            });
            tableElement.appendChild(trElement)
        });
        return tableElement
    }
}
console.log(new Gene("I<sup>A</sup>"))
const tableElement = Table.makeTableElement([["asdf","qwer"],["zxcv","123456"]])
tableElement.setAttribute("id","punnett-square-table")
document.getElementById("table-div").appendChild(tableElement)