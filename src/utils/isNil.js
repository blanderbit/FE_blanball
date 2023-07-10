/**
 * @param {any} value
 * @returns {boolean} returns true if the value equals to undefined or null
 */

export const isNil = (value) => value === undefined || value === null
export const isNotNil = (value) => !isNil(value)
