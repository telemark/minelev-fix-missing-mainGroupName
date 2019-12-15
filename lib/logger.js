const { name, version } = require('../package.json')

module.exports = (level, message) => {
  const data = Array.isArray(message) ? message : [message]
  const logMessage = `${new Date().toUTCString()} - ${level.toUpperCase()} - ${name} - ${version}: ${data.join(' - ')}`
  return console.log(logMessage)
}
