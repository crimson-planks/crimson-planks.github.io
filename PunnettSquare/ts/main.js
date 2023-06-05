"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gene_1 = require("./gene");
var Table = {
    makeTableElement: function (tableArrayArray) {
        var tableElement = document.createElement("table");
        tableArrayArray.forEach(function (arrayOfString) {
            var trElement = document.createElement("tr");
            arrayOfString.forEach(function (str) {
                var tdElement = document.createElement("td");
                var node = document.createTextNode(str);
                tdElement.appendChild(node);
                trElement.appendChild(tdElement);
            });
            tableElement.appendChild(trElement);
        });
        return tableElement;
    }
};
console.log(new gene_1.Gene("I<sup>A</sup>"));
var tableElement = Table.makeTableElement([["asdf", "qwer"], ["zxcv", "123456"]]);
tableElement.setAttribute("id", "punnett-square-table");
document.getElementById("table-div").appendChild(tableElement);
