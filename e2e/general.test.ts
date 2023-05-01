import { afterAll, beforeAll, describe, test } from "vitest";
import { chromium } from "playwright";
import { expect } from "@playwright/test";
import type { Browser, Page } from "playwright";

describe("General", async () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();

    await page.goto("http://localhost:3000/");
    await page.getByRole("button").filter({ hasText: "Ok" }).click();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("shows 404 message on unknown pages", async () => {
    await page.goto("http://localhost:3000/404");
    await expect(page.locator("main")).toContainText("Error 0x404");
  });
});
