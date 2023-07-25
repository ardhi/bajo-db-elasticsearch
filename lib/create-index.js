async function createIndex ({ schema, instance }) {
  // const { importPkg } = this.bajo.helper
  // const { has, isPlainObject, isString, omit, merge } = await importPkg('lodash-es')
  const client = instance.client
  const properties = {}
  for (const p of schema.properties) {
    if (p.name === 'id') continue
    let type = p.type
    let format
    switch (type) {
      case 'smallint': type = 'short'; break
      case 'string': type = 'keyword'; break
      case 'datetime':
        type = 'date'
        format = 'date_time'
        break
      case 'date':
        type = 'date'
        format = 'date'
        break
      case 'time':
        type = 'date'
        format = 'time'
        break
      case 'timestamp':
        type = 'date'
        format = 'epoch_millis'
        break
    }

    properties[p.name] = {
      type
    }
    if (format) properties[p.name].format = format
  }
  const mappings = { properties }
  await client.indices.create({
    index: schema.collName,
    mappings
  })
}

export default createIndex
