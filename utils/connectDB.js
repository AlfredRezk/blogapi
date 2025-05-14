const { connect } = require('mongoose')

async function connectDB(mongoUrl) {
  try {
    const conn = await connect(mongoUrl)
    console.log(
      `Connect to DB: ${conn.connection.host} - ${conn.connection.name}`
        .bgYellow,
    )
  } catch (error) {
    console.log(`DB Error: ${error.message}`.bgRed)
  }
}

module.exports = connectDB
