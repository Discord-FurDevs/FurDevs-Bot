// API written in express by charmines#1522
exports.run = async (client) => {
	const settings = require("./settings.json")
	const bodyParser = require("body-parser");
	const moment = require('moment')
	const erl = require('express-rate-limit')
	const express = require('express')
	let app = express()

	// Listen on port in settings
	app.listen(settings.APIPort, (err) => {
		if (err) {
			console.log(err)
		} else {
			console.log('Ready at port ' + settings.APIPort)
		}
	})

	// Handle requests
	app.use(bodyParser.json({ type: "application/json" }));
	app.use(express.urlencoded()) // Decode URLs

	// Ratelimit
	app.use(erl({
	  windowMs: 5 * 1000, // 5 Seconds
	  max: 10 // 10 request per windowMs
	}))

	// Handle XP API Requests
	app.get('/xp', async (req, res) => {
	  let target = await client.guilds.cache.get('731520035717251142').members.cache.get(req.param('userid'))
	  const profile = await target.settings()
	  res.json({
		"username": target.nickname,
		"data": profile.XP
	  })
	})

	// Handle Join Server Date API Requests
	app.get('/jsd', async (req, res) => {
	  let target = await client.guilds.cache.get('731520035717251142').members.cache.get(req.param('userid'))
	  const profile = await target.settings()
	  res.json({
		"username": target.nickname,
		"data": moment(target.joinedAt).format("LLLL")
	  })
	})

	// Handle Reputation API Requests
	app.get('/reputation', async (req, res) => {
	  let target = await client.guilds.cache.get('731520035717251142').members.cache.get(req.param('userid'))
	  const profile = await target.settings()
	  res.json({
		"username": target.nickname,
		"data": profile.reps
	  })
	})

	// Handle Level API Requests
	app.get('/level', async (req, res) => {
	  let target = await client.guilds.cache.get('731520035717251142').members.cache.get(req.param('userid'))
	  const profile = await target.settings()
	  res.json({
		"username": target.nickname,
		"data": profile.level
	  })
	})

	// Handle Coins API Requests
	app.get('/coins', async (req, res) => {
	  let target = await client.guilds.cache.get('731520035717251142').members.cache.get(req.param('userid'))
	  const profile = await target.settings()
	  res.json({
		"username": target.nickname,
		"data": profile.coins
	  })
	})
}