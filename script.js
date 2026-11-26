document.getElementById("pesquisar").addEventListener("submit", async (event) => {
    event.preventDefault()

    const nomecidade = document.getElementById("nomecidade").value.trim()

    if(!nomecidade){
        document.getElementById("previsao").classList.remove("mostrar")
        mostraralerta(`<p>Digite uma cidade...</p>
        <img id="iconetempo" src="midias/undraw_finding-the-way.svg" alt="Não foi possível localizar">`)
        return
    }

    const key = "c165708e09c4374e0ad5351a228c8c0e"
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(nomecidade)}&appid=${key}&lang=pt_br&units=metric`

    const resultado = await fetch(api)
    const json = await resultado.json()

    if(json.cod === 200){
        mostrarinfos({
            cidade: json.name,
            pais: json.sys.country,
            temperatura: json.main.temp,
            tempmax: json.main.temp_max,
            tempmin: json.main.temp_min,
            descricao: json.weather[0].description,
            iconedin: json.weather[0].icon,
            ventovelocidade: (json.wind.speed * 3.6),
            umidade: json.main.humidity
        })
    }
    else{
        document.getElementById("previsao").classList.remove("mostrar")

        mostraralerta(`<p>Não foi possivel localizar...</p>
        <img id="iconetempo" src="midias/undraw_navigation.svg" alt="Não foi possível localizar">`)
    }
})

function mostraralerta(msg){
    document.getElementById("alerta").innerHTML = msg
}

function mostrarinfos(json){
    mostraralerta("")

    document.getElementById("previsao").classList.add("mostrar")

    document.getElementById("titulo").innerText = `${json.cidade}, ${json.pais}`

    document.getElementById("iconetempo").setAttribute("src", `https://openweathermap.org/img/wn/${json.iconedin}@2x.png`)
    document.getElementById("temperatura").innerHTML = `${json.temperatura.toFixed(1).toString().replace(".", ",")}<sup> C°</sup>`
    document.getElementById("descricaotempo").innerText = `${json.descricao}`

    document.getElementById("temperaturamax").innerHTML = `${json.tempmax.toFixed(1).toString().replace(".", ",")}<sup> C°</sup>`
    document.getElementById("temperaturamin").innerHTML = `${json.tempmin.toFixed(1).toString().replace(".", ",")}<sup> C°</sup>`
    document.getElementById("umidade").innerText = `${json.umidade} %`
    document.getElementById("vento").innerText = `${json.ventovelocidade.toFixed(1).toString().replace(".", ",")} km/h`
}

//Favicon dinamico
let agora = new Date()
function faviconDinamico(){
    agora = new Date()
    let horaatual = agora.getHours()
    let favicon = document.getElementById("favicon")

    if(horaatual >= 18 || horaatual < 6){
        favicon.href = "midias/faviconmoon.ico"
    }
    else{
        favicon.href = "midias/faviconsun.ico"
    }
}

faviconDinamico()
setInterval(faviconDinamico, 300000)

//Ano automático
let anorodape = document.getElementById("ano")
let ano = agora.getFullYear()

anorodape.innerText = ano


