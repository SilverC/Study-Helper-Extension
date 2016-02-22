$source = "src/chrome"
$destination = "chrome-package.zip"
Add-Type -A System.IO.Compression.FileSystem
[IO.Compression.ZipFile]::CreateFromDirectory($source, $destination)