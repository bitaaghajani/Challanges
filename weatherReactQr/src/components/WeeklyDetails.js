export default function WeeklyDetails({ week }) {   
    let dt=1685988000;
    let date =new Date(dt *1000);
    let hour=date.getHours();
    let mins=date.getMinutes();
    let secs=date.getSeconds();
    let time=`${hour}:${mins}:${secs}`
    // this is how to convert time or not???
    // it gives me my current time 
    console.log(time)
    return (
        <div className="weekly">
            <div className="dayDetails">
                <h2>{week[0]?.dt_txt}</h2>
                <span>temp:{Math.round(week[0]?.main?.temp - 32 / 1.8)}'C</span>
                <span>min-temp:{Math.round(week[0]?.main?.temp_min - 32 / 1.8)}'C</span>
                <span>max-temp:{Math.round(week[0]?.main?.temp_max - 32 / 1.8)}'C</span>
                <span>humidity:{week[0]?.main?.humidity}</span>
                <span>windspeed:{Math.round(week[0]?.wind?.speed)}</span>
                <span>wind Direction:{Math.round(week[0]?.wind?.deg)}</span>
            </div>
            <div className="dayDetails">
                <h2>{week[8]?.dt_txt}</h2>
                <span>temp:{Math.round(week[8]?.main?.temp - 32 / 1.8)}'C</span>
                <span>min-temp:{Math.round(week[8]?.main?.temp_min - 32 / 1.8)}'C</span>
                <span>max-temp:{Math.round(week[8]?.main?.temp_max - 32 / 1.8)}'C</span>
                <span>humidity:{week[8]?.main?.humidity}</span>
                <span>windspeed:{Math.round(week[8]?.wind?.speed)}</span>
                <span>wind Direction:{Math.round(week[8]?.wind?.deg)}</span>
            </div>
            <div className="dayDetails">
                <h2>{week[16]?.dt_txt}</h2>
                <span>temp:{Math.round(week[8]?.main?.temp - 32 / 1.8)}'C</span>
                <span>min-temp:{Math.round(week[8]?.main?.temp_min - 32 / 1.8)}'C</span>
                <span>max-temp:{Math.round(week[8]?.main?.temp_max - 32 / 1.8)}'C</span>
                <span>humidity:{week[8]?.main?.humidity}</span>
                <span>windspeed:{Math.round(week[8]?.wind?.speed)}</span>
                <span>wind Direction:{Math.round(week[8]?.wind?.deg)}</span>
            </div>
        </div>
    )
}