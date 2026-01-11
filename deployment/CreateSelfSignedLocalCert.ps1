$siteName = "localai.titanic"
$cert = New-SelfSignedCertificate -DnsName $siteName, "localhost" `
    -CertStoreLocation "Cert:\LocalMachine\My" `
    -FriendlyName "LocalAI Testing Cert" `
    -NotAfter (Get-Date).AddYears(2)
    
$rootStore = New-Object System.Security.Cryptography.X509Certificates.X509Store("Root", "LocalMachine")
$rootStore.Open("ReadWrite")
$rootStore.Add($cert)
$rootStore.Close()

Write-Host "Success: Certificate for $siteName created and trusted." -ForegroundColor Green
