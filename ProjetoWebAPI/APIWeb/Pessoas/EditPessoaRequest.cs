namespace APIWeb.Pessoas
{
    public record EditPessoaRequest(string Nome, DateOnly DataNascimento, bool Inativo, short Nacionalidade, string RG, string Passaporte);

}
