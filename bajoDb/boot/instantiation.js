import { Client } from '@elastic/elasticsearch'
import createIndex from '../method/coll/create.js'
import collExists from '../method/coll/exists.js'

async function instantiation ({ connection, schemas, noRebuild }) {
  const { log } = this.bajo.helper
  const { pick, omit } = this.bajo.helper._
  this.bajoDbElasticsearch.instances = this.bajoDbElasticsearch.instances ?? []
  const instance = pick(connection, ['name', 'type'])
  instance.client = new Client(omit(connection, ['name', 'type']))
  this.bajoDbElasticsearch.instances.push(instance)
  if (noRebuild) return
  for (const schema of schemas) {
    try {
      const exists = await collExists.call(this, schema)
      if (exists) continue
      await createIndex.call(this, schema)
      log.trace('Model \'%s@%s\' successfully built on the fly', schema.name, connection.name)
    } catch (err) {
      log.error('Error on \'%s\': %s', connection.name, err.message)
    }
  }
}

export default instantiation
