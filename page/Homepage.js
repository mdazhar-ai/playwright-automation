export class HomePage {

    constructor(page) {
        this.page = page;

        // Locators
        this.swiftAI = page.locator(".text-white[href='/swift-ai']");
    }

    // Actions
    async open() {
        await this.page.goto('https://www.amnetdigital.com/');
    }

    async maximize() {
        await this.page.setViewportSize({ width: 1366, height: 768 });
    }

    async clickSwiftAI() {
        await this.swiftAI.waitFor({ state: 'visible' });
        await this.swiftAI.click();
    }

    async getTitle() {
        return await this.page.title();
    }
}