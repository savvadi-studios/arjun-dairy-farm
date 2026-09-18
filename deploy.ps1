# ==============================================================================
# Arjun Dairy Farm - GitHub Deployment Script
# Author: Savvadi Studios (savvadi.studios@gmail.com)
# ==============================================================================

param (
    [string]$GitHubUser = "Savvadi",
    [string]$RepoName = "arjun-dairy-farm"
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   ARJUN DAIRY FARM - GITHUB DEPLOYMENT UTILITY" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Configuring Git author as savvadi.studios@gmail.com..." -ForegroundColor Yellow

$env:Path = "C:\Users\savva\AppData\Local\Programs\Git\cmd;" + $env:Path

git config user.name "Savvadi Studios"
git config user.email "savvadi.studios@gmail.com"

# Stage all files and commit
git add .
git commit -m "Deploy Arjun Dairy Farm website with responsive mobile/tablet/laptop layout and WhatsApp ordering" --allow-empty

Write-Host "`nTarget Remote: https://github.com/$GitHubUser/$RepoName.git" -ForegroundColor Cyan

# Set remote origin
git remote remove origin 2>$null
git remote add origin "https://github.com/$GitHubUser/$RepoName.git"
git branch -M main

Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
Write-Host "Note: If prompted, please complete browser sign-in for Git Credential Manager." -ForegroundColor Gray

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccessfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository URL: https://github.com/$GitHubUser/$RepoName" -ForegroundColor Cyan
    Write-Host "To enable GitHub Pages:" -ForegroundColor Yellow
    Write-Host "1. Go to https://github.com/$GitHubUser/$RepoName/settings/pages"
    Write-Host "2. Under 'Build and deployment > Source', select 'GitHub Actions'"
    Write-Host "3. The site will deploy automatically via .github/workflows/deploy.yml"
} else {
    Write-Host "`nPush failed. Please ensure the repository 'https://github.com/new' exists with name '$RepoName' under your account." -ForegroundColor Red
}
