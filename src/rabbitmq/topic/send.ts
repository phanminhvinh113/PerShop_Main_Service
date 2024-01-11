import amqplib from 'amqplib'
require('dotenv').config()
//
//const ampq_url_docker: string = process.env?.AMQP_URL_DOCKER || ''
const ampq_url_cloud: string = process.env?.AMQP_URL_CLOUD?.toString() || ''
//
export const send = async () => {
   try {
      //1
      const connect = await amqplib.connect(ampq_url_cloud)
      //2
      const chanel = await connect.createChannel()
      //3. create name queue
      const nameExchange: string = 'send_mail'
      //create  queue flow name declared
      await chanel.assertExchange(nameExchange, 'topic', {
         durable: false, // true is when restart doesn't delete data.
      })
      //
      const args = process.argv.slice(2)
      const msg = args[1] || 'Fixed'
      const topic = args[0]
      //
      chanel.publish(nameExchange, topic, Buffer.from(msg))
      //
      setTimeout(() => {
         connect.close()
         process.exit()
      }, 2000)
   } catch (error) {
      console.log(error)
   }
}
//
