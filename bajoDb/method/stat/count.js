import { convert } from 'ts-mqes'

async function count ({ schema, filter = {}, options = {} }) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = getInfo(schema)
  const { get } = this.bajo.helper._
  const criteria = filter.query ? convert(filter.query) : undefined
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
