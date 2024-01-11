import amqplib from 'amqplib'
require('dotenv').config()
//
//const ampq_url_docker: string = process.env?.AMQP_URL_DOCKER || ''
const ampq_url_cloud: string = process.env?.AMQP_URL_CLOUD?.toString() || ''
//
export const post = async ({ msg }: any) => {
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
      //
      await chanel.publish(nameExchange, '', Buffer.from(msg))
      //
   } catch (error) {
      console.log(error)
   }
}
//
const msg = process.argv.slice(2).join('') || 'h1'
post({ msg })
