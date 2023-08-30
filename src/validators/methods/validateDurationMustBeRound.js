const NOUGHT = 0
const TEN = 10
const SIXTY = 60

const validateDurationMustBeRound = function (startTime, errorMessage) {
    return this.test('durationMustBeRound', errorMessage, function (value) {
        try {
            const splitStartTimeString = startTime.split(':')
            const splitValueString = value.split(':')
            const [hours1, minutes1] = splitStartTimeString.map(Number);
            const [hours2, minutes2] = splitValueString.map(Number);
            const totalMinutes1 = hours1 * SIXTY + minutes1;
            const totalMinutes2 = hours2 * SIXTY + minutes2;
            const timeDifference = Math.abs(totalMinutes1 - totalMinutes2);
            
            return timeDifference % TEN === NOUGHT;
        } catch {
            return false;
        }
    });
}

export default validateDurationMustBeRound