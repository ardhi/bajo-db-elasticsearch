import getRecord from './get-record.js'

async function updateRecord ({ schema, id, body, options } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const old = await getRecord.call(this, { schema, id })
  await instance.client.update({
    id,
    index: schema.collName,
    doc: body
  })
  const result = await getRecord.call(this, { schema, id })
  return { old: old.data, new: result.data }
}

export default updateRecord
