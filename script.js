//Favicon dinamico
let agora = new Date()
function faviconDinamico(){
    let horaatual = agora.getHours()
    let favicon = document.getElementById("favicon")

    if(horaatual >= 18 || horaatual < 6){
        favicon.href = "../midias/faviconmoon.ico"
    }
    else{
        favicon.href = "../midias/faviconsun.ico"
    }
}
let anorodape = document.getElementById("ano")
let ano = agora.getFullYear()

anorodape.innerText = ano
