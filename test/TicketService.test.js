import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException.js";

test("Expects the request to contain ADULT ticket", () => {
  const ticketType = [
    { type: "ADULT", price: 20 },
    { type: "CHILD", price: 10 },
    { type: "INFANT", price: 0 },
  ];

  const sampleTicketData = [];
  sampleTicketData.push(new TicketTypeRequest(ticketType[0].type), 2);
  console.log(sampleTicketData);
});
