async function collExists ({ schema, options = {} }) {
  const { getInfo } = this.app.bajoDb
  const { instance } = getInfo(schema)
  const exists = await instance.client.indices.exists({ index: schema.collName })
  return !!exists
}

export default collExists
