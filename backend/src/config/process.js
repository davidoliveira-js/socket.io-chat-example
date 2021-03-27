require('dotenv').config()
module.exports = {
	Secret : process.env.SECRET_KEY,
	mysqlPort:process.env.MYSQL_PORT,
	mysqlHost:process.env.MYSQL_HOST,
	mysqlUser:process.env.MYSQL_USER,
	mysqlDatabase:process.env.MYSQL_DATABASE,
	mysqlPassword:process.env.MYSQL_PASSWORD,
	mysqlClient:process.env.MYSQL_CLIENT,
}
