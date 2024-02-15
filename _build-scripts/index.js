const fs = require("fs");

const paths = require("./get-paths");
const setMetadata = require("./set-metadata");
const { makeInstaller, makeUninstaller } = require("./make-installers");

const { name } = require("./../package.json");

setMetadata(paths);

const outdir = `${paths.baseDir}/dist/${name}`;

fs.mkdir(outdir, { recursive: true }, () => {
  makeInstaller({
    outfile: `${outdir}/install.cmd`,
  });

  makeUninstaller({
    appName: name,
    outfile: `${outdir}/uninstall.cmd`,
  });
});
