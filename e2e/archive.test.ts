import { afterAll, beforeAll, describe, test } from "vitest";
import { chromium } from "playwright";
import { expect } from "@playwright/test";
import type { Browser, Page } from "playwright";

describe("Games archive", async () => {
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

  test("lists previous games", async () => {
    await page.goto("http://localhost:3000/archive");
    await expect(page.locator("tbody tr:first-child span")).toContainText([
      "WALL-E",
      "tie",
    ]);
    await expect(page.locator("tbody tr:last-child span")).toContainText([
      "WALL-E",
      "won",
    ]);
  });

  test("allows viewing archived games turn-by-turn", async () => {
    await page.goto("http://localhost:3000/view/clh3cua7600024khz4zg5833t");

    await expect(page.locator("tbody")).toContainText("X");
    await expect(page.locator("tbody")).not.toContainText("O");

    await page
      .getByRole("button")
      .filter({ hasText: "View next turn" })
      .click();

    await expect(page.locator("tbody")).toContainText("X");
    await expect(page.locator("tbody")).toContainText("O");
  });

  test("highlights winning line", async () => {
    await page.goto("http://localhost:3000/view/clh3cua7600024khz4zg5833t");

    await page
      .getByRole("button")
      .filter({ hasText: "View next turn" })
      .click();
    await page
      .getByRole("button")
      .filter({ hasText: "View next turn" })
      .click();
    await page
      .getByRole("button")
      .filter({ hasText: "View next turn" })
      .click();
    await page
      .getByRole("button")
      .filter({ hasText: "View next turn" })
      .click();

    await expect(page.locator(".shadow-cell-active")).toHaveCount(5);

    await expect(
      page.locator("tbody tr:nth-child(2) td:nth-child(1) div")
    ).not.toHaveClass(/text-gray-300/);
    await expect(
      page.locator("tbody tr:nth-child(2) td:nth-child(2) div")
    ).toHaveClass(/text-gray-300/);
  });
});
