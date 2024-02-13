import fs from "fs";

class VersionManager {
  /**
   * @param {string} repo a slash delimited string e.g. `USER/REPO_NAME`
   */
  constructor({
    repo,
    userAgent,
    requestFn,
    outfile,
    debug,
    logger,
    personalAccessTokenSecret,
  }) {
    if (!repo) throw new Error("Missing repo from which to fetch data");
    if (!userAgent)
      throw new Error(
        "Identify yourself with a userAgent when making requests",
      );

    this.debug = debug || false;
    this.logger = logger || console;

    this.fetch = requestFn || fetch;
    this.outfile = outfile || null;

    this.versionCurrent = "v?.?.?";

    this.headers = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": userAgent,
      ...(personalAccessTokenSecret && {
        Authorization: `Bearer ${personalAccessTokenSecret}`,
      }),
    };
    this.endpoint = `https://api.github.com/repos/${repo}/releases/latest`;

    this.response = null;
    this.versionLatest = null;
  }

  set version(o) {
    this._version = {
      current: o?.current,
      available: o?.available,
      lastUpdateTime: Date.now(),
    };
  }
  get version() {
    return this._version;
  }

  async init() {
    this.response = await this.makeRequest();
    this.DBG("RECEIVE_RESPONSE");
    this.versionLatest = this.response.tag_name;
    if (this.outfile) {
      this.logger.log(`Writing ${this.outfile}...`);
      fs.writeFileSync(this.outfile, this.response, "utf8");
    }
    return this.response;
  }

  async makeRequest() {
    this.DBG("SEND_REQUEST");
    return this.fetch(this.endpoint, {
      method: "GET",
      headers: this.headers,
    })
      .then((r) => r.json())
      .catch((e) => {
        this.logger.log("An error occured while making the request");
        throw e;
      });
  }

  DBG(idx) {
    if (this.debug) {
      switch (idx) {
        case "SEND_REQUEST":
          this.logger.log(
            `REQUEST:\n  => ${this.endpoint}\n  => User-Agent: ${this.headers["User-Agent"]}`,
          );
          break;
        case "RECEIVE_RESPONSE":
          this.logger.log("<==");
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
