using APIWeb.Data;
using Microsoft.EntityFrameworkCore;

namespace APIWeb.Pessoas
{
    public static class PessoasRotas
    {
        public static void addRotasPessoas(WebApplication app)
        {
            var rotasPessoas = app.MapGroup("pessoas");

            rotasPessoas.MapPost("", async (AddPessoaRequest request, AppDbContext context, CancellationToken ct) =>
            {
                var pessoa = new Pessoa(request.Nome, request.DataNascimento, request.Inativo, request.Nacionalidade, request.RG, request.Passaporte);
                await context.Pessoas.AddAsync(pessoa, ct);
                await context.SaveChangesAsync(ct);

                return Results.Ok();

            });

            rotasPessoas.MapGet("", async (AppDbContext context, CancellationToken ct) =>
            {
             
                    var pessoas = await context.Pessoas.
                    Select(pessoa => new PessoaDto(pessoa.Id, pessoa.Nome, pessoa.DataNascimento, pessoa.Inativo, pessoa.Nacionalidade, pessoa.RG, pessoa.Passaporte)).
                    ToListAsync(ct);
                    return pessoas;
            });


            rotasPessoas.MapGet("pesquisa/{id}", async (AppDbContext context, int id, CancellationToken ct) =>
            {
                var pessoa = await context.Pessoas
                    .Where(pessoa => pessoa.Id == id)
                    .Select(pessoa => new PessoaDto(
                        pessoa.Id,
                        pessoa.Nome,
                        pessoa.DataNascimento,
                        pessoa.Inativo,
                        pessoa.Nacionalidade,
                        pessoa.RG,
                        pessoa.Passaporte))
                    .FirstOrDefaultAsync(ct); 

                if (pessoa == null)
                {
                    return Results.NotFound(); 
                }

                return Results.Ok(pessoa); 
            });

            rotasPessoas.MapGet("{pesquisa}", async (AppDbContext context, string pesquisa, CancellationToken ct) =>
            {
                
                var pessoas = await context.Pessoas
                    .Where(pessoa => pessoa.Nome.StartsWith(pesquisa))
                    .Select(pessoa => new PessoaDto(
                        pessoa.Id,
                        pessoa.Nome,
                        pessoa.DataNascimento,
                        pessoa.Inativo,
                        pessoa.Nacionalidade,
                        pessoa.RG,
                        pessoa.Passaporte))
                    .ToListAsync(ct); 

                return pessoas;
            });

            rotasPessoas.MapPut("{id}", async (int id, EditPessoaRequest pessoaAtualizada, AppDbContext context) =>
            {
                var pessoa = await context.Pessoas.FindAsync(id);

                if (pessoa == null)
                {
                    return Results.NotFound("Pessoa não encontrada.");
                }

                // Atualiza os dados da pessoa
                pessoa.AtualizarPessoa(pessoaAtualizada.Nome, pessoaAtualizada.DataNascimento, pessoaAtualizada.Inativo, pessoaAtualizada.Nacionalidade, pessoaAtualizada.RG, pessoaAtualizada.Passaporte);


                await context.SaveChangesAsync(); // Salva as alterações no banco

                return Results.Ok("Pessoa atualizada com sucesso!");
            });

            rotasPessoas.MapDelete("{id}", async (int id, AppDbContext context, CancellationToken ct) =>
            {
                var pessoa = await context.Pessoas.
                SingleOrDefaultAsync(pessoa => pessoa.Id == id, ct);

                if (pessoa == null)
                    return Results.NotFound();

                context.Pessoas.Attach(pessoa);
                context.Pessoas.Remove(pessoa);
                await context.SaveChangesAsync(ct);
                return Results.Ok();
            });

        }



    }
}
