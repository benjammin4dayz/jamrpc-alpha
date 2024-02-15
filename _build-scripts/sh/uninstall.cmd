@echo off

set BIN_NAME=${appName}
set T_DIR=%USERPROFILE%\AppData\Roaming\%BIN_NAME%-win_x64.exe

echo The following folder will be removed:
echo %T_DIR%
echo.

set /p choice="Continue? (y/n): "
if /i "%choice%"=="y" (
    rmdir /s /q %T_DIR%
    echo Done!
    echo.
) else (
    echo Deletion cancelled. No files were removed.
)

echo You may now delete the folder which contains this script.
pause