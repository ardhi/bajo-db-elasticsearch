import getRecord from './get.js'

async function recordUpdate ({ schema, id, body, options } = {}) {
  const { getInfo } = this.app.bajoDb
  const { noResult } = options
  const { instance } = getInfo(schema)
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

export default recordUpdate
