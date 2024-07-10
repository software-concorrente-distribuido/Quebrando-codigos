// Cliente/Program.cs
using System;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Cliente
{
    class Program
    {
        static async Task Main(string[] args)
        {
            using (var client = new TcpClient())
            {
                await client.ConnectAsync("127.0.0.1", 5000);
                Console.WriteLine("Conectado ao servidor.");

                using (var stream = client.GetStream())
                {
                    string message = "Olá, servidor!";
                    byte[] data = Encoding.UTF8.GetBytes(message);
                    await stream.WriteAsync(data, 0, data.Length);

                    var buffer = new byte[1024];
                    int bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length);
                    string response = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                    Console.WriteLine($"Resposta do servidor: {response}");
                }
            }
        }
    }
}