const fs = require("fs");

function makeInstaller({ outfile } = {}) {
  const getWin32 = () =>
    [
      `@echo off`,
      `set "NV=20.11.1"`,
      `set "ND=.\\extensions\\node\\_runtime"`,
      `set "FN=node-v%NV%-win-x64"`,
      `set "URL=https://nodejs.org/dist/v%NV%/%FN%.zip"`,
      `:: Download`,
      `echo This script will automatically install JamRPC dependencies.`,
      `echo -----------------------------------------------------------`,
      `echo.`,
      `echo [node.exe]: v%NV% (%URL%)`,
      `echo   =^> %ND%\\node.exe`,
      `echo.`,
      `pause`,
      `mkdir "%ND%" 2>nul`,
      `curl -o "%ND%\\node.zip" "%URL%"`,
      `:: Extract`,
      `powershell -Command "Expand-Archive -Path "%ND%\\node.zip" -DestinationPath "%ND%"`,
      `powershell -Command "Copy-Item -Path "%ND%\\%FN%\\node.exe" -Destination "%ND%" -Force"`,
      `:: Cleanup`,
      `echo Cleaning temporary files...`,
      `echo.`,
      `del "%ND%\\node.zip"`,
      `rmdir /s /q "%ND%\\%FN%"`,
      `:: Complete`,
      `echo Done!`,
      `pause`,
    ].join("\n");

  const win32 = getWin32();
  if (outfile) fs.writeFileSync(outfile, win32, "utf8");
  return {
    win32,
    linux: "",
  };
}

function makeUninstaller({ appName = "unnamed", outfile } = {}) {
  const getWin32 = () =>
    [
      `@echo off`,
      `set BIN_NAME=${appName}`,
      `set T_DIR=%USERPROFILE%\\AppData\\Roaming\\%BIN_NAME%-win_x64.exe`,
      `echo The following folder will be removed:`,
      `echo %T_DIR%`,
      `echo.`,
      `set /p choice="Continue? (y/n): "`,
      `if /i "%choice%"=="y" (`,
      `rmdir /s /q %T_DIR%`,
      `echo Done!`,
      `echo.`,
      `) else (`,
      `echo Deletion cancelled. No files were removed.`,
      `)`,
      `echo You may now delete the folder which contains this script.`,
      `pause`,
    ].join("\n");

  const win32 = getWin32();
  if (outfile) fs.writeFileSync(outfile, win32, "utf8");
  return {
    win32,
    linux: "",
  };
}

module.exports = { makeInstaller, makeUninstaller };
