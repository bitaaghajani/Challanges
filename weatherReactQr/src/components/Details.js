

export default function Details({ data}) {
    return (
        <>
            {/* optional chaining ?. before object */}

            <div className="cityDetails" key={data?.id}>
                <h1>{data?.name}</h1>
                <span>temp:{Math.round(data?.main?.temp - 32 / 1.8)}'C</span>
                <span>min-temp:{Math.round(data?.main?.temp_min - 32 / 1.8)}'C</span>
                <span>max-temp:{Math.round(data?.main?.temp_max - 32 / 1.8)}'C</span>
                {/* <span>description:{data?.weather[0]?.description}</span> isuue when render the website otherwise it shows */}
                <span>humidity:{data?.main?.humidity}</span>
                <span>windspeed:{Math.round(data?.wind?.speed)}</span>
                <span>wind Direction:{Math.round(data?.wind?.deg)}</span>
            </div>

        </>
    )
} 