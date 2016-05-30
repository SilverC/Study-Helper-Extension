$source = ".\src\chrome"
Write-Host "environment file name variable: $($env:FILE_NAME)"
Add-Type -A System.IO.Compression.FileSystem
[IO.Compression.ZipFile]::CreateFromDirectory($source, $env:FILE_NAME)

$body = @{
    refresh_token = $env:REFRESH_TOKEN
    client_id = $env:CLIENT_ID
    client_secret = $env:CLIENT_SECRET
    grant_type = "refresh_token"
}
Write-Output $body

$response = Invoke-RestMethod -Method Post -ContentType "application/x-www-form-urlencoded" -Body $body
Write-Output $response
$token = $response.access_token

$headers = @{}
$headers.Add("Authorization", "Bearer $($token)")
$headers.Add("x-goog-api-version", "2")

Invoke-RestMethod -Method Put -Headers $headers -InFile $env:FILE_NAME -Uri "https://www.googleapis.com/upload/chromewebstore/v1.1/items/$($env:APP_ID)"

$response = Invoke-RestMethod -Method Post -Headers $headers -Uri "https://www.googleapis.com/chromewebstore/v1.1/items/$($env:APP_ID)/publish"

Write-Output $response