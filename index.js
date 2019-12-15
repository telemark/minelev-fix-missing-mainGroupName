(async () => {
  require('dotenv').config()
  const getStudentData = require('./lib/get-tjommi-data')
  const logger = require('./lib/logger')
  const documents = require('./data/documents-copy.json')
  logger('info', ['index', 'got', documents.length, 'documents left'])
  const document = documents.pop()
  const { _id, userId: teacher, studentUserName: student } = document
  logger('info', ['index', 'document', _id, 'start'])
  logger('info', ['index', 'document', _id, 'student', student, 'teacher', teacher, 'lookup student', 'start'])
  const data = await getStudentData({ student, teacher })
  logger('info', ['index', 'document', _id, 'student', student, 'teacher', teacher, 'lookup student', 'success'])
  console.log(JSON.stringify(data, null, 2))
  const { mainGroupName } = data
  logger('info', ['index', 'document', _id, 'student', student, 'teacher', teacher, 'mainGroupName', mainGroupName])
})()
