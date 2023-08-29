const validateDuration10min3hours = function (startTime, errorMessage) {
    return this.test('duration10min3hours', errorMessage, function (value) {
        try {
            const start_time_hours = parseInt(startTime.split(':')[0]);
            const end_time_hours = parseInt(value.split(':')[0]);
            const start_time_minutes = parseInt(startTime.split(':')[1]);
            const end_time_minutes = parseInt(value.split(':')[1]);
            const maxDifference = 180; // 3 hours in 10-minute increments
            const minDifference = 1; // 10 minutes in 10-minute increments
            const start_time = start_time_hours * 6 + start_time_minutes / 10;
            const end_time = end_time_hours * 6 + end_time_minutes / 10;
            const timeDifference = end_time - start_time;

            if (timeDifference > maxDifference) {
                return false;
            }

            if (timeDifference < minDifference) {
                return false;
            }

            return true;
        } catch {
            return false;
        }
    });
}

export default validateDuration10min3hours