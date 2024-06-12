public class Consumer extends Thread {
    private Mailbox mailbox;
    private String id;

    public Consumer(Mailbox mailbox, String id) {
        this.mailbox = mailbox;
        this.id = id;
    }

    @Override
    public void run() {
        try {
            while (true) {
                String message = mailbox.retrieveMessage();
                System.out.println("Consumed by " + id + ": " + message);
                Thread.sleep(1500); // Simulate time taken to process the message
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
