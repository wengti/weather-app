
export default function convertToTargetDate(currentDateObj: Date, targetTimezoneOffsetSecond:number):Date{

    // Get timezone offset from current dateObj
    // Add this value to get the time at GMT+0 (i.e GMT+8 -> -8hrs -> -8*60*60*1000ms)
    const curTimezoneOffset = currentDateObj.getTimezoneOffset() * 60 * 1000 // Convert from minute to miliseconds

    // targetTimezoneOffsetMs
    // Add this value to the time at GMT+0 to get the target timezone (i.e. NY: GMT-5 -> -5hrs -> -5*60*60*1000ms)
    const targetTimezoneOffsetMs = targetTimezoneOffsetSecond * 1000

    // Total offset
    const totalOffsetMs = curTimezoneOffset + targetTimezoneOffsetMs

    // Add the offset
    const targetTime = currentDateObj.getTime() + totalOffsetMs

    // Get the target timezone time
    const targetDateObj = new Date(targetTime)

    return targetDateObj

}

