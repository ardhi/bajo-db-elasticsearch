import { convert } from 'ts-mqes'

async function find ({ schema, filter = {}, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = getInfo(schema)
  const { map, forOwn, isEmpty, get, omit } = this.bajo.helper._
  const { prepPagination } = this.bajoDb.helper
  const { limit, skip, query, sort, page } = await prepPagination(filter, schema)
  const criteria = query ? convert(query) : undefined
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
  let count = 0
  if (options.count && !options.dataOnly) count = get(resp.hits, 'total.value')
  let result = { data: results, page, limit, count, pages: Math.ceil(count / limit) }
  if (!options.count) result = omit(result, ['count', 'pages'])
  return result
}

export default find
