import mongoose from 'mongoose'
import os from 'os'
export const checkConnection = () => {
   const numberConnection = mongoose.connections.length
   console.log(`Server has ${numberConnection} connecting`)
}
const _SECONDS_PER_CHECK: number = 5000
export const checkStatusServer = () => {
   setInterval(() => {
      const numberConnection = mongoose.connections.length
      const numCores = os.cpus().length
      const memoryUsage = process.memoryUsage().rss
      // Suppose  Maximum number of connection based on number of number cores
      const maxConnection = numCores * 10
      console.log('Active connection:', numberConnection)
      console.log(`Memory Usage: ${memoryUsage / 1024 / 1024}MB | MaximunConnection/Cores: ${maxConnection}/${numCores}`)
      if (numberConnection - numberConnection * 0.1 > maxConnection) {
         console.log(`Warnning: The Server System is about to be overloaded! `)
      }
   }, _SECONDS_PER_CHECK)
}
