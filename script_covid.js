
let date = document.querySelector("#date")

let table1 = document.querySelector("#t01")
let query = document.querySelector("#query-btn")
let search = document.querySelector("#search-btn")

pre_table = table1.innerHTML // keep the table head structure

search.addEventListener('click', getDataCountry)
query.addEventListener('keypress', (event)=>{
  if(event.key=='Enter'){
    getDataCountry(event)
  }

})

function getDataCountry(event){
  event.preventDefault();
  country_name = query.value
  url = "https://corona.lmao.ninja/v2/countries/"+country_name

  fetch(url, requestOptions)
  .then(response => response.json()) // OR use  .then(response => response.text())
  .then(result => {

    date.innerHTML = "Date: "+Date(result.updated)    

    let table_data = '<td class="country">'+result.country+' <img class = "flag" src = "'+result.countryInfo.flag+'"></td>';
    table_data += "<td>"+(new Intl.NumberFormat().format(result.cases))+"</td>";
    table_data += "<td>"+(new Intl.NumberFormat().format(result.todayCases))+"</td>"+"<td>"+(new Intl.NumberFormat().format(result.deaths))+"</td>";
    table_data += "<td>"+(new Intl.NumberFormat().format(result.todayDeaths))+"</td>"+"<td>"+(new Intl.NumberFormat().format(result.recovered))+"</td>";
    table_data += "<td>"+(new Intl.NumberFormat().format(result.active))+"</td>";
    

    table1.innerHTML = pre_table // clear the old table and set it to just the first row of table head
    
    table1.innerHTML += "<tr>";

      table1.innerHTML += table_data;
    
    table1.innerHTML += "</tr>";
    
    console.log(result.country)
    console.log(result)
    console.log(table1)
    
  })
  .catch(error => console.log('error', error));

}

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

//display all countries
// fetch return value as promise, so need to handle with then and catch
fetch("https://corona.lmao.ninja/v2/countries?sort=country", requestOptions)
  .then(response => response.json()) // OR use  .then(response => response.text())
  .then(result => {

    date.innerHTML = "Date: "+Date(result.updated)  

    for(let i=result.length-1; i>=0;i--) {

        let table_data = '<td class="country">'+result[i].country+' <img class = "flag" src = "'+result[i].countryInfo.flag+'"></td>';
        table_data += "<td>"+(new Intl.NumberFormat().format(result[i].cases))+"</td>";
        table_data += "<td>"+(new Intl.NumberFormat().format(result[i].todayCases))+"</td>"+"<td>"+(new Intl.NumberFormat().format(result[i].deaths))+"</td>";
        table_data += "<td>"+(new Intl.NumberFormat().format(result[i].todayDeaths))+"</td>"+"<td>"+(new Intl.NumberFormat().format(result[i].recovered))+"</td>";
        table_data += "<td>"+(new Intl.NumberFormat().format(result[i].active))+"</td>";
        // table_data += '<td>'+'<img src = "'+result[i].countryInfo.flag+'"></td>';


        table1.innerHTML += "<tr>";

          table1.innerHTML += table_data;
        
        table1.innerHTML += "</tr>";
    }

    console.log(result)
    console.log(table1)
    
  })
  .catch(error => console.log('error', error));

  
  