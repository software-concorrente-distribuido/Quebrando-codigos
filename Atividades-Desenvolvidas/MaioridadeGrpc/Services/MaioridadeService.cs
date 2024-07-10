using Grpc.Core;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace MaioridadeGrpc
{
    public class MaioridadeService : Maioridade.MaioridadeService.MaioridadeServiceBase
    {
        private readonly ILogger<MaioridadeService> _logger;

        public MaioridadeService(ILogger<MaioridadeService> logger)
        {
            _logger = logger;
        }

        public override Task<MaioridadeResponse> VerificarMaioridade(MaioridadeRequest request, ServerCallContext context)
        {
            string resultado;
            if ((request.Sexo.ToLower() == "masculino" && request.Idade >= 18) ||
                (request.Sexo.ToLower() == "feminino" && request.Idade >= 21))
            {
                resultado = $"{request.Nome} atingiu a maioridade.";
            }
            else
            {
                resultado = $"{request.Nome} não atingiu a maioridade.";
            }

            return Task.FromResult(new MaioridadeResponse
            {
                Resultado = resultado
            });
        }
    }
}
