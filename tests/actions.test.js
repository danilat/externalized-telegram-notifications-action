
const core = require("@actions/core");
const sendMessage = require("../sendMessage");
require("dotenv").config()

describe("run the action", () =>{
  let failedSpy;
  beforeEach(() => {
    core.getInput = (argName) => {
      switch (argName) {
        case "to":
          return process.env.TO;
        case "content-url":
          return process.env.URL;
        case "token":
          return process.env.TOKEN;
          case "parse-mode":
            return "html";
      }
    };
    failedSpy = jest.spyOn(core, "setFailed");
  });

  afterEach(() => {    
    jest.clearAllMocks();
  });

  describe("when the configuration is correct", () =>{
    test("the notification is sent", async () => {
      const reponse = await sendMessage()

      expect(reponse.message.statusCode).toBe(200);
    });
  });

  describe("when the TOKEN configuration is incorrect", () =>{
    test("the notification is not sent", async () => {
      process.env.TOKEN = "foo"

      const reponse = await sendMessage()

      expect(reponse.message.statusCode).toBe(404);
      expect(failedSpy).toHaveBeenCalled();
    });
  });

  describe("when the TO configuration is incorrect", () =>{
    test("the notification is not sent", async () => {
      process.env.TO = "foo"

      const reponse = await sendMessage()

      expect(reponse.message.statusCode).toBe(404);
      expect(failedSpy).toHaveBeenCalled();
    });
  });

  describe("when the URL configuration is incorrect", () =>{
    test("the notification is not sent", async () => {
      process.env.URL = "blabla"

      const reponse = await sendMessage()

      expect(failedSpy).toHaveBeenCalled();
    });
  });
})
