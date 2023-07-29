import { convert } from 'ts-mqes'

async function find ({ schema, filter = {}, options = {} } = {}) {
  const { importPkg } = this.bajo.helper
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { map, forOwn, isEmpty, get } = await importPkg('lodash-es')
  const { prepPagination } = this.bajoDb.helper
  const { limit, skip, query, sort, page } = await prepPagination(filter, schema)
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
    track_total_hits: !options.dataOnly,
    sort: isEmpty(sorts) ? undefined : sorts.join(',')
  })
  const results = map(resp.hits.hits, '_source')
  const count = options.dataOnly ? 0 : get(resp.hits, 'total.value')
  return { data: results, page, limit, count, pages: Math.ceil(count / limit) }
}

export default find
