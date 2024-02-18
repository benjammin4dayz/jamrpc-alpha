import fs from 'fs';
import semver from 'semver';

class VersionManager {
  /**
   * @param {string} repo a slash delimited string e.g. `USER/REPO_NAME`
   */
  constructor({
    repo,
    currentVersion,
    userAgent,
    requestFn,
    outfile,
    debug,
    logger,
    personalAccessTokenSecret,
    onUpdateAvailableCb,
  }) {
    if (!repo) throw new Error('Missing repo from which to fetch data');
    if (!userAgent)
      throw new Error(
        'Identify yourself with a userAgent when making requests'
      );

    this.debug = debug || false;
    this.logger = logger || console;

    this.fetch = requestFn || fetch;
    this.outfile = outfile || null;

    this.versionCurrent = currentVersion || null;

    this.onUpdateAvailableCb = onUpdateAvailableCb || (() => {});

    this.headers = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': userAgent,
      ...(personalAccessTokenSecret && {
        Authorization: `Bearer ${personalAccessTokenSecret}`,
      }),
    };
    this.endpoint = `https://api.github.com/repos/${repo}/releases/latest`;
    this.downloadUrl = `https://github.com/${repo}/releases/latest`;

    this.response = null;
    this.versionAvailable = null;
  }

  // set version(o) {
  //   this._version = {
  //     current: o?.current,
  //     available: o?.available,
  //     lastUpdateTime: Date.now(),
  //   };
  // }
  // get version() {
  //   return this._version;
  // }

  async init() {
    this.response = await this.makeRequest();
    this.DBG('RECEIVE_RESPONSE');
    this.versionAvailable = this.response.tag_name;

    const isUpdateAvailable = this.semverCheck();
    if (isUpdateAvailable) {
      this.logger.log(
        `Update available! ${this.versionAvailable} (current: ${this.versionCurrent})`
      );
      try {
        this.onUpdateAvailableCb();
      } catch (e) {
        console.error('Failed to call onUpdateAvailableCb', e);
      }
    } else {
      this.logger.log(`Up to date! (current: ${this.versionCurrent})`);
    }

    if (this.outfile) {
      this.logger.log(`Writing ${this.outfile}...`);
      fs.writeFileSync(this.outfile, JSON.stringify(this.response), 'utf8');
    }
    return this.response;
  }

  /**
   *
   * @returns {boolean} true if the current version is outdated
   */
  semverCheck() {
    if (this.versionAvailable) {
      return semver.gt(this.versionAvailable, this.versionCurrent);
    } else {
      return false;
    }
  }

  async makeRequest() {
    this.DBG('SEND_REQUEST');
    return this.fetch(this.endpoint, {
      method: 'GET',
      headers: this.headers,
    })
      .then((r) => r.json())
      .catch((e) => {
        this.logger.log('An error occured while making the request');
        throw e;
      });
  }

  DBG(idx) {
    if (this.debug) {
      switch (idx) {
        case 'SEND_REQUEST':
          this.logger.log(
            `REQUEST:\n  => ${this.endpoint}\n  => User-Agent: ${this.headers['User-Agent']}`
          );
          break;
        case 'RECEIVE_RESPONSE':
          this.logger.log('<==');
          this.logger.log(JSON.stringify(this.response, null, 2));
          break;
        default:
          this.logger.log(`DEBUG: ${idx}`);
      }
    }
  }
}

export default VersionManager;
export { VersionManager };
