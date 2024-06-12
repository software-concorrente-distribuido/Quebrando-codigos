public class Producer extends Thread {
    private Mailbox mailbox;
    private String id;

    public Producer(Mailbox mailbox, String id) {
        this.mailbox = mailbox;
        this.id = id;
    }

    @Override
    public void run() {
        int messageCount = 0;
        try {
            while (true) {
                String message = "Message " + messageCount + " from " + id;
                mailbox.storeMessage(message);
                System.out.println("Produced: " + message);
                messageCount++;
                Thread.sleep(1000); // Simulate time taken to produce a message
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
