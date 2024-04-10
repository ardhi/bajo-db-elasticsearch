import getRecord from './get.js'

async function remove ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { noResult } = options
  const { instance } = await getInfo(schema)
  const rec = noResult ? undefined : await getRecord.call(this, { schema, id })
  await instance.client.delete({ id, index: schema.collName })
  if (noResult) return
  return { oldData: rec.data }
}

export default remove
