(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const sleep = require('then-sleep')
  const getStudentData = require('./lib/get-tjommi-data')
  const updateDocument = require('./lib/update-document')
  const logger = require('./lib/logger')
  const documents = require('./data/documents-copy.json')
  let documentsDone = []
  let documentsError = []

  try {
    const requiredDocumentsDone = require('./data/documents-done.json')
    documentsDone = requiredDocumentsDone
    logger('info', ['index', 'got', 'documents-done'])
  } catch (error) {
    logger('warn', ['index', 'no', 'documents-done', 'to be found'])
  }
  try {
    const requiredDocumentsError = require('./data/documents-error.json')
    documentsError = requiredDocumentsError
    logger('info', ['index', 'got', 'documents-error'])
  } catch (error) {
    logger('warn', ['index', 'no', 'documents-error', 'to be found'])
  }
  while (documents.length > 0) {
    await sleep(1000)
    logger('info', ['index', 'got', documents.length, 'documents left'])
    const document = documents.pop()
    const { _id, userId: teacher, studentUserName: student } = document
    logger('info', ['index', 'document', _id, 'start'])
    logger('info', ['index', 'document', _id, 'student', student, 'teacher', teacher, 'lookup student', 'start'])
    try {
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
        process.exit(1)
      }
    } catch (error) {
      logger('error', ['index', 'document', _id, 'student', student, 'teacher', teacher, 'lookup student', error])
      documentsError.push({ document, success: false, error: error.message })
      await writeFile('data/documents-error.json', JSON.stringify(documentsError, null, 2), 'utf-8')
    }
  }
  logger('info', ['index', 'finished'])
  process.exit()
})()
