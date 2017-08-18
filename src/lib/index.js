// @flow

import got from "got";
import CookieJar from "./CookieJar";

export type requestOptions = {
    url?: string,
    headers?: Object,
    method?: string
};

export class Client {
    cookieJar: CookieJar;
    defaultHeaders: Object;

    constructor(options: { cookieJar?: CookieJar, defaultHeaders?: Object } = {}) {
        this.cookieJar = options.cookieJar || new CookieJar();
        this.defaultHeaders = options.defaultHeaders || {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
            "accept-language": "en-US,en;q=0.5",
            "cache-control": "max-age=0"
        };
    }

    /**
     * Send a request
     * @returns Promise<$Response>
     * @param {string} url - URL where the request should be sent
     * @param {requestOptions} options
     */
    async request(url: string, options?: requestOptions = {}) {
        options = this.cookieJar.fill(url, options || {});

        options.headers = {
            ...options.headers,
            ...this.defaultHeaders
        };

        options.followRedirect = false;

        const response: Response = await got(url, options);

        this.cookieJar.handler(response);

        if ((response.headers: Object)["location"]) {
            return await this.get((response.headers: Object)["location"]);
        }

        return response;
    }

    /**
     * Sends a get request
     * @returns Promise<$Response>
     * @param {string} url - URL where the request should be sent
     * @param {requestOptions} options
     */
    async get(url: string, options?: requestOptions = {}) {
        options.method = "GET";
        
        return await this.request(url, options);
    }

    async post(url: string, options?: requestOptions = {}) {
        options.method = "POST";

        return await this.request(url, options);
    }
}

export default Client;
