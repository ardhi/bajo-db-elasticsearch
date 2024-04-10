import getRecord from './get.js'

async function update ({ schema, id, body, options } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { noResult } = options
  const { instance } = await getInfo(schema)
  const old = noResult ? undefined : await getRecord.call(this, { schema, id })
  await instance.client.update({
    id,
    index: schema.collName,
    doc: body
  })
  if (noResult) return
  const result = await getRecord.call(this, { schema, id })
  return { oldData: old.data, data: result.data }
}

export default update
