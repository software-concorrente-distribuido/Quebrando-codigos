package buffer_server;

import java.io.DataOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.concurrent.Semaphore;

/**
 * BufferManager class that manages the circular buffer with synchronization.
 */
public class BufferManager {
    private int[] buffer;
    private int bufferSize;
    private int insertIndex = 0;
    private int removeIndex = 0;
    private Semaphore fullSlots;
    private Semaphore emptySlots;
    private Semaphore mutex;

    /**
     * Constructor initializes the buffer and semaphores.
     * @param bufferSize Size of the buffer.
     */
    public BufferManager(int bufferSize) {
        this.bufferSize = bufferSize;
        this.buffer = new int[bufferSize];
        this.fullSlots = new Semaphore(0); // No items initially.
        this.emptySlots = new Semaphore(bufferSize); // All slots are empty initially.
        this.mutex = new Semaphore(1); // Only one thread can access the buffer at a time.
    }

    /**
     * Inserts an item into the buffer.
     * @param item The item to be inserted.
     * @param outputStream The output stream to send responses.
     * @throws InterruptedException If interrupted while waiting for the semaphore.
     * @throws IOException If an I/O error occurs.
     */
    public void insert(int item, DataOutputStream outputStream) throws InterruptedException, IOException {
        if (!emptySlots.tryAcquire()) {
            System.out.println(Thread.currentThread().getName() + " failed to produce " + item + ". BUFFER FULL!");
            outputStream.writeUTF("Rejected");
        } else {
            mutex.acquire();
            try {
                buffer[insertIndex] = item;
                insertIndex = (insertIndex + 1) % bufferSize;
                System.out.println(Thread.currentThread().getName() + " produced: " + item + ", BUFFER: " + Arrays.toString(buffer));
                fullSlots.release();
                outputStream.writeUTF("Accepted");
            } finally {
                mutex.release();
            }
        }
        outputStream.flush();
    }

    /**
     * Removes an item from the buffer.
     * @param outputStream The output stream to send responses.
     * @throws InterruptedException If interrupted while waiting for the semaphore.
     * @throws IOException If an I/O error occurs.
     */
    public void remove(DataOutputStream outputStream) throws InterruptedException, IOException {
        if (!fullSlots.tryAcquire()) {
            System.out.println(Thread.currentThread().getName() + " tried to consume but the BUFFER is EMPTY!");
            outputStream.writeUTF("Buffer empty");
        } else {
            mutex.acquire();
            try {
                int item = buffer[removeIndex];
                buffer[removeIndex] = 0; // Optional: Clear the slot.
                removeIndex = (removeIndex + 1) % bufferSize;
                System.out.println(Thread.currentThread().getName() + " consumed: " + item + ", BUFFER: " + Arrays.toString(buffer));
                emptySlots.release();
                outputStream.writeUTF("Item: " + item);
            } finally {
                mutex.release();
            }
        }
        outputStream.flush();
    }
}
