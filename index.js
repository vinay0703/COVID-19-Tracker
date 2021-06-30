var cnt=0
var i=0
var str
var test=[]
var single=true
allCountries();
getTotal();
var x = window.matchMedia("(max-width: 700px)")
if(x.matches){
    console.log("mobile")
document.querySelector(".btn-Success").addEventListener("click",function(){
    single=true
    const tar = document.querySelector("select").value
    document.querySelector(".det").innerHTML=null
    if(tar!="sc")
    getDataByCountryCode(tar)
})
}else{
    console.log("desktop")
document.querySelector("select").addEventListener("click",function(event){
    const tar = event.target.value
    single=true
    document.querySelector(".det").innerHTML=null
    console.log("option selected!")
    if(tar!="sc" && tar!="IND")
    getDataByCountryCode(tar)
    else if(str=="IND"){
    forIndia()
    }
})
}
document.querySelector(".btn-Primary").addEventListener("click",function(){
    if(single){
        document.querySelector(".det").innerHTML=null
            forIndia() }
})

function getTotal()
{
    fetch("https://covid-19-data.p.rapidapi.com/totals?format=json", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"x-rapidapi-key": "7e166e1c42msh0f0fdc6dd326398p1b22a2jsn3556dcb96f70"
	}
})
.then(response => response.json())
.then(data => {
    console.log(data)
    document.querySelector(".display-4").innerText=data[0].confirmed
    document.querySelector(".wr").innerText=data[0].recovered
    document.querySelector(".wd").innerText=data[0].deaths
    document.querySelector(".wc").innerText=data[0].critical
})
.catch(err => {
	console.log(err);
});
}

function getDataByCountryCode(str)
{
    
    document.querySelector('.frind1').style.display="none"
    console.log(str)
    for(i=0;i<253;i++){
        if(document.querySelector('select').value==test[i].value){
            console.log(test[i].innerText)
            document.querySelector(".cnt").innerHTML=test[i].innerText
        }
    }
 const url = "https://covid-19-data.p.rapidapi.com/country/code?format=json&code="+str
    fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"x-rapidapi-key": "7e166e1c42msh0f0fdc6dd326398p1b22a2jsn3556dcb96f70"
	}
})
.then(response => response.json())
.then(data => 
    {
    console.log(data)
    var active = data[0].confirmed-(data[0].recovered-data[0].deaths)
    if(active<0)
    active*=-1
    const toin = `<tr>
      <td class="conf">${data[0].confirmed}</td>
      <td class="act">${active}</td>
      <td class="rec">${data[0].recovered}</td>
      <td class="deat">${data[0].deaths}</td>
      <td class="crit">${data[0].critical}</td>
      </tr>`
      document.querySelector(".det").insertAdjacentHTML("afterbegin",toin)
    })
.catch(err => {
	console.log(err);
});
}

function allCountries()
{
    fetch("https://covid-19-data.p.rapidapi.com/help/countries?format=json", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"x-rapidapi-key": "7e166e1c42msh0f0fdc6dd326398p1b22a2jsn3556dcb96f70"
	}
})
.then(response => response.json()).then(data => 
        {
                for(i=0;i<253;i++)
                {
                    
                   const ht=`
                    <option class="${data[i].alpha3code}" value="${data[i].alpha3code}">${data[i].name}</option>
                    `
                
                document.querySelector("select").insertAdjacentHTML("beforeend",ht)
                }
            test=document.querySelectorAll('option')
        }).catch(err => {
	console.log(err);
});
}

function forIndia()
{
    document.querySelector('.frind1').style.display="inline-block"
    fetch("https://api.covid19india.org/data.json",{
    "method":"GET"
}).then(response => response.json())
.then(data => {
    console.log(data)
    document.querySelector(".cnt").innerHTML="India" 
    for(i=1;i<37;i++)
    {
      const ind = `<tr>
      <td>${data.statewise[i].state}</td>
      <td class="conf">${data.statewise[i].confirmed}</td>
      <td class="act">${data.statewise[i].active}</td>
      <td class="rec">${data.statewise[i].recovered}</td>
      <td class="deat">${data.statewise[i].deaths}</td>
      <td class="crit">${0}</td>
      </tr>`
    document.querySelector(".det").insertAdjacentHTML("beforeend",ind)
    }
})
.catch(err => console.log(err))
single=false
}





