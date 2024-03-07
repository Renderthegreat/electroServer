export default function sqliteConnector(options) {
  const getDB = () => globalThis.__cf_env__[options.bindingName];
  return {
    name: "cloudflare-d1",
    exec: (sql) => getDB().exec(sql),
    prepare: (sql) => {
      const _stmt = getDB().prepare(sql);
      const onError = (err) => {
        if (err.cause) {
          err.message = err.cause.message + ' "' + sql + '"';
        }
        throw err;
      };
      const stmt = {
        bind(...params) {
          _stmt.bind(...params);
          return stmt;
        },
        all(...params) {
          return _stmt.bind(...params).all().catch(onError);
        },
        run(...params) {
          return _stmt.bind(...params).run().then((res) => {
            return { success: res.success };
          }).catch(onError);
        },
        get(...params) {
          return _stmt.bind(...params).first().catch(onError);
        }
      };
      return stmt;
    }
  };
}
