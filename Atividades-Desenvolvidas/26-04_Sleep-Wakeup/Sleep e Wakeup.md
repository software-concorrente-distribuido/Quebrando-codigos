# Conceito de Sleep e Wakeup

Sleep e Wakeup são mecanismos importantes para sincronização entre threads em sistemas operacionais. Quando um processo não pode fazer progresso porque uma condição necessária não foi atendida, ele pode adormecer (Sleep). Em contrapartida, quando a condição necessária é atendida por outro processo, ele pode acordar (Wakeup) o processo adormecido para que ele possa continuar sua execução.

### Problema

Para resolver o problema do produtor e consumidor com buffer limitado, podemos usar semáforos para controlar o acesso ao buffer. Um semáforo é uma variável inteira que, além de suportar a operação de incremento e decremento, suporta a operação de bloqueio e desbloqueio.

### Exemplo em C#

O código utiliza a sincronização entre threads usando apenas Sleep e Wakeup através dos métodos Monitor.Wait e Monitor.Pulse, respectivamente.

```csharp
using System;
using System.Threading;

class Program
{
    static int[] buffer = new int[5];
    static int count = 0;
    static object lockObject = new object(); // Objeto de bloqueio para sincronização

    static void Main(string[] args)
    {
        Thread produtor = new Thread(Produtor);
        Thread consumidor = new Thread(Consumidor);

        produtor.Start();
        consumidor.Start();

        produtor.Join();
        consumidor.Join();
    }

    static void Produtor()
    {
        Random rand = new Random();

        while (true)
        {
            int item = rand.Next(100);
            lock (lockObject)
            {
                if (count < buffer.Length)
                {
                    buffer[count] = item;
                    count++;
                    Console.WriteLine($"Produzido: {item}");
                }
                else
                {
                    Console.WriteLine("Buffer cheio. Produtor aguardando.");
                    Monitor.Wait(lockObject); // Aguarda até que o buffer não esteja mais cheio
                }
                Monitor.Pulse(lockObject); // Notifica o consumidor que o buffer pode ter novos itens
            }
            Thread.Sleep(rand.Next(500)); // Simula produção
        }
    }

    static void Consumidor()
    {
        Random rand = new Random();

        while (true)
        {
            lock (lockObject)
            {
                if (count > 0)
                {
                    int item = buffer[count - 1];
                    count--;
                    Console.WriteLine($"Consumido: {item}");
                }
                else
                {
                    Console.WriteLine("Buffer vazio. Consumidor aguardando.");
                    Monitor.Wait(lockObject); // Aguarda até que o buffer não esteja mais vazio
                }
                Monitor.Pulse(lockObject); // Notifica o produtor que o buffer pode ter espaço para novos itens
            }
            Thread.Sleep(rand.Next(500)); // Simula consumo
        }
    }
}
```

Utilizei o método **Monitor.Wait** para que o produtor e o consumidor esperem até que uma condição específica seja atendida. Quando o buffer está cheio, o produtor aguarda até que o consumidor retire um item, e quando o buffer está vazio, o consumidor aguarda até que o produtor insira um novo item.

O método **Monitor.Pulse** é usado para notificar a outra thread quando uma condição é alterada, permitindo que ela prossiga com sua execução.

![Execução](https://github.com/MateusSilvaUFG/UFG-ES/blob/main/execução.jpg)

Algoritmo de Dekker:

```csharp
using System;
using System.Threading;

public class DekkerMutex
{
    private bool[] flag = new bool[2];
    private int turn;

    public void Lock(int threadId)
    {
        int otherThread = 1 - threadId;
        flag[threadId] = true;
        while (flag[otherThread])
        {
            if (turn == otherThread)
            {
                flag[threadId] = false;
                while (turn == otherThread) ;
                flag[threadId] = true;
            }
        }
    }

    public void Unlock(int threadId)
    {
        flag[threadId] = false;
        turn = 1 - threadId;
    }
}

public class Program
{
    static DekkerMutex mutex = new DekkerMutex();
    static int sharedResource = 0;

    static void Main(string[] args)
    {
        Thread t1 = new Thread(IncrementSharedResource);
        Thread t2 = new Thread(IncrementSharedResource);

        t1.Start(0);
        t2.Start(1);

        t1.Join();
        t2.Join();

        Console.WriteLine("Valor final da variável compartilhada: " + sharedResource);
    }

    static void IncrementSharedResource(object id)
    {
        int threadId = (int)id;
        for (int i = 0; i < 1000; i++)
        {
            mutex.Lock(threadId);
            sharedResource++;
            mutex.Unlock(threadId);
        }
    }
}
```

### Possíveis erros sem o uso de Sleep e Wakeup:

**Deadlock:** Se não usarmos mecanismos de sincronização adequados, como lock e monitor, podemos enfrentar deadlocks, onde os threads ficam bloqueados indefinidamente.

**Condição de corrida:** Sem a sincronização adequada, podemos enfrentar condições de corrida, onde múltiplos threads tentam acessar e modificar os mesmos dados simultaneamente, resultando em comportamento indefinido e inconsistente.

### Situações do mundo real.

**Sistema de Produção e Consumo de Mensagens:** Em sistemas de mensageria, como filas de mensagens, pode haver produtores que colocam mensagens na fila e consumidores que as retiram. Sleep pode ser usado pelo consumidor quando a fila está vazia para aguardar a chegada de novas mensagens. O produtor, por sua vez, acorda o consumidor através do Wakeup após inserir uma mensagem na fila.

**Controle de Impressão em Redes:** Em ambientes de rede onde várias impressoras estão disponíveis para os usuários, pode ser necessário implementar um controle de acesso às impressoras para evitar conflitos. Por exemplo, um processo que está tentando imprimir um documento pode usar Sleep se a impressora estiver ocupada. O processo de impressão, ao concluir, acorda o próximo processo na fila de espera usando Wakeup.

**Simulação de Tráfego em Sistemas de Transporte:** Em sistemas de transporte, como simulações de tráfego rodoviário ou de tráfego aéreo, podemos usar Sleep para simular o tempo entre a chegada de veículos ou aeronaves. Os processos responsáveis pelo controle de tráfego podem usar Wakeup para acionar ações quando certos eventos ocorrem, como a chegada de um veículo em um cruzamento ou a aproximação de uma aeronave para pouso.
