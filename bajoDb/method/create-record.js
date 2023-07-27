import getRecord from './get-record.js'

async function createRecord ({ schema, body, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const resp = await instance.client.index({
    index: schema.collName,
    id: body.id,
    document: body
  })
  const result = await getRecord.call(this, { schema, id: resp._id })
  return { data: result }
}

export default createRecord
