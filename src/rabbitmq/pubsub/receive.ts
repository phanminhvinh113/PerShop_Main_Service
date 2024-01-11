import amqplib from 'amqplib'
require('dotenv').config()
//
//const ampq_url_docker: string = process.env?.AMQP_URL_DOCKER || ''
const ampq_url_cloud: string = process.env?.AMQP_URL_CLOUD?.toString() || ''
//
export const receive = async () => {
   try {
      //1
      const connect = await amqplib.connect(ampq_url_cloud)
      //2
      const chanel = await connect.createChannel()
      //3. create name queue
      const nameExchange: string = 'notify_q'
      //
      await chanel.assertExchange(nameExchange, 'fanout', {
         durable: false, // true is when restart doesn't delete data.
      })
      //4
      const { queue } = await chanel.assertQueue('', {
         exclusive: true,
      })
      console.log(' queue:::', queue)
      //binding
      await chanel.bindQueue(queue, nameExchange, '')
      //
      await chanel.consume(queue, (msg) => {
         console.log('msg::::', msg?.content.toString())
      })

      //
   } catch (error) {
      console.log(error)
   }
}
//
receive()
