import { convert } from 'ts-mqes'

async function findRecord ({ schema, filter = {}, options = {} } = {}) {
  const { importPkg } = this.bajo.helper
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { map, forOwn, isEmpty } = await importPkg('lodash-es')
  const { prepPagination } = this.bajoDb.helper
  const { limit, skip, query, sort } = await prepPagination(filter, schema)
  const criteria = query ? convert(query.toJSON()) : undefined
  const sorts = []
  forOwn(sort, (v, k) => {
    sorts.push(`${k}:${v < 0 ? 'desc' : 'asc'}`)
  })
  const resp = await instance.client.search({
    query: criteria,
    index: schema.collName,
    from: skip,
    size: limit,
    sort: isEmpty(sorts) ? undefined : sorts.join(',')
  })
  return map(resp.hits.hits, '_source')
}

export default findRecord
