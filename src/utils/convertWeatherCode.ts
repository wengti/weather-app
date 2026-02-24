
export default function convertWeatherCode(weatherCode:number):string{

    let weatherIconFile = ''
    
    if(weatherCode <= 1) weatherIconFile = 'icon-sunny.webp'
    else if (weatherCode <= 2) weatherIconFile = 'icon-partly-cloudy.webp'
    else if (weatherCode <= 3) weatherIconFile = 'icon-overcast.webp'
    else if (weatherCode <= 48) weatherIconFile = 'icon-fog.webp'
    else if (weatherCode <= 57) weatherIconFile = 'icon-drizzle.webp'
    else if (weatherCode <= 67) weatherIconFile = 'icon-rain.webp'
    else if (weatherCode <= 77) weatherIconFile = 'icon-snow.webp'
    else if (weatherCode <= 82) weatherIconFile = 'icon-rain.webp'
    else if (weatherCode <= 86) weatherIconFile = 'icon-snow.webp'
    else if (weatherCode <= 99) weatherIconFile = 'icon-storm.webp'

    return `/assets/images/${weatherIconFile}`

}