$source = ".\src\chrome"
Write-Host "environment file name variable: $env:FILE_NAME"
Add-Type -A System.IO.Compression.FileSystem
[IO.Compression.ZipFile]::CreateFromDirectory($source, $env:FILE_NAME)