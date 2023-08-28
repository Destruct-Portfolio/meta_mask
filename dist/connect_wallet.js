import puppeteer from "puppeteer";
import { generate } from "generate-password";
let pathToExtension = "../10.35.0_0";
(async () => {
    const _browser = await puppeteer.launch({
        headless: false,
        args: [
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`,
        ],
    });
    let pages = await _browser.pages();
    /*   pages.map(async (page) => {
      await page.close();
    });
   */
    let page = pages[0];
    await page.setViewport({
        height: 1200,
        width: 1200,
    });
    await page.goto("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html", { timeout: 0, waitUntil: "networkidle2" });
    // First CHeck Box '#onboarding__terms-checkbox'
    // create a new Wallet "#app-content > div > div.mm-box.main-container-wrapper > div > div > div > ul > li:nth-child(2) > button"
    // wait for nagivation
    // I agree btn "#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div > button.button.btn--rounded.btn-primary.btn--large"
    // wait for nagivation
    await delay(3000);
    await page.waitForSelector("#onboarding__terms-checkbox");
    await page.click("#onboarding__terms-checkbox", { delay: 1000 });
    await page.click("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > ul > li:nth-child(2) > button", { delay: 1000 });
    await page.waitForSelector("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div > button.button.btn--rounded.btn-primary.btn--large");
    await page.click("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div > button.button.btn--rounded.btn-primary.btn--large");
    let password = generate({
        length: 30,
        numbers: true,
        lowercase: true,
        uppercase: true,
    });
    await page.type("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.box.box--margin-top-3.box--flex-direction-row.box--justify-content-center.box--display-flex > form > div:nth-child(1) > label > input", password, { delay: 100 });
    await page.type("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.box.box--margin-top-3.box--flex-direction-row.box--justify-content-center.box--display-flex > form > div:nth-child(2) > label > input", password, { delay: 100 });
    await page.click("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.box.box--margin-top-3.box--flex-direction-row.box--justify-content-center.box--display-flex > form > div.box.box--margin-bottom-4.box--flex-direction-row.box--justify-content-space-between.box--align-items-center.box--display-flex > label > input");
    await page.click("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.box.box--margin-top-3.box--flex-direction-row.box--justify-content-center.box--display-flex > form > button");
    await page.waitForNavigation({ timeout: 0, waitUntil: "networkidle2" });
    console.log("now we will fire the navigation .");
    /*   await page.waitForNavigation({ timeout: 0, waitUntil: "networkidle2" });
  
    await page.click(
      "#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.mm-box.secure-your-wallet__actions.mm-box--margin-bottom-8.mm-box--display-flex.mm-box--gap-4.mm-box--flex-direction-column.mm-box--sm:flex-direction-row.mm-box--justify-content-space-between.mm-box--width-full > button.mm-box.mm-text.mm-button-base.mm-button-base--size-lg.mm-button-base--block.mm-button-secondary.mm-text--body-md-medium.mm-box--padding-right-4.mm-box--padding-left-4.mm-box--display-inline-flex.mm-box--justify-content-center.mm-box--align-items-center.mm-box--color-primary-default.mm-box--background-color-transparent.mm-box--rounded-pill.mm-box--border-color-primary-default.box--border-style-solid.box--border-width-1",
      { delay: 100 }
    );
   */
    await page.goto("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#onboarding/completion", { timeout: 0, waitUntil: "networkidle2" });
    await page.click("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.box.creation-successful__actions.box--margin-top-6.box--flex-direction-row > button", { delay: 500 });
    await page.click("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.onboarding-pin-extension__buttons > button", { delay: 500 });
    await page.click("#app-content > div > div.mm-box.main-container-wrapper > div > div > div > div.onboarding-pin-extension__buttons > button", { delay: 500 });
    await delay(2000);
    await page.click("section button", { delay: 500 });
    await delay(2000);
    await delay(2000);
    console.log(password);
    let x = await page.evaluate(async () => {
        await document.querySelector("#app-content > div > div.mm-box.multichain-app-header.mm-box--margin-bottom-0.mm-box--display-flex.mm-box--align-items-center.mm-box--width-full.mm-box--background-color-background-alternative > div > div.mm-box.mm-box--display-flex.mm-box--justify-content-flex-end.mm-box--align-items-center > div > div > button").click();
        await document.querySelector("button.menu-item").click();
        return document.querySelector("body > div.mm-modal > div:nth-child(3) > div > section > div.mm-box.mm-box--display-flex.mm-box--flex-direction-column.mm-box--align-items-center > div.qr-code > div.box.box--margin-bottom-6.box--flex-direction-row > div > button").innerText;
    });
    console.log(x);
    // to import account
    await page.evaluate(() => {
        document.querySelector("#app-content > div > div.mm-box.multichain-app-header.mm-box--margin-bottom-0.mm-box--display-flex.mm-box--align-items-center.mm-box--width-full.mm-box--background-color-background-alternative > div > button > span > span.mm-box.mm-text.mm-text--body-md.mm-text--font-weight-bold.mm-text--ellipsis.mm-box--color-text-default").click();
    });
    await delay(1000);
    await page.click("body > div.mm-modal > div:nth-child(3) > div > section > div.mm-box > div.mm-box.mm-box--padding-4 > div:nth-child(2) > button");
    await delay(1000);
    await page.type("#private-key-box", "f4248908183666b0980d06d7e43b9a3bdc65a0d562a37f9bac4a186b3b91dfe5");
    await page.click("body > div.mm-modal > div:nth-child(3) > div > section > div.mm-box.mm-box--padding-top-0.mm-box--padding-right-4.mm-box--padding-bottom-4.mm-box--padding-left-4 > div > div.mm-box.mm-box--display-flex.mm-box--gap-4 > button.mm-box.mm-text.mm-button-base.mm-button-base--size-lg.mm-button-base--block.mm-button-primary.mm-text--body-md-medium.mm-box--padding-right-4.mm-box--padding-left-4.mm-box--display-inline-flex.mm-box--justify-content-center.mm-box--align-items-center.mm-box--color-primary-inverse.mm-box--background-color-primary-default.mm-box--rounded-pill");
})();
async function delay(ms) {
    await new Promise((resolve) => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
}
