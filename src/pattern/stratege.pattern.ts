class Observer {
   private name: string
   //
   constructor(name: string) {
      this.name = name
   }
   //
   public updateState(message: string): void {
      this.message(message)
   }
   //
   public message(message: string): void {
      console.log(`${this.name}PING ::::: ${message}`)
   }
}
//

class Subject {
   private observerList: any[]
   constructor() {
      this.observerList = []
   }
   //
   addObserver(observer: Observer) {
      this.observerList.push(observer)
   }
   //
   notify(message: string) {
      this.observerList.forEach((observer: Observer) => observer.updateState(message))
   }
   //
}

const subject = new Subject()

const user_1 = new Observer('user_1')
const user_2 = new Observer('user_2')
const user_3 = new Observer('user_3')
const user_4 = new Observer('user_4')
//
subject.addObserver(user_1)
subject.addObserver(user_2)
subject.addObserver(user_3)
subject.addObserver(user_4)
//
subject.notify('ALO')
