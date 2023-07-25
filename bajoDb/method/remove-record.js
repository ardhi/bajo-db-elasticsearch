import getRecord from './get-record.js'

async function removeRecord ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { thrownNotFound = true } = options
  const rec = await getRecord.call(this, { schema, id, options: { thrownNotFound } })
  await instance.client.delete({ id, index: schema.collName })
  return rec
}

export default removeRecord
