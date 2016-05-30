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

Write-Output "Requesting new access toek from Google...."
$response = Invoke-RestMethod -Method Post -ContentType "application/x-www-form-urlencoded" -Body $body -Uri "https://www.googleapis.com/oauth2/v4/token"
Write-Output "Request for new access token was successful"
$token = $response.access_token

$headers = @{}
$headers.Add("Authorization", "Bearer $($token)")
$headers.Add("x-goog-api-version", "2")

Write-Output "Submitting new version of the extension to the store"
$response = Invoke-RestMethod -Method Put -Headers $headers -InFile $env:FILE_NAME -Uri "https://www.googleapis.com/upload/chromewebstore/v1.1/items/$($env:APP_ID)"
if($response.uploadState -ne "SUCCESS") {
    throw "Submitting new version failed 'n error code= $($response.itemError.error_code) 'n error= $($response.itemError.error_detail)"
    
}
Write-Output "Submission of new version successful. Item is in draft state in the Chrome Web Store"

Write-Output "Attempting to publish new version to Chrome Web Store"
$response = Invoke-RestMethod -Method Post -Headers $headers -Uri "https://www.googleapis.com/chromewebstore/v1.1/items/$($env:APP_ID)/publish"
Write-Output $response
Write-Output "Publish of new version successful"