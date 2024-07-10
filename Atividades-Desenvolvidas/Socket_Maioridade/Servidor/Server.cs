using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

class Server
{
    static void Main(string[] args)
    {
        int port = 13000;
        IPAddress localAddr = IPAddress.Parse("127.0.0.1");
        TcpListener server = new TcpListener(localAddr, port);

        server.Start();
        Console.WriteLine("Servidor iniciado...");

        while (true)
        {
            TcpClient client = server.AcceptTcpClient();
            Console.WriteLine("Cliente conectado!");
            Thread clientThread = new Thread(new ParameterizedThreadStart(HandleClient));
            clientThread.Start(client);
        }
    }

    static void HandleClient(object obj)
    {
        TcpClient client = (TcpClient)obj;
        NetworkStream stream = client.GetStream();

        try
        {
            byte[] buffer = new byte[256];
            int bytesRead = stream.Read(buffer, 0, buffer.Length);
            string data = Encoding.UTF8.GetString(buffer, 0, bytesRead);

            string[] parts = data.Split(',');
            string nome = parts[0];
            string sexo = parts[1].ToLower();
            int idade = int.Parse(parts[2]);

            string resultado = "";
            if ((sexo == "masculino" && idade >= 18) || (sexo == "feminino" && idade >= 21))
            {
                resultado = $"{nome} atingiu a maioridade.";
            }
            else
            {
                resultado = $"{nome} não atingiu a maioridade.";
            }

            byte[] msg = Encoding.UTF8.GetBytes(resultado);
            stream.Write(msg, 0, msg.Length);
        }
        catch (Exception e)
        {
            Console.WriteLine("Erro: " + e.Message);
        }
        finally
        {
            client.Close();
            Console.WriteLine("Cliente desconectado.");
        }
    }
}
