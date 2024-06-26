using APIVersion7.Extensions;
using APIVersion7.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(builder => builder
.AllowAnyHeader()
.AllowAnyMethod()
.WithOrigins("https://localhost:4200")
);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
