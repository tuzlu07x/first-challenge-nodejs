const puppeteer = require("puppeteer");

class Bot {
  constructor(email, password, url) {
    this.email = email;
    this.password = password;
    this.url = url;
  }

  async login(req, res) {
    let browser = await puppeteer.launch({
      headless: false,
    });
    let page = await browser.newPage();
    await page.goto(this.url, { waitUntil: "load", timeout: 0 });

    await page.type("#username", this.email);
    await page.type("#password", this.password);
    await page.click(".btn__primary--large");

    await page.waitForNavigation();
    await page.goto(
      "https://www.linkedin.com/jobs/search/?currentJobId=3550759798&distance=25.0&f_TPR=r86400&f_WT=2%2C3&geoId=102105699&keywords=Php",
      { waitUntil: "load", timeout: 0 }
    );
    await page.waitForNavigation();

    await page.waitForSelector(".mn-connection-card__details");

    const connections = await page.evaluate(() => {
      const names = document.querySelectorAll(".mn-connection-card__details");
      const data = [];

      for (let i = 0; i < names.length; i++) {
        data.push({
          name: names[i].innerText,
          button: buttons[i].innerText,
        });
      }
      return data;
    });
    let jsonParse = JSON.stringify(connections);
    res.send(jsonParse);

    await browser.close();
  }
}
module.exports = Bot;
