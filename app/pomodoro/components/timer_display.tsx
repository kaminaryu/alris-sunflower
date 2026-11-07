export default function TimerDisplay({time}: {time: number}) {
    const timeInSeconds = Math.floor(time / 1000);
    const timeInMinutes = Math.floor(timeInSeconds / 60);
    const timeInHours   = Math.floor(timeInMinutes / 60);

    const timeInMinutesClamped = timeInMinutes % 60;
    const timeInSecondsClamped = timeInSeconds % 60;


    const paddedHours: String   = timeInHours.toString().padStart(2, "0");
    const paddedMinutes: String = timeInMinutesClamped.toString().padStart(2, "0");
    const paddedSeconds: String = timeInSecondsClamped.toString().padStart(2, "0");

    return (
        <p className="text-5xl">
            {paddedHours}:{paddedMinutes}<span className="text-3xl">.{paddedSeconds}</span>
        </p>
    )
}
