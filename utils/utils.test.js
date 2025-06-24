import { formatDate } from "./utils";
import { describe, test, expect } from "vitest";

describe("formatDate", () => {
    test("formatDate function returns a formatted date as a string", () => {
        const input = "2020-11-22T11:13:00.000Z"
        const outcome = formatDate(input)
        expect(outcome).toBe("November 22, 2020")
    })
    test("formatDate function returns an empty string when passed an invalid Date", () => {
        const input = ""
        const outcome = formatDate(input)
        expect(outcome).toBe("Invalid Date")
    })
})