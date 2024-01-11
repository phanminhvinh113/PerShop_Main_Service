import { createClient } from 'redis'

class RedisPubSubService {
   //
   private subscriber: any
   private publisher: any
   //
   constructor() {
      this.subscriber = createClient()
      this.publisher = createClient()
   }
   //
   public publish(channel: string, message: string): Promise<any> {
      return new Promise<any>((resolve, reject) => {
         this.publisher.publish(channel, message, (error: any, reply: any) => {
            if (error) reject(error)
            resolve(reply)
         })
      })
   }
   //
   public subscribe(channel: string, callback: (channel: string, message: string) => void) {
      //
      this.subscriber.subscribe(channel)
      //
      this.subscriber.on('message', (subscriberChannel: string, message: string) => {
         if (channel === subscriberChannel) {
            callback(channel, message)
         }
      })
   }
}

export default new RedisPubSubService()
