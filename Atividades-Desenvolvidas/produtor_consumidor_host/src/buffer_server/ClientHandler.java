package buffer_server;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;

/**
 * ClientHandler class handles communication with a connected client.
 */
public class ClientHandler extends Thread {
    private Socket clientSocket;
    private BufferManager bufferManager;
    private DataInputStream inputStream;
    private DataOutputStream outputStream;

    /**
     * Constructor initializes the client handler with socket and buffer manager.
     * @param clientSocket The client socket.
     * @param bufferManager The buffer manager instance.
     */
    public ClientHandler(Socket clientSocket, BufferManager bufferManager) {
        this.clientSocket = clientSocket;
        this.bufferManager = bufferManager;
        try {
            this.inputStream = new DataInputStream(clientSocket.getInputStream());
            this.outputStream = new DataOutputStream(clientSocket.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Handles client requests in a separate thread.
     */
    @Override
    public void run() {
        try {
            while (true) {
                String command = inputStream.readUTF();
                if (command.startsWith("produzir")) {
                    int item = Integer.parseInt(command.split(" ")[1]);
                    bufferManager.insert(item, outputStream);
                } else if (command.equals("consumir")) {
                    bufferManager.remove(outputStream);
                }
            }
        } catch (IOException e) {
            if ("Connection reset".equals(e.getMessage())) {
                System.out.println("Connection reset by client.");
            } else {
                System.err.println("IO exception: " + e.getMessage());
                e.printStackTrace();
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt(); // Restore interrupted status.
            System.err.println("Client handler interrupted: " + e.getMessage());
            e.printStackTrace();
        } finally {
            try {
                clientSocket.close();
            } catch (IOException e) {
                System.err.println("Error closing client socket: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
}
