const axios = require('axios')
const generateToken = require('./generate-tjommi-token')
const logger = require('./logger')

module.exports = async options => {
  const { student, teacher } = options
  const url = `${process.env.TJOMMI_SERVICE_URL}/students/${student}`
  const token = generateToken(teacher)
  axios.defaults.headers.common.Authorization = token
  logger('info', ['lib', 'get-tjommi-data', 'student', student, 'teacher', teacher, 'start'])
  try {
    const { data } = await axios.get(url)
    logger('info', ['lib', 'get-tjommi-data', 'student', student, 'teacher', teacher, 'success'])
    if (data.length === 1) {
      return data[0]
    } else {
      const errorMessage = 'too many matches'
      logger('error', ['lib', 'get-tjommi-data', 'student', student, 'teacher', teacher, errorMessage])
      throw new Error(errorMessage)
    }
  } catch (error) {
    logger('error', ['lib', 'get-tjommi-data', 'student', student, 'teacher', teacher, error])
    throw error
  }
}
