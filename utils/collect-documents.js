(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const mongo = require('../lib/mongo')
  const logger = require('../lib/logger')
  const db = await mongo()
  const logs = db.collection(process.env.MONGODB_COLLECTION)
  const query = {
    studentMainGroupName: { $exists: true, $in: [''] }
  }

  logger('info', ['utils', 'collect-documents', 'start'])
  const data = await logs.find(query).toArray()
  logger('info', ['utils', 'collect-documents', 'got', data.length, 'documents'])
  const documents = data.map(document => Object.assign({ _id: document._id, studentMainGroupName: document.studentMainGroupName, documentDate: document.documentDate, schoolId: document.schoolId, documentType: document.documentType, documentCategory: document.documentCategory, studentUserName: document.studentUserName, userId: document.userId }))
  await writeFile('data/documents.json', JSON.stringify(documents, null, 2), 'utf-8')
  await writeFile('data/documents-copy.json', JSON.stringify(documents, null, 2), 'utf-8')
  logger('info', ['utils', 'collect-documents', 'got', 'documents saved to file'])
  process.exit(0)
})()
