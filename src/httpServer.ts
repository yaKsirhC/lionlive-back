// import express from 'express'
// import axios from 'axios'
// import cors from 'cors'

// const app = express()

// app.use(express.json())
// app.use(express.urlencoded({extended: false}))
// app.use(cors({
// 	origin: "http://localhost:5173",
// 	credentials: true
// }))

// app.get('/api/geofind', async (req, res) => {
// 	const ip = req.ip.split(':').at(-1)
// 	const geo = await axios.get("https://ipinfo.io/176.58.132.26?token=1bfd2c92f0f7b8")
// 	console.log(geo.data)
// 	res.json({ipData: geo.data})
// })

// app.listen(5040, () => {
// 	console.log('listening on 5040')
// })