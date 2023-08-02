import { convert } from 'ts-mqes'

async function count ({ schema, filter = {}, options = {} } = {}) {
  const { importPkg } = this.bajo.helper
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { get } = await importPkg('lodash-es')
  const { prepPagination } = this.bajoDb.helper
  const { query } = await prepPagination(filter, schema)
  const criteria = query ? convert(query.toJSON()) : undefined
  const resp = await instance.client.search({
    query: criteria,
    index: schema.collName,
    from: 0,
    size: 1,
    track_total_hits: true
  })
  const count = get(resp.hits, 'total.value')
  return { data: count }
}

export default count
