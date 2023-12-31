async function exists (schema) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const exists = await instance.client.indices.exists({ index: schema.collName })
  return !!exists
}

export default exists
