import express from 'express'
import objectPropertyChecker from '../utils/objectPropertyChecker';
import { webRTCPeerConfiguration } from '../../types';

const router = express.Router()

router.post('/init-request', async (req, res) => {
	try {
		if(objectPropertyChecker(req.body, ['config'])) return res.sendStatus(400)
		const config = req.body.config as webRTCPeerConfiguration
	} catch (error) {
		console.error(error);
		res.status(500).send(error)
	}
})

export default router