const validateDurationMustBeRound = function (startTime, errorMessage) {
    return this.test('durationMustBeRound', errorMessage, function (value) {
        try {
            const [hours1, minutes1] = startTime.split(':').map(Number);
            const [hours2, minutes2] = value.split(':').map(Number);
            const totalMinutes1 = hours1 * 60 + minutes1;
            const totalMinutes2 = hours2 * 60 + minutes2;
            const timeDifference = Math.abs(totalMinutes1 - totalMinutes2);
            return timeDifference % 10 === 0;
        } catch {
            return false;
        }
    });
}

export default validateDurationMustBeRound