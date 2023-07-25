async function sanitizer (conn) {
  const { importPkg, fatal } = this.bajo.helper
  const { cloneDeep, has } = await importPkg('lodash-es')
  if (has(conn, 'cloud')) {
    if (!conn.cloud.id) fatal('\'%s@%s\' key is required', 'cloud.id', conn.name, { code: 'BAJODBELASTICSEARCH_MISSING_CONNECTION_CLOUD_ID', payload: conn })
  } else if (!has(conn, 'node')) fatal('\'%s@%s\' key is required', 'node', conn.name, { code: 'BAJODBELASTICSEARCH_MISSING_CONNECTION_NODE', payload: conn })
  if (conn.auth) {
    if ((!conn.auth.apiKey) || (!conn.auth.bearer)) {
      if (!conn.auth.username) fatal('\'%s@%s\' key is required', 'auth.username', conn.name, { code: 'BAJODBELASTICSEARCH_INCOMPLETE_CONNECTION_AUTH', payload: conn })
      if (!conn.auth.password) fatal('\'%s@%s\' key is required', 'auth.password', conn.name, { code: 'BAJODBELASTICSEARCH_INCOMPLETE_CONNECTION_AUTH', payload: conn })
    }
  }
  const result = cloneDeep(conn)
  return result
}

export default sanitizer
