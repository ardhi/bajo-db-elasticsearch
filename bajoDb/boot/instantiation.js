import { Client } from '@elastic/elasticsearch'
import createIndex from '../../lib/create-index.js'

async function instancing ({ connection, schemas, noRebuild }) {
  const { importPkg, log } = this.bajo.helper
  const { pick, omit } = await importPkg('lodash-es')
  this.bajoDbElasticsearch.instances = this.bajoDbElasticsearch.instances || []
  const instance = pick(connection, ['name', 'type'])
  instance.client = new Client(omit(connection, ['name', 'type']))
  this.bajoDbElasticsearch.instances.push(instance)
  if (noRebuild) return
  for (const schema of schemas) {
    try {
      const exists = await instance.client.indices.exists({ index: schema.collName })
      if (exists) continue
      await createIndex.call(this, { schema, instance })
      log.trace('Model \'%s@%s\' successfully built on the fly', schema.name, connection.name)
    } catch (err) {
      log.error('Error on \'%s\': %s', connection.name, err.message)
    }
  }
}

export default instancing
