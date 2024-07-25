package producer_consumer;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.util.Random;

/**
 * Producer class that sends items to the buffer server.
 */
public class Producer {
    private Socket socket;
    private DataOutputStream outputStream;
    private DataInputStream inputStream;
    private Random randomGenerator;

    /**
     * Constructor initializes the connection to the server.
     * @param serverAddress Address of the server.
     * @param serverPort Port of the server.
     * @throws IOException If an I/O error occurs.
     */
    public Producer(String serverAddress, int serverPort) throws IOException {
        socket = new Socket(serverAddress, serverPort);
        outputStream = new DataOutputStream(socket.getOutputStream());
        inputStream = new DataInputStream(socket.getInputStream());
        randomGenerator = new Random();
    }

    /**
     * Continuously produces items and sends them to the server.
     * @throws IOException If an I/O error occurs.
     * @throws InterruptedException If interrupted while sleeping.
     */
    public void produce() throws IOException, InterruptedException {
        while (true) {
            int item = randomGenerator.nextInt(100); // Generate a random item.
            outputStream.writeUTF("produzir " + item);
            outputStream.flush();

            // Wait for the server's response.
            String response = inputStream.readUTF();
            if (response.equals("Aceito")) {
                System.out.println("Producer sent: produzir " + item);
            } else {
                System.out.println("Failed to produce " + item + ". BUFFER FULL.");
                Thread.sleep(1000); // Wait before retrying.
            }

            Thread.sleep(randomGenerator.nextInt(3000)); // Random delay between productions.
        }
    }

    public static void main(String[] args) {
        String address = "localhost";
        int port = 8080;

        try {
            Producer producer = new Producer(address, port);
            producer.produce();
        } catch (IOException e) {
            System.err.println("Error communicating with the server: " + e.getMessage());
            e.printStackTrace();
        } catch (InterruptedException e) {
            System.err.println("Producer interrupted: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
