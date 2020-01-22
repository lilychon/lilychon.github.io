const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

test("Can set office number via constructor argument", () => {
  const testValue = 100;
  const e = new Manager("Foo", 1, "test@test.com", testValue);
  expect(e.officeNumber).toBe(testValue);
});

test("getRole() should return \"Manager\"", () => {
  const testValue = "Manager";
  const e = new Manager("Foo", 1, "test@test.com", 100);
  expect(e.getRole()).toBe(testValue);
});

test("Can get office number via getOffice()", () => {
  const testValue = "100";
  const e = new Manager("Foo", 1, "test@test.com", testValue);
  expect(e.getOffice()).toBe(testValue);
});

//Unit test - test one small part of my app to test the whole app
// THis test file pass the value to the js constructor file.
//testing gitOffice function settting up a new manager
//it is taking the testValue and making sure the result eof that test value
// it expected to be turn as a testValue