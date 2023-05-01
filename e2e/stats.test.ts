import { afterAll, beforeAll, describe, test } from "vitest";
import { chromium } from "playwright";
import { expect } from "@playwright/test";
import type { Browser, Page } from "playwright";

describe("Statistics", async () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();

    await page.goto("http://localhost:3000/stats");
    await page.getByRole("button").filter({ hasText: "Ok" }).click();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("shows message for users not logged in", async () => {
    await expect(page.locator("section:first-of-type h2")).toContainText(
      "Login for personal stats"
    );
  });

  test("shows top players list", async () => {
    await expect(page.locator("tbody tr:first-child")).toContainText("WALL-E");
    await expect(page.locator("tbody tr:last-child")).toContainText("HAL9000");
  });

  test("calculates win/loss ratio", async () => {
    await expect(page.locator("tbody tr:first-child")).toContainText("5.0");
    await expect(page.locator("tbody tr:last-child")).toContainText("2.5");
  });
});
