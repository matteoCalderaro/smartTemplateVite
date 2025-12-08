

# BUILD SU DOTNET
# PATH: /suite

## Prefixare il path dei file html
### \next.config.js

```
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // BUILD PER DOTNET
  basePath: '/suite',
  // DEV
  // basePath: '/suite',
};

```

## Prefixare il path delle background images nel CSS
### scss\base\_variables.scss

```
// BUILD PER DOTNET
$base-path: '/suite';
// DEV
$base-path: '';
```

## Copiare cartella OUT in wwwroot

## Aggiornare program.cs con logica per servire i file statici

```
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;
using Starterkit;
using Starterkit._keenthemes;
using Starterkit._keenthemes.libs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Starterkit.RestProcess;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Identity.Web;
using Starterkit.Models;
using Starterkit.Services;



var builder = WebApplication.CreateBuilder(args);


builder.Services.AddScoped<QlikAuthentication>();
// Registra il filtro personalizzato cos� pu� ricevere QlikAuthentication via DI
builder.Services.AddScoped<EnsureQlikCookieAttribute>();

// Leggi il tipo di database dal file di configurazione
var databaseType = builder.Configuration["ConnectionStrings:DatabaseType"];

// Configura il DbContext in base al tipo di database
if (databaseType == "SqlServer")
{
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
}
else if (databaseType == "PostgreSQL")
{
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

    AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
}
else
{
    throw new InvalidOperationException("Tipo di database non supportato.");
}

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie()
.AddOpenIdConnect(options =>
{
    options.ClientId = builder.Configuration["AzureAd:ClientId"];
    options.ClientSecret = builder.Configuration["AzureAd:ClientSecret"];
    options.Authority = builder.Configuration["AzureAd:Authority"];
    options.CallbackPath = builder.Configuration["AzureAd:CallbackPath"];
    options.ResponseType = "code id_token";
    options.SaveTokens = true;
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");
});

// Aggiungi autorizzazione
builder.Services.AddSession();

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddHttpClient();

// Configurazione della sessione
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(120); // Timeout sessione di 1 ora
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// Configurazione dei servizi personalizzati
builder.Services.AddScoped<IKTTheme, KTTheme>();
builder.Services.AddSingleton<IKTBootstrapBase, KTBootstrapBase>();

builder.Services.AddSingleton<MailHelper>();

builder.Services.AddScoped<IUserAuthorizationService, UserAuthorizationService>();

// Registrazione del servizio per la chat con LLM
builder.Services.AddHttpClient("LlmApiClient");
builder.Services.AddScoped<Starterkit.Services.LlmApiService>();

// Carica la configurazione dei temi e delle icone
IConfiguration themeConfiguration = new ConfigurationBuilder()
    .AddJsonFile("_keenthemes/config/themesettings.json")
    .Build();

IConfiguration iconsConfiguration = new ConfigurationBuilder()
    .AddJsonFile("_keenthemes/config/icons.json")
    .Build();

KTThemeSettings.init(themeConfiguration);
KTIconsSettings.init(iconsConfiguration);


var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();



// Add URL rewriting for Next.js static pages to append .html

var rewriteOptions = new RewriteOptions()

    .Add(context =>

    {

        var request = context.HttpContext.Request;
        var path = request.Path.Value;

        // Only apply to paths under /suite
        if (path.StartsWith("/suite", StringComparison.OrdinalIgnoreCase))
        {

            // Remove /suite prefix for file path lookup in wwwroot/out
            var relativePath = path.Substring("/suite".Length);

            // Ignore root /suite and paths with extensions
            if (string.IsNullOrEmpty(relativePath) || relativePath == "/" || Path.HasExtension(relativePath))
            {
                return;
            }

            // Construct the potential HTML file path in wwwroot/out
            var potentialHtmlFilePath = Path.Combine(builder.Environment.WebRootPath, "out", relativePath.TrimStart('/') + ".html");

            // If the HTML file exists, rewrite the path
            if (File.Exists(potentialHtmlFilePath))
            {
                request.Path = new PathString($"/suite{relativePath}.html");
            }

        }

    });



app.UseRewriter(rewriteOptions);


// Use DefaultFiles to serve index.html from wwwroot/out when /suite is requested

var defaultFileOptions = new DefaultFilesOptions();

defaultFileOptions.DefaultFileNames.Clear(); // Clear existing default names

defaultFileOptions.DefaultFileNames.Add("index.html"); // Only look for index.html

defaultFileOptions.RequestPath = "/suite";

defaultFileOptions.FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.WebRootPath, "out"));

app.UseDefaultFiles(defaultFileOptions);


app.UseStaticFiles(); // Original line, serves wwwroot

// Serve static files from the Next.js 'out' directory under the /suite path
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.WebRootPath, "out")),
    RequestPath = "/suite"
});

app.UseRouting();

app.UseSession(); // Abilita la gestione delle sessioni

app.UseAuthentication();

app.UseAuthorization();

app.UseThemeMiddleware(); // Assicurati che UseThemeMiddleware sia stato definito correttamente



// Mappa la route predefinita
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Login}/{action=Index}");

// Avvia l'applicazione
app.Run();




```
