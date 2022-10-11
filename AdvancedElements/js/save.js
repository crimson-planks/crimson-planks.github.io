function convertToString(player){
    
}
function save(){
    let saveString=JSON.stringify(player);
    //console.log(saveString);
    localStorage.setItem("save",saveString)
}
function load(){
    player = JSON.parse(localStorage.getItem("save"));
}