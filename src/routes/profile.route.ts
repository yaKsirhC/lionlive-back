import express from 'express'
import bcrypt from 'bcrypt'
import axios from 'axios'
import User from '../schemas/User'
import objectPropertyChecker from '../utils/objectPropertyChecker'

const router = express.Router()

router.post('/sign-up', async (req, res) => {
	try {
		if(objectPropertyChecker(req.body, ['email', 'password', "location", "birthDate", "gender"])) return res.sendStatus(400)
		const ip = req.ip.split(':').at(-1)
		let response = await axios.get(`https://ipinfo.io/${ip}/json`);
		let data = await response.data
		if(data.bogon) response = await axios.get(`https://ipinfo.io/json`);
		data = await response.data

		const salt = await bcrypt.genSalt(10)
		const password = await bcrypt.hash(req.body.password, salt)

		const newUserData = {
			password,
			email: req.body.email,
			location: data.region,
			birthDate: req.body.birthDate,
			gender: req.body.gender
		}

		const newUser = new User(newUserData)
		await newUser.save()

		res.cookie("cookie_ver", newUser._id, { httpOnly: true }).status(200).send('signed up!')
	} catch (error) {
		console.error(error)
		res.status(500).send(error)
	}
})

router.post('/log-in', async (req, res) => {
	try {
		if(objectPropertyChecker(req.body, ['email', 'password'])) return res.sendStatus(400)
		const email = req.body.email
		const password = req.body.password
		const emailMatch = await User.findOne({ email })
		if (emailMatch) {
			const actualPassword = emailMatch.password
			const comparison = await bcrypt.compare(password, actualPassword as string)
			if (comparison) return res.cookie('cookie_ver', emailMatch.id, { httpOnly: true }).status(200).send("Logged in")
			return res.status(400).send("Double Check Everything! The email or password is incorrect.")
		}
		return res.status(404).send("User doesn't exist.")
	} catch (error) {
		console.error(error)
		res.status(500).send(error)
	}
})

export default router