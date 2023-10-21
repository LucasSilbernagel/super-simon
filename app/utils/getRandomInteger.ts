/** Returns a random number from 1 to 4 */
export const getRandomInteger = () => {
  if (typeof window !== 'undefined' && window.crypto) {
    const randomArray = new Uint32Array(1)
    window.crypto.getRandomValues(randomArray)
    return randomArray[0] % 4
  } else if (typeof require !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const crypto = require('crypto')
    const randomBuffer = crypto.randomBytes(4)
    const randomValue = randomBuffer.readUInt32BE(0)
    return randomValue % 4
  } else {
    // Fallback for environments without crypto support
    console.warn(
      'Random number generation is not supported in this environment. Using Math.random() as a fallback.'
    )
    return Math.floor(Math.random() * 4)
  }
}
