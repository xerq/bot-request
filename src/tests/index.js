import { expect } from "chai";
import Client from "../lib/";
// import CookieJar from "../lib/CookieJar/";

describe("Cookie Jar", () => {
    // it("Should process the ")
});

describe("Request Client", () => {
    const client = new Client();

    const websites = [
        {
            name: "Google",
            url: "https://www.google.pl/"
        },
        {
            name: "Github Login",
            url: "https://github.com/login"
        }
    ];

    // describe("Google", () => {
    //     it("Send request to google and collect cookies", async () => {
    //         await client.get("https://www.google.pl/");

    //         const { headers } = client.cookieJar.fill("https://www.google.pl/", {});

    //         expect(headers.cookie || []).to.not.be.empty;
    //     });

    //     it("Send request with cookies to google", async () => {
    //         const response = await client.get("https://www.google.pl/");
            
    //         const cookie = response.req._headers.cookie || "";

    //         expect(cookie).to.not.be.empty; 
    //     });
    // });

    // describe("Github", () => {
    //     it("Send request and collect cookies", async () => {
    //         await client.get("https://github.com/login");

    //         const { headers } = client.cookieJar.fill("https://github.com/login", {});

    //         expect(headers.cookie || []).to.not.be.empty;
    //     });

    //     it("Send request with collected cookies", async () => {
    //         const { req } = await client.get("https://github.com/login");

    //         const cookie = req._headers.cookie || "";

    //         expect(cookie).to.not.be.empty; 
    //     });
    // });

    describe("Dynamic Test of Websites", () => {
        for (let { name, url } of websites) {
            describe(`Website: ${name} (${url})`, () => {
                it("Send request and collect cookies", async () => {
                    await client.get(url);

                    const { headers } = client.cookieJar.fill(url, {});

                    expect(headers.cookie || []).to.not.be.empty;
                });

                it("Send request with collected cookies", async () => {
                    const { req } = await client.get(url);

                    const cookie = req._headers.cookie || "";

                    expect(cookie).to.not.be.empty; 
                });
            });
        }
    });
});