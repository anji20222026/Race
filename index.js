const logger = require('./logger').Logger
const fastify = require('fastify')({ logger: true })
const RaceApp = require('./raceapp').RaceApp

let raceapp = new RaceApp()

raceapp.init()
raceapp.start()
console.log(raceapp)

// Declare a route
fastify.get('/', async (request, reply) => {
	return 'hello,world!'
})

// Run the server!
const start = async () => {
	raceapp.Sql.init
	try {
		await fastify.listen(3000)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

// // Run the server!
// const start = async () => {
// 	try {
// 		await fastify.listen(3000)
// 	} catch (err) {
// 		fastify.log.error(err)
// 		process.exit(1)
// 	}
// }

// Run the server!
const start2 = async () => {
	try {
		await fastify.listen(3000)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()
start2()
