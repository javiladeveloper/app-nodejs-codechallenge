# Función para matar el proceso que usa un puerto específico
function Kill-Port {
    param (
        [int]$port
    )
    $processId = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
    if ($processId) {
        Write-Output "Killing process on port $port with PID $processId"
        Stop-Process -Id $processId -Force
    } else {
        Write-Output "No process found on port $port"
    }
}

# Cerrar los puertos 3001, 3002, y 3003
Kill-Port 3001
Kill-Port 3002
Kill-Port 3003

# Obtener la ruta del directorio actual
$currentDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Definir rutas relativas de los proyectos
$antiFraudPath = Join-Path $currentDir "anti-fraud"
$apiPath = Join-Path $currentDir "api"
$transactionPath = Join-Path $currentDir "transaction"

# Instalar dependencias en anti-fraud
Write-Output "Installing dependencies for anti-fraud"
cd $antiFraudPath
npm install

# Instalar dependencias en api
Write-Output "Installing dependencies for api"
cd $apiPath
npm install

# Instalar dependencias en transaction
Write-Output "Installing dependencies for transaction"
cd $transactionPath
npm install

Write-Output "Starting transaction (generate)"
Start-Process powershell -ArgumentList "cd $transactionPath; npm run generate"

Write-Output "Starting transaction (migrate)"
Start-Process powershell -ArgumentList "cd $transactionPath; npm run migrate"

# Iniciar anti-fraud en nuevas ventanas de PowerShell 
Write-Output "Starting anti-fraud"
Start-Process powershell -ArgumentList "cd $antiFraudPath; npm run start:dev"

# Iniciar api en nuevas ventanas de PowerShell 
Write-Output "Starting api"
Start-Process powershell -ArgumentList "cd $apiPath; npm run start:dev"

# Iniciar transaction en nuevas ventanas de PowerShell 
Write-Output "Starting transaction (dev)"
Start-Process powershell -ArgumentList "cd $transactionPath; npm run dev"

Write-Output "All projects started"
