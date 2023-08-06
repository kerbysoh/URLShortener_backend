const Pool = require("pg").Pool

const pool = new Pool({
    user: "kerbysoh",
    password: "rZUdSpTScD8Mb4olzm0CzSbKGmKHLIsq",
    host: "dpg-cj7kp24l975s738fine0-a.singapore-postgres.render.com",
    port: 5432,
    database: "shrtn_1idm",
    ssl: {
        rejectUnauthorized: false
    },
})


module.exports = pool