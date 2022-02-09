const normalizeInputs = (inputObject) => {
  for (const [key, value] of Object.entries(inputObject)) {
    if (key !== '_id' && typeof value === 'string') {
      inputObject[key] = value.toLowerCase()
    }
  }
}

module.exports = normalizeInputs
