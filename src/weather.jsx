import React, { useState } from "react"
import axios from "axios";
import './index.css';
import image from "../public/assets/Image.png"
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function Weatherapp() {

    const [city, setCity] = useState("")
    const [wdatas, setwdatas] = useState({ temp: "", Desc: "", Weather: "" })
    const weatherImages = {
        clear: "/assets/clear.png",
        clouds: "/assets/clouds.png",
        rain: "/assets/rain.png",
        drizzle: "/assets/drizzle.png",
        thunderstorm: "/assets/thunder.png",
        snow: "/assets/snow.png",
        mist: "/assets/mist.png",
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

                <div className="main-content absolute  top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 content-center lg:top-30">
                    <div className="content  text-center">
                        <h2 className="font-bold text-white text-2xl">Weather App</h2>
                        <p className="font-normal text-white inline-block w-full">Get real-time weather updates for any location</p>
                    </div>
                    <div className="card-box bg-white/20 backdrop-blur-sm absolute top-70 md: left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 items-center py-4 px-4 border-2 border-white rounded-2xl w-fit">
                        <div className="input-fields flex gap-2">
                            <input className="border-white border rounded-md px-2 text-white" type="text" placeholder="Enter city name" value={city} onChange={handleCity} />
                            <div onClick={handleWeather} className="icon border-white border rounded-md flex justify-center items-center bg w-8 h-8 p-1 cursor-pointer">
                                <MagnifyingGlassIcon className="search-icon w-8 h-8 rounded-md stroke-white" />
                            </div>
                        </div>
                        <div className="deg w-full flex flex-col items-center">
                            <img src={img} className="w-40 h-40 " alt="Sun-cloud-mid-rain" />
                            <h1 className="text-6xl font-bold text-white">{Math.round(wdatas.temp)}°C</h1>
                            <p className="text-white">{city}</p>
                        </div>
                        <hr className=" border-white border w-47" />
                        <div className="weather-details flex items-center justify-around w-full">
                            <div className="grid grid-cols-3 gap-4 content-center text-center w-70">
                                {
                                    Object.entries(wdatas).map(([key, value]) => (
                                        <div key={key} className="bg-white/20 backdrop-blur-md border-white border rounded-xl p-2 text-center w-full ">
                                            <h2 className="text-sm font-semibold text-shadow-black uppercase w-full">
                                                {key}
                                            </h2>

                                            <p className=" text-sm md:text-xl font-bold  text-center text-white text-shadow-black  w-full mt-2">
                                                {key === "temp" ? `${value}°C` : value}

                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Weatherapp