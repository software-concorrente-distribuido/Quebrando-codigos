using System;
using System.Threading;

class Program
{
    static int[] ingressosDisponiveis = new int[10]; // Array para representar os ingressos disponíveis
    static int ingressosVendidos = 0; // Contador de ingressos vendidos

    static void Main(string[] args)
    {
        // Inicializando os ingressos disponíveis
        for (int i = 0; i < ingressosDisponiveis.Length; i++)
        {
            ingressosDisponiveis[i] = i + 1; // Cada ingresso terá um número único
        }

        // Criando várias threads para simular compradores concorrentes
        Thread[] threads = new Thread[20];
        for (int i = 0; i < threads.Length; i++)
        {
            threads[i] = new Thread(ComprarIngresso);
            threads[i].Start();
        }

        // Aguardando todas as threads terminarem
        foreach (Thread thread in threads)
        {
            thread.Join();
        }

        // Exibindo o número total de ingressos vendidos
        Console.WriteLine("Total de ingressos vendidos: " + ingressosVendidos);
    }

    static void ComprarIngresso()
    {
        // Simulando o processo de compra de ingresso
        Random random = new Random();
        int ingresso;
        
        // Verificando se ainda há ingressos disponíveis
        if (ingressosVendidos < ingressosDisponiveis.Length)
        {
            // Escolhendo um ingresso disponível aleatoriamente
            do
            {
                ingresso = random.Next(ingressosDisponiveis.Length);
            } while (ingressosDisponiveis[ingresso] == 0);

            // "Comprando" o ingresso (marcando como vendido)
            Console.WriteLine("Comprador {0} comprou o ingresso {1}", Thread.CurrentThread.ManagedThreadId, ingressosDisponiveis[ingresso]);
            ingressosDisponiveis[ingresso] = 0;
            ingressosVendidos++;
        }
    }
}