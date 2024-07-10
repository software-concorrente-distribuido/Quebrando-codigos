using System;
using System.Threading.Tasks;
using Grpc.Net.Client;
using MaioridadeGrpc;

namespace MaioridadeGrpcClient
{
    class Program
    {
        static async Task Main(string[] args)
        {
            using var channel = GrpcChannel.ForAddress("https://localhost:5001");
            var client = new Maioridade.MaioridadeService.MaioridadeServiceClient(channel);

            Console.WriteLine("Digite o nome:");
            string nome = Console.ReadLine();

            Console.WriteLine("Digite o sexo (masculino/feminino):");
            string sexo = Console.ReadLine();

            Console.WriteLine("Digite a idade:");
            int idade = int.Parse(Console.ReadLine());

            var request = new MaioridadeRequest { Nome = nome, Sexo = sexo, Idade = idade };

            var response = await client.VerificarMaioridadeAsync(request);

            Console.WriteLine(response.Resultado);
        }
    }
}
