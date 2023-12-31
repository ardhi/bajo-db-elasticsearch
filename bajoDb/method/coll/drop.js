async function drop (schema) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  await instance.client.indices.delete({ index: schema.collName })
}

export default drop
