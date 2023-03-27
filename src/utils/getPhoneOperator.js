export function getUkrainianOperator(phoneNumber) {
  phoneNumber = phoneNumber.replace(/\s|\+|-/g, '').substr(2);
  const firstThreeDigits = phoneNumber.slice(0, 3);

  const kyivstarRange = ['067', '068', '096', '097', '098'];
  const vodafoneRange = ['050', '066', '095', '099'];
  const lifecellRange = ['063', '073', '093'];

  // Check which operator the phone number belongs to
  if (kyivstarRange.includes(firstThreeDigits)) {
    return 'Kyivstar';
  } else if (vodafoneRange.includes(firstThreeDigits)) {
    return 'Vodafone';
  } else if (lifecellRange.includes(firstThreeDigits)) {
    return 'Lifecell';
  } else {
    return 'Unknown operator';
  }
}
