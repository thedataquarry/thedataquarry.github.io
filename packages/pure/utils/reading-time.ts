'use strict'

/**
 * Checks if a character is a CJK character
 * @param {string} char - The character to check
 * @returns {boolean} - Returns true if the character is CJK, otherwise false
 */
function isCJK(char: string): boolean {
  const charCode = char.charCodeAt(0)
  return (
    (charCode >= 0x4e00 && charCode <= 0x9fff) || // CJK Unified Ideographs
    (charCode >= 0x3400 && charCode <= 0x4dbf) || // CJK Unified Ideographs Extension A
    (charCode >= 0x20000 && charCode <= 0x2a6df) || // CJK Unified Ideographs Extension B
    (charCode >= 0x2a700 && charCode <= 0x2b73f) || // CJK Unified Ideographs Extension C
    (charCode >= 0x2b740 && charCode <= 0x2b81f) || // CJK Unified Ideographs Extension D
    (charCode >= 0x2b820 && charCode <= 0x2ceaf) || // CJK Unified Ideographs Extension E
    (charCode >= 0xf900 && charCode <= 0xfaff) || // CJK Compatibility Ideographs
    (charCode >= 0x2f800 && charCode <= 0x2fa1f) // CJK Compatibility Ideographs Supplement
  )
}

interface ReadingTimeResult {
  text: string
  minutes: number
  time: number
  words: number
}

/**
 * Calculates the reading time of a text
 * @param {string} text - The text to calculate
 * @param {number} wordsPerMinute - The number of words read per minute, default is 200
 * @returns {ReadingTimeResult} - An object containing the reading time
 */
export function getReadingTime(text: string, wordsPerMinute: number = 200): ReadingTimeResult {
  let words = 0
  const length = text.length

  // Normalize text by adding a space at the end
  const normalizedText = text + ' '

  for (let i = 0; i < length; i++) {
    const char = normalizedText[i]

    // If the character is CJK, count it as a word
    if (isCJK(char)) {
      words++
      // Skip subsequent punctuation and whitespace characters
      while (i < length && (normalizedText[i + 1] === ' ' || isCJK(normalizedText[i + 1]))) {
        i++
      }
    } else if (char === ' ' || char === '\n' || char === '\r') {
      // Count the end of a word when encountering whitespace characters
      if (
        i > 0 &&
        normalizedText[i - 1] !== ' ' &&
        normalizedText[i - 1] !== '\n' &&
        normalizedText[i - 1] !== '\r'
      ) {
        words++
      }
    }
  }

  // Calculate reading time
  const minutes = words / wordsPerMinute
  const time = Math.round(minutes * 60 * 1000) // Convert to milliseconds
  const displayed = Math.ceil(minutes)

  return {
    text: displayed + ' min read',
    minutes: minutes,
    time: time,
    words: words
  }
}

// Export module
export default getReadingTime
