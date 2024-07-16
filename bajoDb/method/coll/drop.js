async function collDrop ({ schema, options = {} }) {
  const { getInfo } = this.app.bajoDb
  const { instance } = getInfo(schema)
  await instance.client.indices.delete({ index: schema.collName })
}

export default collDrop
