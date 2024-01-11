import amqplib from 'amqplib'
require('dotenv').config()
//
const ampq_url_cloud: string = process.env?.AMQP_URL_CLOUD_TEST?.toString() || ''
//

export const sendQueue = async ({ msg }: { msg: string }) => {
   try {
      //1 connect
      const connect = await amqplib.connect(ampq_url_cloud)
      //2 create chanel to subscribe
      const channel = await connect.createChannel()
      //3. create name queue
      const nameQueue: string = 'q_1'
      //
      await channel.assertQueue(nameQueue, {
         durable: true, // true is when restart doesn't delete data.
      })
      //
      channel.sendToQueue(nameQueue, Buffer.from(msg), {
         expiration: '10000',
         persistent: true,
      })
      //
      // 6. Close the channel and connection when done
      await channel.close()
      await connect.close()
   } catch (error) {
      console.log(error)
   }
}
//
void sendQueue({ msg: 'h_123@' })
