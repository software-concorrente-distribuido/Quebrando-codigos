package producer_consumer;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;

/**
 * Consumer class that requests items from the buffer server.
 */
public class Consumer {
    private Socket socket;
    private DataOutputStream outputStream;
    private DataInputStream inputStream;

    /**
     * Constructor initializes the connection to the server.
     * @param serverAddress Address of the server.
     * @param serverPort Port of the server.
     * @throws IOException If an I/O error occurs.
     */
    public Consumer(String serverAddress, int serverPort) throws IOException {
        socket = new Socket(serverAddress, serverPort);
        outputStream = new DataOutputStream(socket.getOutputStream());
        inputStream = new DataInputStream(socket.getInputStream());
    }

    /**
     * Continuously requests items from the server.
     * @throws IOException If an I/O error occurs.
     */
    public void consume() throws IOException {
        while (true) {
            outputStream.writeUTF("consumir");
            outputStream.flush();

            // Wait for the server's response.
            String response = inputStream.readUTF();
            if (response.startsWith("Item:")) {
                System.out.println("Consumer received > " + response);
            } else {
                System.out.println("Consumer attempted to consume, but the BUFFER is EMPTY.");
            }

            try {
                Thread.sleep(2000); // Wait before making another request.
            } catch (InterruptedException e) {
                System.err.println("Consumer interrupted: " + e.getMessage());
                Thread.currentThread().interrupt(); // Restore interrupted status.
                break; // Exit loop if interrupted.
            }
        }
    }

    public static void main(String[] args) {
        String address = "localhost";
        int port = 8080;

        try {
            Consumer consumer = new Consumer(address, port);
            consumer.consume();
        } catch (IOException e) {
            System.err.println("Error communicating with the server: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
