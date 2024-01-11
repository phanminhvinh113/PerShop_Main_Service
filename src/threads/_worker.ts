import { Worker, isMainThread, parentPort, workerData } from 'worker_threads'

function isPrime(num: number) {
   if (num <= 1) return false
   for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false
   }
   return true
}

if (isMainThread) {
   // Main thread

   const rangeStart = 1
   const rangeEnd = 100000

   const chunkSize = 10000

   // Divide the range into chunks and spawn a worker for each chunk
   for (let i = rangeStart; i <= rangeEnd; i += chunkSize) {
      const start = i
      const end = Math.min(i + chunkSize - 1, rangeEnd)

      const worker = new Worker(__filename, {
         workerData: { start, end },
      })

      worker.on('message', (message) => {
         console.log('Prime numbers in range', message.start, 'to', message.end, ':', message.primes.length)
      })
   }
} else {
   // Worker thread

   const { start, end } = workerData
   const primes = []

   for (let i = start; i <= end; i++) {
      if (isPrime(i)) {
         primes.push(i)
      }
   }

   // Send the result back to the main thread
   parentPort?.postMessage({ start, end, primes })
}
