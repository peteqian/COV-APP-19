
export const LocationCheckInHistory = (props) => {
    const { placeName, date, time } = props;
    return (
        <div>
            <p>
                {placeName}<br/>
                {date}, {time}
            </p>
        </div>
    )
}