const { ObjectId } = require('mongodb')
const mongo = require('./mongo')
const logger = require('./logger')

module.exports = async options => {
  const db = await mongo()
  const logs = db.collection(process.env.MONGODB_COLLECTION)
  const { _id, studentMainGroupName } = options
  logger('info', ['lib', 'update-document', _id, 'studentMainGroupName', studentMainGroupName, 'start'])
  const result = await logs.updateOne({ _id: ObjectId(_id) }, { $set: { studentMainGroupName: studentMainGroupName } })
  logger('info', ['lib', 'update-document', _id, 'studentMainGroupName', studentMainGroupName, 'success'])
  return result
}
