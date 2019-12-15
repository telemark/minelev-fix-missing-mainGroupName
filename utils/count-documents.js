(async () => {
  require('dotenv').config()
  const mongo = require('../lib/mongo')
  const logger = require('../lib/logger')
  const db = await mongo()
  const logs = db.collection(process.env.MONGODB_COLLECTION)
  const query = {
    studentMainGroupName: { $exists: true, $in: [''] }
  }

  const counts = await logs.countDocuments(query)
  logger('info', ['utils', 'count-douments', 'total', counts, 'documents'])

  process.exit(0)
})()
