using EmployeeAdminPortal.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// For�a a URL fixa (https 7266)
builder.WebHost.UseUrls("https://localhost:7266");

// Adiciona o DbContext ao container de servi�os
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Adiciona servi�os para API
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configura��o de CORS (permitindo tudo para desenvolvimento)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();

// Mostra o ambiente atual no console (para debug)
Console.WriteLine($"Environment: {app.Environment.EnvironmentName}");

// Sempre habilita Swagger (independente do ambiente)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "EmployeeAdminPortal API V1");
    c.RoutePrefix = "swagger"; // acess�vel em https://localhost:7266/swagger
});

// Habilita CORS
app.UseCors("AllowAll");

// Configura��es comuns do pipeline HTTP
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
