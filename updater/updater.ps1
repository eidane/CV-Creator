# GitHub Auto-Updater for Windows (PowerShell)
# Run with: .\auto_updater.ps1
# If blocked, run: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

param(
    [switch]$ForceUpdate
)

# ========== CONFIGURATION ==========
$GITHUB_OWNER = "eidane"
$GITHUB_REPO = "CV-Creator"
$GITHUB_BRANCH = "main"
$VERSION_FILE_URL = "https://raw.githubusercontent.com/$GITHUB_OWNER/$GITHUB_REPO/$GITHUB_BRANCH/version.json"
$FILES_TO_UPDATE = @(
    "index.js",
    "config.json"
    # Add more files here
)
$LOCAL_VERSION_PATH = ".\version.json"
# ====================================

function Write-Log {
    param([string]$Message, [string]$Type = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $color = if ($Type -eq "ERROR") { "Red" } elseif ($Type -eq "SUCCESS") { "Green" } else { "White" }
    Write-Host "[$timestamp] [$Type] $Message" -ForegroundColor $color
}

function Get-RemoteVersion {
    try {
        $response = Invoke-RestMethod -Uri $VERSION_FILE_URL -Method Get
        return $response
    } catch {
        throw "Failed to fetch version file: $_"
    }
}

function Download-File {
    param([string]$FileName)
    $url = "https://raw.githubusercontent.com/$GITHUB_OWNER/$GITHUB_REPO/$GITHUB_BRANCH/$FileName"
    $outputPath = Join-Path $PWD $FileName
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing
        Write-Log "  ✓ Downloaded: $FileName" "SUCCESS"
    } catch {
        throw "Failed to download $FileName: $_"
    }
}

function Test-NewerVersion {
    param([string]$Remote, [string]$Local)
    
    $remoteParts = $Remote -split '\.' | ForEach-Object { [int]$_ }
    $localParts = $Local -split '\.' | ForEach-Object { [int]$_ }
    
    for ($i = 0; $i -lt (Math::Max($remoteParts.Length, $localParts.Length)); $i++) {
        $rv = if ($i -lt $remoteParts.Length) { $remoteParts[$i] } else { 0 }
        $lv = if ($i -lt $localParts.Length) { $localParts[$i] } else { 0 }
        
        if ($rv -gt $lv) { return $true }
        if ($rv -lt $lv) { return $false }
    }
    return $false
}

function Start-Update {
    Write-Log "Checking for updates..."
    
    try {
        # Get remote version
        $remoteVersionData = Get-RemoteVersion
        $remoteVersion = $remoteVersionData.version
        Write-Log "Remote version: $remoteVersion"
        
        # Get local version
        $localVersion = "0.0.0"
        if (Test-Path $LOCAL_VERSION_PATH) {
            $localVersionData = Get-Content $LOCAL_VERSION_PATH | ConvertFrom-Json
            $localVersion = $localVersionData.version
        }
        Write-Log "Local version: $localVersion"
        
        # Check if update needed
        if (-not (Test-NewerVersion -Remote $remoteVersion -Local $localVersion) -and -not $ForceUpdate) {
            Write-Log "✓ Up to date!" "SUCCESS"
            return
        }
        
        Write-Log "Update available: $localVersion → $remoteVersion"
        
        # Create backup
        Write-Log "Creating backup..."
        $backupDir = ".\backup-$(Get-Date -Format 'yyyyMMdd_HHmmss')"
        New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
        
        foreach ($file in $FILES_TO_UPDATE) {
            if (Test-Path $file) {
                Copy-Item -Path $file -Destination (Join-Path $backupDir $file)
            }
        }
        Write-Log "  ✓ Backup saved to: $backupDir" "SUCCESS"
        
        # Download updated files
        Write-Log "Downloading updates..."
        foreach ($file in $FILES_TO_UPDATE) {
            Download-File -FileName $file
        }
        
        # Update local version file
        $remoteVersionData | ConvertTo-Json | Set-Content $LOCAL_VERSION_PATH
        
        Write-Log "✓ Update completed successfully!" "SUCCESS"
        
    } catch {
        Write-Log "✗ Error: $_" "ERROR"
        exit 1
    }
}

# Execute
Start-Update