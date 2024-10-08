export class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    let queueElement = { element, priority };
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    //mozna dodac jakies binary search tree zeby działało szybciej ale przy takiej ilosci nodow raczej useless, a kod sie skomplikuje bardziej

    if (!added) {
      this.items.push(queueElement);
    }
  }

  dequeue() {
    return this.items.shift();
  }

  contains(element) {
    return this.items.some((item) => item.element.name === element.name);
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
