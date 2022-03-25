const logger = require('./logger').Logger
const fastify = require('fastify')({ logger: true })
const mysql2 = require('mysql2')
const Binance = require('node-binance-api')

const fs = require('fs')

class RaceApp {
	config
	Sql
	Exchange
	constructor() {}
	//加载配置
	loadConfig() {
		try {
			let rawdata = fs.readFileSync('config.json')
			this.config = JSON.parse(rawdata)
			console.log(this.config)
		} catch (error) {
			console.log(error)
		}
	}
	//初始化
	init() {
		this.loadConfig()
		this.Sql = new Sql(this.config.sql)
		this.Sql.connect()
		this.Exchange = new Exchange(this.config.exchange)
		this.Exchange.init()
	}
	//启动
	start() {
		console.log('start')

		let values = ['123456', 'BINANCE', 'ETHUSDT', '15m', 3911.1, 0.1, 321.11, 32934.1, 56, '111', opentime, pairtime, 1, 341.11]
		this.Sql.create(values)
	}
}

class Sql {
	sqlconfig
	pool
	constructor(sqlconfig) {
		this.sqlconfig = sqlconfig
	}
	connect() {
		// Create the connection pool. The pool-specific settings are the defaults
		const pool = mysql2.createPool({
			host: this.sqlconfig.host,

			user: this.sqlconfig.user,
			password: this.sqlconfig.password,
			database: this.sqlconfig.database,
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0,
		})
		let a = pool.getConnection(function (err, connection) {
			if (err) {
				console.log(err)
			}
		})
		this.pool = pool
	}
	createtrade(values) {
		;(async () => {
			let sql = 'INSERT INTO contractlong(orders,exchange,currency,interval,buyprice,quantity,liquidationprice,sellprice,income,strategyno,opentime,pairtime,status,balance) VALUES ?'
			const queryResult = await this.pool.query(sql, [values])
			console.log(queryResult)
		})()
	}
}
//交易所
class Exchange {
	exconfig
	binance
	constructor(config) {
		this.exconfig = config
	}
	init() {
		const binance = new Binance().options({
			APIKEY: this.exconfig.api,
			APISECRET: this.exconfig.scrt,
		})
		let a = binance.futuresAccount()
		let b = binance.futuresBalance()

		// Run the server!
		const fu = async () => {
			try {
				let a = await binance.futuresAccount()
				let b = await binance.futuresBalance()
				console.log(a)
				console.log(b)
			} catch (err) {
				fastify.log.error(err)
				process.exit(1)
			}
		}
		fu()
		// console.info(await binance.futuresAccount())
		// console.info(binance.futuresBalance())
		// binance.websockets.depth(['ETHUSDT'], (depth) => {
		// 	let { e: eventType, E: eventTime, s: symbol, u: updateId, b: bidDepth, a: askDepth } = depth
		// 	console.info(symbol + ' market depth update')
		// 	console.info(bidDepth, askDepth)
		// })

		// binance.websockets.depthCache(['ETHUSDT'], (symbol, depth) => {
		// 	let bids = binance.sortBids(depth.bids)
		// 	let asks = binance.sortAsks(depth.asks)
		// 	console.info(symbol + ' depth cache update')
		// 	console.info('bids', bids)
		// 	console.info('asks', asks)
		// 	console.info('best bid: ' + binance.first(bids))
		// 	console.info('best ask: ' + binance.first(asks))
		// 	console.info('last updated: ' + new Date(depth.eventTime))
		// })

		this.binance = this.binance
	}
}
module.exports = { RaceApp, Sql, Exchange }
