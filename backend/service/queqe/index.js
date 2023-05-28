class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    enqueue(item) {
        const newNode = new Node(item);

        if (this.isEmpty()) {
        this.head = newNode;
        this.tail = newNode;
        } else {
        this.tail.next = newNode;
        this.tail = newNode;
        }

        this.length++;
    }

    // Lấy ra phần tử đầu tiên từ hàng đợi và loại bỏ nó khỏi danh sách
    dequeue() {
        if (this.isEmpty()) {
        return null;
        }

        const item = this.head.data;
        this.head = this.head.next;

        if (this.head === null) {
        this.tail = null;
        }

        this.length--;

        return item;
    }

    isEmpty() {
        return this.head === null;
    }
    printQueue() {
        let currentNode = this.head;
        
        while (currentNode !== null) {
            console.log(currentNode.data.id);
            currentNode = currentNode.next;
        }
    }
}
module.exports=Queue