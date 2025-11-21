# Script to move motion primitives from root to src/components
if (Test-Path "components/motion-primitives") {
    Write-Host "Moving motion primitives to correct location..."
    
    # Create target directory if it doesn't exist
    if (!(Test-Path "src/components/motion-primitives")) {
        New-Item -ItemType Directory -Path "src/components/motion-primitives" -Force
    }
    
    # Move all files
    Move-Item -Path "components/motion-primitives/*" -Destination "src/components/motion-primitives/" -Force
    
    # Remove empty directories
    Remove-Item -Path "components" -Recurse -Force -ErrorAction SilentlyContinue
    
    Write-Host "✅ Motion primitives moved successfully!"
} else {
    Write-Host "No motion primitives found in root components folder."
}
