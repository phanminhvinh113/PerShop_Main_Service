import amqplib from 'amqplib'
import { QUEUE_NAME } from '../../../utils/constant.rabbitmq'
require('dotenv').config()
//
const ampq_url_cloud: string = process.env?.AMQP_URL_CLOUD_PRODUCT_SERVICE?.toString() || ''
//
const NAME_QUEUE: string = QUEUE_NAME.productQueue

export const producerQueueProduct = async ({ msg }: { msg: any }) => {
   try {
      //1 connect
      const connect = await amqplib.connect(ampq_url_cloud)
      //2 create chanel to subscribe
      const channel = await connect.createChannel()

      await channel.assertQueue(NAME_QUEUE, {
         durable: true, // true is when restart doesn't delete data.
      })

      channel.sendToQueue(NAME_QUEUE, Buffer.from(JSON.stringify(msg)), {
         expiration: '10000',
         persistent: true,
      })

      // 6. Close the channel and connection when done
      await channel.close()
      await connect.close()
   } catch (error) {
      console.log(error)
   }
}
