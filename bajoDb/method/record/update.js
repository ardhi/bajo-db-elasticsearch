import getRecord from './get.js'

async function update ({ schema, id, body, options } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const old = await getRecord.call(this, { schema, id })
  await instance.client.update({
    id,
    index: schema.collName,
    doc: body
  })
  const result = await getRecord.call(this, { schema, id })
  return { oldData: old.data, data: result.data }
}

export default update
