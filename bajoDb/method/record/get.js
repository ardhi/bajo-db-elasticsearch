async function get ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { importPkg } = this.bajo.helper
  const { get } = await importPkg('lodash-es')
  const { error } = this.bajo.helper
  const { thrownNotFound = true } = options
  let result
  try {
    result = await instance.client.get({
      index: schema.repoName,
      id
    })
  } catch (err) {
    if (!get(err, 'meta.body.found') && thrownNotFound) throw error('Record \'%s@%s\' not found!', id, schema.name, { statusCode: 404 })
    throw err
  }
  return { data: result._source }
}

export default get
