import create from './create.js'
import drop from './drop.js'

async function clear ({ schema, options = {} } = {}) {
  const { recreate = true } = options
  const { getInfo } = this.bajoDb.helper
  const { instance } = getInfo(schema)
  if (recreate) {
    await drop.call(this, schema)
    await create.call(this, schema)
  } else {
    await instance.client.deleteByQuery({
      index: schema.collName,
      query: { match_all: {} }
    })
  }
  return true
}

export default clear
