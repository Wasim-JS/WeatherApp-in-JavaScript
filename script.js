let searchBtn = document.querySelector('#searchBtn')

searchBtn.addEventListener('click',async ()=>{
    let cityInput = document.querySelector('.con .inp input')
    let cityName = cityInput.value.trim().toLowerCase()
    if(cityName === "") return alert("please enter the city name")
        showData(cityName)

        
    
})


showData('bengaluru')

async function showData(cityName){

    document.querySelector('.spinner').style.display = "block"
    document.querySelector('.data').style.display = "none"

    try {
        let weatherData = await getWeatherData(cityName)
        if(!weatherData) throw new Error('city not found')
        console.log('city data is ',weatherData)
    
        document.querySelector('.city h3').innerHTML = `${weatherData?.location?.name},${weatherData?.location?.region
        } `
        document.querySelector('#tem').innerHTML = weatherData.current?.temp_c
        let desc = weatherData.current?.condition?.text
        document.querySelector('.desc').innerHTML = desc
        document.querySelector('.con .icon').innerHTML = desc.toLowerCase().includes('cloud')?`<i class="fa-solid fa-cloud"></i>`: desc.toLowerCase().includes('rain')?`<i class="fa-solid fa-cloud-moon-rain"></i> `:desc.toLowerCase().includes('mist')?`<i class="fa-solid fa-cloud-moon"></i>`:`<i class="fa-solid fa-sun"></i>`
        document.querySelector('#humidity').innerHTML = weatherData.current?.humidity
        document.querySelector('#windSpeed').innerHTML = weatherData.current?.windchill_f
    
         document.querySelector('.spinner').style.display = "none"
            document.querySelector('.data').style.display = "block"
    } catch (error) {
        alert(error.message)
    }finally{
        document.querySelector('.spinner').style.display = "none"
    }

}



async function getWeatherData(city){

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '71cb165cdcmsh45ae49203c67737p170f63jsnbe11e07a3289',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };


try {
	const response = await fetch(url, options);
    if(!response.ok) throw new Error('Something went wrong')
	const result = await response.json();
    if(!response) throw new Error('Something went wrong')

	return result

} catch (error) {
	alert(error.message);
}finally{
    document.querySelector('.spinner').style.display = "none"
}

}

