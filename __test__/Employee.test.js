const { expect } = require("@jest/globals")
const Employee = require("../lib/Employee")

describe('employee class', () => {
    test ("Should create an instance of the Employee class", () => {
        const sean = new Employee("coby")
        expect (sean.name).toBe('coby')
    })
})
