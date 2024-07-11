using System;
using System.Net.Sockets;
using System.Text;

class Client
{
    static void Main(string[] args)
    {
        // Configuração do cliente
        string server = "127.0.0.1";
        int port = 13000;

        try
        {
            TcpClient client = new TcpClient(server, port);
            NetworkStream stream = client.GetStream();

            // Lendo dados do usuário
            Console.Write("Digite seu nome: ");
            string nome = Console.ReadLine();
            Console.Write("Digite seu sexo (masculino/feminino): ");
            string sexo = Console.ReadLine();
            Console.Write("Digite sua idade: ");
            int idade = int.Parse(Console.ReadLine());

            // Enviando dados para o servidor
            string data = $"{nome},{sexo},{idade}";
            byte[] msg = Encoding.UTF8.GetBytes(data);
            stream.Write(msg, 0, msg.Length);

            // Recebendo resultado do servidor
            byte[] buffer = new byte[256];
            int bytesRead = stream.Read(buffer, 0, buffer.Length);
            string resposta = Encoding.UTF8.GetString(buffer, 0, bytesRead);

            Console.WriteLine("Resposta do servidor: " + resposta);

            // Fechando conexão
            client.Close();
        }
        catch (Exception e)
        {
            Console.WriteLine("Erro: " + e.Message);
        }
    }
}
