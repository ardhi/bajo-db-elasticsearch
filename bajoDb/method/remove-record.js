import getRecord from './get-record.js'

async function removeRecord ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const rec = await getRecord.call(this, { schema, id })
  await instance.client.delete({ id, index: schema.collName })
  return { old: rec }
}

export default removeRecord
