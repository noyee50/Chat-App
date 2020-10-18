let expect = require("expect");

let { generateMessage } = require("./message");

describe("Generate Message", () => {
  it("shoul generate correct message object", () => {
    let from = "NOI",
    text = "Some randome text",
    message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({from,text})
  });
});
