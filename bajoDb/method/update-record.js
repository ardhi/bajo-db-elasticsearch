import getRecord from './get-record.js'

async function updateRecord ({ schema, id, body, options } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { thrownNotFound = true } = options
  const old = await getRecord.call(this, { schema, id, options: { thrownNotFound } })
  await instance.client.update({
    id,
    index: schema.collName,
    doc: body
  })
  const result = await getRecord.call(this, { schema, id, options: { thrownNotFound } })
  return { old, new: result }
}

export default updateRecord
