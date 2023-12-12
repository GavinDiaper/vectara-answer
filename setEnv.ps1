# Read the .env file
$envFile = Get-Content -Path ".\.env"
# Loop through each line in the .env file
foreach ($line in $envFile) {
    # Ignore comments and empty lines
    if ($line -match "^\s*#.*$" -or $line -eq "") {
        continue
    }

    # Split the line into name and value
    $name, $value = $line -split "=", 2

    # Remove 'REACT_APP_' prefix and set the environment variable
    $name = $name -replace "^REACT_APP_", ""
    [Environment]::SetEnvironmentVariable($name, $value, "Process")

    # Echo the environment variable
    Write-Output ("{0}={1}" -f $name, [Environment]::GetEnvironmentVariable($name, "Process"))
}