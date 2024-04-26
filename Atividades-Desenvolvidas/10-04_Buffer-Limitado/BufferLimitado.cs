using System;
using System.Collections.Generic;
using System.Threading;

class Program
{
    static Queue<int> buffer = new Queue<int>();
    static int bufferSize = 5;
    static Random random = new Random();

    static void Main()
    {
        Thread producerThread = new Thread(Producer);
        Thread consumerThread = new Thread(Consumer);

        producerThread.Start();
        consumerThread.Start();

        producerThread.Join();
        consumerThread.Join();

        Console.WriteLine("Finished!");
    }

    static void Producer()
    {
        while (true)
        {
            lock (buffer)
            {
                while (buffer.Count >= bufferSize)
                {
                    Monitor.Wait(buffer);
                }

                int item = random.Next(100);
                buffer.Enqueue(item);
                Console.WriteLine($"Produced: {item}");
                Monitor.PulseAll(buffer);
            }

            Thread.Sleep(random.Next(1000));
        }
    }

    static void Consumer()
    {
        while (true)
        {
            lock (buffer)
            {
                while (buffer.Count == 0)
                {
                    Monitor.Wait(buffer);
                }

                int item = buffer.Dequeue();
                Console.WriteLine($"Consumed: {item}");
                Monitor.PulseAll(buffer);
            }

            Thread.Sleep(random.Next(1000));
        }
    }
}