export default class Label {
   constructor(
      public readonly name: string,
      public readonly icon: string,
      public readonly color: string,
      public unlocked: boolean,
      public puchesable: boolean,
      public price: number
   ) {}
}
