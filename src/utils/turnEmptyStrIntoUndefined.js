export const turnEmptyStrIntoUnderfined = (value, originalValue) =>
    typeof originalValue === 'string' && originalValue?.trim() === ''
        ? undefined
        : value