@echo off

set "NV=20.11.1"
set "ND=.\extensions\node\_runtime"
set "FN=node-v%NV%-win-x64"
set "URL=https://nodejs.org/dist/v%NV%/%FN%.zip"

:: Download
echo This script will automatically install JamRPC dependencies.
echo -----------------------------------------------------------
echo.
echo [node.exe]: v%NV% (%URL%)
echo   =^> %ND%\node.exe
echo.
pause
mkdir "%ND%" 2>nul
curl -o "%ND%\node.zip" "%URL%"

:: Extract
powershell -Command "Expand-Archive -Path "%ND%\node.zip" -DestinationPath "%ND%"
powershell -Command "Copy-Item -Path "%ND%\%FN%\node.exe" -Destination "%ND%" -Force"

:: Cleanup
echo Cleaning temporary files...
echo.
del "%ND%\node.zip"
rmdir /s /q "%ND%\%FN%"

:: Complete
echo Done!
pause