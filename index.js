(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const getStudentData = require('./lib/get-tjommi-data')
  const updateDocument = require('./lib/update-document')
  const logger = require('./lib/logger')
  const documents = require('./data/documents-copy.json')
  let documentsDone = []
  try {
    const requiredDocumentsDone = require('./data/documents-done.json')
    documentsDone = requiredDocumentsDone
    logger('info', ['index', 'got', 'documents-done'])
  } catch (error) {
    logger('warn', ['index', 'no', 'documents-done', 'to be found'])
  }
  logger('info', ['index', 'got', documents.length, 'documents left'])
  const document = documents.pop()
  const { _id, userId: teacher, studentUserName: student } = document
  logger('info', ['index', 'document', _id, 'start'])
  logger('info', ['index', 'document', _id, 'student', student, 'teacher', teacher, 'lookup student', 'start'])
  const data = await getStudentData({ student, teacher })
  logger('info', ['index', 'document', _id, 'student', student, 'teacher', teacher, 'lookup student', 'success'])
  const { mainGroupName: studentMainGroupName } = data
  logger('info', ['index', 'document', _id, 'student', student, 'teacher', teacher, 'studentMainGroupName', studentMainGroupName])
  try {
    const result = await updateDocument({ _id, studentMainGroupName })
    logger('info', ['index', 'document', _id, 'student', student, 'teacher', teacher, 'studentMainGroupName', studentMainGroupName, 'result', result])
    documentsDone.push({ document, studentMainGroupName: studentMainGroupName, success: true })
    await writeFile('data/documents-done.json', JSON.stringify(documentsDone, null, 2), 'utf-8')
    await writeFile('data/documents-copy.json', JSON.stringify(documents, null, 2), 'utf-8')
  } catch (error) {
    logger('error', ['index', 'document', _id, 'student', student, 'teacher', teacher, 'studentMainGroupName', studentMainGroupName, 'result', error])
  }
  process.exit()
})()
