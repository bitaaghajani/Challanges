import axios from "axios";
import Link from "next/link";
import { useMutation } from "react-query";
import { useState } from "react";
import Details from "./Details";
import WeeklyDetails from "./WeeklyDetails";

export default function Search() {
  const [location, setLocation] = useState("");
  const fetchWeather = async (e) => {
    e.preventDefault();
    const api = `https://api.openweathermap.org/data/2.5/forecast?q=${e.target[0].value}&appid=38230cda32aa3e75cbf530e3c68d59be`;
    const serachWeather = `https://api.openweathermap.org/data/2.5/weather?q=${e.target[0].value}&appid=38230cda32aa3e75cbf530e3c68d59be`;
    const resCurrent=await axios.get(serachWeather).then(res=>res.data)
    const resWeekly = await axios.get(api).then((res) => res.data.list);
    return {
      resCurrent,
      resWeekly,
    };
  };
  const currentLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=38230cda32aa3e75cbf530e3c68d59be`
      );
      const data = await res.json();
      setLocation(data.name);
    });
  };
  const { data, mutate, isLoading, isError, error, isSuccess } =
    useMutation(fetchWeather);

  return (
    <div className="container">
      <form className="form" onSubmit={mutate}>
        <input
          type="text"
          id="name"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="enter location"
        />
        <div className="dropdown">
          <button type="button" className="btn">
            <i class="fa-sharp fa-solid fa-location-dot"></i>
          </button>
          <div className="dropdown--content">
            <Link href="#" className="link" onClick={currentLocation}>
              Current location
            </Link>
          </div>
        </div>
      </form>
      {isLoading && <h2>loading...</h2>}
      {isError && <h2>{error.message}</h2>}
      {isSuccess && (
        <div>
          <Details data={data?.resCurrent} />
          <WeeklyDetails week={data?.resWeekly} />
        </div>
      )}
    </div>
  );
}

// requirements
// name: "Tehran"
// wind {deg: 100 speed: 4.12}
// humidity: 10
// pressure: 1013
// temp: 307
// temp_max: 308.94
// temp_min: 306.88
// main: 'Clouds', description: 'broken clouds', icon: '04d'
