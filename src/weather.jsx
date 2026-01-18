import React, { useState } from "react"
import axios from "axios";
import './index.css';
import image from "../public/assets/Image.png"
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function Weatherapp() {

    const [city, setCity] = useState("")
    const [wdatas, setwdatas] = useState({ temp: "", Desc: "", Weather: "" })
    const weatherImages = {
        clear: "../public/assets/clear.png",
        clouds: "../public/assets/clouds.png",
        rain: "../public/assets/rain.png",
        drizzle: "../public/assets/drizzle.png",
        thunderstorm: "../public/assets/thunder.png",
        snow: "../public/assets/snow.png",
        mist: "../public/assets/mist.png",
    }



    function handleCity(evt) {
        setCity(evt.target.value)
    }

    function handleWeather() {
        let weatherData = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=54577e32768b5686311705a4728a44bd`)

        weatherData.then(function (value) {
            setwdatas({
                temp: value.data.main.temp,
                Desc: value.data.weather[0].description,
                Weather: value.data.weather[0].main,
            })

        })
            .catch(function (value) {
                alert("Please enter the correct location")
            })
    }

    const weatherKey = wdatas.Weather?.toLowerCase();
    const img = weatherImages[weatherKey] || "../public/assets/default.png"


    return (
        <>
            <div className="containerbox relative">
                <img className="bg-image" src={image} alt="landingpage" />

                <div className="card-box bg-white/20 backdrop-blur-sm absolute top-80 md:top-90 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 items-center py-4 px-4 border-2 border-white rounded-2xl w-fit">
                    <div className="input-fields flex gap-2">
                        <input className="border-white border rounded-md px-2 text-white" type="text" placeholder="Enter city name" value={city} onChange={handleCity} />
                        <div onClick={handleWeather} className="icon border-white border rounded-md flex justify-center items-center bg w-8 h-8 cursor-pointer">
                            <MagnifyingGlassIcon className="w-12 h-12 rounded-md stroke-white" />
                        </div>
                    </div>
                    <div className="deg w-full flex flex-col items-center">
                        <img src={img} className="w-80 h-80  md:w-full h-full " alt="Sun-cloud-mid-rain" />
                        <h1 className="text-6xl font-bold text-white">{Math.round(wdatas.temp)}°C</h1>
                        <p className="text-white">{city}</p>
                    </div>
                    <hr className=" border-white border w-47" />
                    <div className="weather-details flex items-center justify-around w-full">
                        <div className="grid grid-cols-3 gap-4 content-center text-center w-70">
                            {
                                Object.entries(wdatas).map(([key, value]) => (
                                    <div key={key} className="bg-white/20 backdrop-blur-md rounded-xl p-2 text-center w-full ">
                                        <h2 className="text-sm font-semibold text-gray-200 uppercase w-full">
                                            {key}
                                        </h2>

                                        <p className=" text-sm md:text-xl font-bold text-white text-center w-full mt-2">
                                            {key === "temp" ? `${value}°C` : value}

                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Weatherapp