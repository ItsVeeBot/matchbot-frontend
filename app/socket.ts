import { io } from 'socket.io-client'

// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3821'
const URL = import.meta.env.VITE_SERVER_URL

console.log("Trying to connect to ", URL)

export const socket = io(URL);