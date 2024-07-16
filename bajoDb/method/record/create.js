import getRecord from './get.js'

async function recordCreate ({ schema, body, options = {} } = {}) {
  const { getInfo } = this.app.bajoDb
  const { noResult } = options
  const { instance } = getInfo(schema)
  const resp = await instance.client.index({
    index: schema.collName,
    id: body.id,
    document: body
  })
  if (noResult) return
  return await getRecord.call(this, { schema, id: resp._id })
}

export default recordCreate
