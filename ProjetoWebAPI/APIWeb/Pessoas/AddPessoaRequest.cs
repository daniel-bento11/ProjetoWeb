namespace APIWeb.Pessoas
{
    public record AddPessoaRequest(string Nome, DateOnly DataNascimento, bool Inativo, short Nacionalidade, string RG, string Passaporte);
 
}
