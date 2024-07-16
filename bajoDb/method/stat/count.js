import { convert } from 'ts-mqes'

async function statCount ({ schema, filter = {}, options = {} }) {
  const { getInfo } = this.app.bajoDb
  const { instance } = getInfo(schema)
  const { get } = this.app.bajo.lib._
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

export default statCount
