import { convert } from 'ts-mqes'

async function find ({ schema, filter = {}, options = {} } = {}) {
  const { importPkg } = this.bajo.helper
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { map, forOwn, isEmpty, get, omit } = await importPkg('lodash-es')
  const { prepPagination } = this.bajoDb.helper
  const { limit, skip, query, sort, page } = await prepPagination(filter, schema)
  const { dataOnly, noCount } = options
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
    track_total_hits: !dataOnly,
    sort: isEmpty(sorts) ? undefined : sorts.join(',')
  })
  const results = map(resp.hits.hits, '_source')
  let count = 0
  if (!noCount && !dataOnly) count = get(resp.hits, 'total.value')
  let result = { data: results, page, limit, count, pages: Math.ceil(count / limit) }
  if (noCount) result = omit(result, ['count', 'pages'])
  return result
}

export default find
