using AutoMapper;
using WakeOnLan.Web.Mapping;
using WakeOnLan.Web.Persistence;
using WakeOnLan.Web.Services;
using WakeOnLan.Web.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddMvcCore().AddApiExplorer();
builder.Services.AddDbContext<WakeContext>();
builder.Services.AddScoped<INetworkedDeviceService, NetworkedDeviceService>();
builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddSwaggerDocument();
builder.Services.AddCors();
builder.Services.AddAutoMapper(config =>
{
    config.AddProfile<MappingProfile>();
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseCors(cors =>
{
    cors.AllowAnyHeader();
    cors.AllowAnyOrigin();
    cors.AllowAnyMethod();
});

//app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseOpenApi();
app.UseSwaggerUi3();

app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
