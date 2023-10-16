import * as yup from 'yup';
import validateMinStartTime from '../methods/validateMinStartTime';
import validateDuration10min3hours from '../methods/validateDuration10min3hours';
import validateDurationMustBeRound from '../methods/validateDurationMustBeRound';

yup.addMethod(yup.string, 'isOneHourLater', validateMinStartTime);
yup.addMethod(yup.mixed, 'duration10min3hours', validateDuration10min3hours);
yup.addMethod(yup.mixed, 'durationMustBeRound', validateDurationMustBeRound);

export default yup;
