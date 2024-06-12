public class TestMailbox {
    public static void main(String[] args) {
        Mailbox mailbox = new Mailbox();

        Producer producer1 = new Producer(mailbox, "Producer1");
        Producer producer2 = new Producer(mailbox, "Producer2");
        Consumer consumer1 = new Consumer(mailbox, "Consumer1");
        Consumer consumer2 = new Consumer(mailbox, "Consumer2");

        producer1.start();
        producer2.start();
        consumer1.start();
        consumer2.start();
    }
}
