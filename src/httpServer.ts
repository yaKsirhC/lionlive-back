import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cookieParser from "cookie-parser"
import cors from 'cors'
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'
import {auth} from 'express-openid-connect'

mongoose.connect(process.env.MONGO_URI as string).finally(() => console.log("Mongo is running")).catch(er => console.error(er))
const app = express()

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: '8k0P4bAOdMRoUXOK-Xw_Jy_RBsOEKJos_QDvqp2mXhDQRGNc2-0Iough_2c5uUhW',
	baseURL: 'http://localhost:5040',
	clientID: 'AWJme7NDkcKZ6PDEaK4tfP24Je0F6njV',
	issuerBaseURL: 'https://dev-8zv35067fw68fvcx.us.auth0.com'
  };
  
  
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors({origin: "http://localhost:5173" , credentials: true}))
app.use(fileUpload())
app.set("trust proxy", true);
app.use(auth(config));

import authRouter from './routes/profile.route'
// app.use('/api/auth', authRouter)
app.use('/api/video-init', authRouter)

app.listen(process.env.PORT || 5040, () => {
	console.log("Running on Port:", process.env.PORT || 5040)
})