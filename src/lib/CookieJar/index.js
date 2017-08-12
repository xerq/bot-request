// @flow

import { CookieJar as _CookieJar, Cookie, CookieAccessInfo } from "cookiejar";
import { parse as parseURL } from "url";
import type { Response as $Response } from "got";

class CookieJar extends _CookieJar {
    constructor() {
        super();
    }

    /**
     * Handles the `response` - Collects the cookies
     * @returns $Response
     * @param {$Response} response 
     */
    handler(response: $Response): $Response {
        if (!response.headers) {
            return response;
        }

        const cookies: Array<string> = response.headers["set-cookie"] || [""];

        if (!cookies) {
            return response;
        }

        const parsedURL = parseURL(response.url);

        cookies.forEach((cookie) => this.setCookie(cookie, parsedURL.host, parsedURL.pathname));

        return response;
    }

    /**
     * Fills the `requestOptions` with cookies and returns it
     * @returns filled requestOptions
     * @param {string} url - URL where request will be sent
     * @param {Object} requestOptions
     */
    fill(url: string, requestOptions: Object): Object {
        const parsedURL = parseURL(url);

        const cookies: Array<Cookie> = this.getCookies(CookieAccessInfo(parsedURL.host, parsedURL.pathname, parsedURL.protocol === "https:"));

        if (!cookies.length) {
            return requestOptions;
        }

        if (!requestOptions.headers) {
            requestOptions.headers = {};
        }

        requestOptions.headers = {
            cookie: cookies.map((cookie) => cookie.toValueString()).join("; "),
            ...requestOptions.headers
        };

        return requestOptions;
    }
}

export default CookieJar;