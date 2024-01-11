import amqp from 'amqplib'
import { EXCHANGE_NAME, ROUTING_KEY, QUEUE_NAME } from '../../utils/constant.rabbitmq'
require('dotenv').config()
//
// const ampq_url_docker: string = process.env?.AMQP_URL_DOCKER || 'amqp://guest:phanminhvinh2003@localhost'
//
const ampq_url_cloud: string = process.env?.AMQP_URL_CLOUD_TEST || ''

require('dotenv').config()
//
const message = 'New Product......!!!!!'
//
export const runProducer = async () => {
   try {
      const connection = await amqp.connect(ampq_url_cloud)
      const channel = await connection.createChannel()
      //1. create exchange
      await channel.assertExchange(EXCHANGE_NAME.notificationExchange, 'direct', {
         durable: true,
      })
      //2. create Queue
      const queueResult = await channel.assertQueue(QUEUE_NAME.notificationQueue, {
         exclusive: false,
         deadLetterExchange: EXCHANGE_NAME.notificationExchangeDLX,
         deadLetterRoutingKey: ROUTING_KEY.notificationRoutingKeyDLX,
      })
      //3. bindQueue
      await channel.bindQueue(queueResult.queue, EXCHANGE_NAME.notificationExchange, '')
      //4. Send Message
      await channel.sendToQueue(queueResult.queue, Buffer.from(message), {
         expiration: '10000',
      })
      //5 Close Connection And Done Process
      setTimeout(() => {
         connection.close()
         process.exit()
      }, 2000)
      //
   } catch (error) {
      console.log('Error', error)
   }
}

runProducer()
