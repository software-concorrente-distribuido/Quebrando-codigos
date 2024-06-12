public class Mailbox {
    private String message;

    public synchronized void storeMessage(String msg) throws InterruptedException {
        while (message != null) {
            wait();
        }
        message = msg;
        notifyAll();
    }

    public synchronized String retrieveMessage() throws InterruptedException {
        while (message == null) {
            wait();
        }
        String tempMessage = message;
        message = null;
        notifyAll();
        return tempMessage;
    }
}
