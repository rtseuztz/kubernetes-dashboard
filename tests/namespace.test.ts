import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';


let rows: string[] = [];
let fakeNamespace = "thisisafakenamespace1239328"
test.beforeEach(async ({ page }) => {
    // await page.goto('/')
    rows = execSync('kubectl get namespaces -o jsonpath="{.items[*].metadata.name}"').toString().split(" ");
});

test.afterEach(async ({ page }) => {
    try {
        execSync('kubectl delete namespace ' + fakeNamespace)
    } catch (error) {
    }
})

test('the user loads into the home page and sees namespaces', async ({ page }) => {
    console.log(await page.getByRole('table'))
    await page.locator('table').first().waitFor()
    const tableRowsCount = await page.getByRole('table').getByRole('row').count();
    console.log(tableRowsCount)
    expect(tableRowsCount).toBe(rows.length);
});
test('the user loads into the home page and sees namespaces, and one is added', async ({ page }) => {
    execSync('kubectl create namespace ' + fakeNamespace)

    await page.locator('table').first().waitFor()
    rows = execSync('kubectl get namespaces -o jsonpath="{.items[*].metadata.name}"').toString().split(' ');
    setTimeout(() => {

        const tableRowsCount = page.getByRole('table').getByRole('row').count();
        expect(tableRowsCount).toBe(rows.length);
    }, 1000)

});
