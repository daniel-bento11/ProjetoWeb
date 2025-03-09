namespace APIWeb.Pessoas
{
    public class Pessoa
    {
        public int Id { get; private set; }
        public string? Nome { get; private set; }
        public DateOnly? DataNascimento { get; private set; }
        public bool? Inativo { get; private set; }
        public short? Nacionalidade { get; private set; }
        public string? RG { get; private set; }
        public string? Passaporte { get; private set; }

        public Pessoa() { }

        public Pessoa(string nome, DateOnly dataNascimento, bool inativo, short nacionalidade, string rg, string passaporte)
        {
            Nome = nome;
            DataNascimento = dataNascimento;
            Inativo = inativo;
            Nacionalidade = nacionalidade;
            RG = rg;
            Passaporte = passaporte;

        }

        public void AtualizarPessoa(string? nome, DateOnly? dataNascimento, bool? inativo, short? nacionalidade, string? rg, string? passaporte)
        {
            Nome = nome;
            DataNascimento = dataNascimento;
            Inativo = inativo;
            Nacionalidade = nacionalidade;
            RG = rg;
            Passaporte = passaporte;
        }


    }


}
