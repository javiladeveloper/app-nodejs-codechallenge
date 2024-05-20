# Obtener la ruta del directorio actual
$currentDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Definir rutas relativas de los proyectos
$antiFraudPath = Join-Path $currentDir "anti-fraud"
$apiPath = Join-Path $currentDir "api"
$transactionPath = Join-Path $currentDir "transaction"

# Iniciar anti-fraud en una nueva ventana de PowerShell
Write-Output "Starting anti-fraud"
Start-Process powershell -ArgumentList "cd $antiFraudPath; npm run start:dev"

# Iniciar api en una nueva ventana de PowerShell
Write-Output "Starting api"
Start-Process powershell -ArgumentList "cd $apiPath; npm run start:dev"

# Iniciar transaction en una nueva ventana de PowerShell
Write-Output "Starting transaction"
Start-Process powershell -ArgumentList "cd $transactionPath; npm run dev"

Write-Output "All projects started"
