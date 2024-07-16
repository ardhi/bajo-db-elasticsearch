async function connSanitizer (conn) {
  const { cloneDeep, has } = this.app.bajo.lib._
  if (has(conn, 'cloud')) {
    if (!conn.cloud.id) this.fatal('\'%s@%s\' key is required', 'cloud.id', conn.name, { payload: conn })
  } else if (!has(conn, 'node')) this.fatal('\'%s@%s\' key is required', 'node', conn.name, { payload: conn })
  if (conn.auth) {
    if ((!conn.auth.apiKey) || (!conn.auth.bearer)) {
      if (!conn.auth.username) this.fatal('\'%s@%s\' key is required', 'auth.username', conn.name, { payload: conn })
      if (!conn.auth.password) this.fatal('\'%s@%s\' key is required', 'auth.password', conn.name, { payload: conn })
    }
  }
  const result = cloneDeep(conn)
  return result
}

export default connSanitizer
