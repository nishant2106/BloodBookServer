const Pool = require("pg").Pool;
const pool = new Pool({
  host: "dpg-ccmtac9a6gdh5kdkpfkg-a.singapore-postgres.render.com",
  user: "bloodbanksystem_user",
  password: "J9KfmP7veTQ9v1EHMcApqnmEDSTgnVlX",
  database: "bloodbanksystem",
});
exports.pool = pool;
