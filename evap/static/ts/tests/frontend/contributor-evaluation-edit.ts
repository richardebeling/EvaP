import { test, expect } from "@jest/globals";
import { ElementHandle } from "puppeteer";
import { sleep, selectOrError, assert } from "../../src/utils";

import { pageHandler } from "../utils/page";

test("contact-modal-opens", pageHandler(
    "/contributor/evaluation/PK/edit/normal.html",
    async page => {
        const modalVisible = async (modalHandle: ElementHandle) => await page.evaluate((modal) => {
            return window.getComputedStyle(modal).display == "block";
        }, modalHandle);

        // "Request changes" button

        const changeEvaluationRequestModal = await page.$("#changeEvaluationRequestModal");
        assert(changeEvaluationRequestModal != null);
        expect(await modalVisible(changeEvaluationRequestModal)).toBe(false);

        const [requestChangesButton] = await page.$x("//button[contains(., 'Request changes')]");
        assert(requestChangesButton != null);
        await (requestChangesButton as ElementHandle<Element>).click();
        await page.waitForSelector("#changeEvaluationRequestModal", {visible: true});
        expect(await modalVisible(changeEvaluationRequestModal)).toBe(true);

        await page.waitForSelector("textarea:focus", {visible:true})

        // const changeEvaluationRequestModalCloseButton = await page.waitForSelector('button.btn-close', {visible: true});
        // assert(changeEvaluationRequestModalCloseButton != null);
        // await changeEvaluationRequestModalCloseButton.click();

        await changeEvaluationRequestModal.press("Escape");
        await page.waitForSelector("#changeEvaluationRequestModal", {hidden: true});

        // TODO: Current problem: opening the next modal only works _after_ the previous one was closed
        // However, we can not currently wait for that to happen -> if you break here and then resume, everything works
        // otherwise, it fails.
        await jestPuppeteer.debug();

        // "Request creation of new account" button

        const createAccountRequestModal = await page.$("#createAccountRequestModal");
        assert(createAccountRequestModal != null);
        expect(await modalVisible(createAccountRequestModal)).toBe(false);

        const [requestAccountCreateButton] = await page.$x("//button[contains(., 'Request creation of new account')]");
        assert(requestAccountCreateButton != null);
        (requestAccountCreateButton as ElementHandle<Element>).click();
        await page.waitForSelector("#createAccountRequestModal", {visible: true});
        expect(await modalVisible(createAccountRequestModal)).not.toBe(null);
    },
), 120 * 60 * 1000);

test("contact-modal-opens-with-allow-editors-to-edit", pageHandler(
    "/contributor/evaluation/PK/edit/allow_editors_to_edit.html",
    async page => {
    },
));
