import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import TicketService from "../src/pairtest/TicketService";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException.js";

//jest.mock("../thirdparty/paymentgateway/TicketPaymentService.js");
describe("TicketService", () => {
    let ticketService;
    let ticketTypeRequest;
    beforeEach(() => {
        ticketService = new TicketService();
        ticketTypeRequest = new TicketTypeRequest("ADULT", parseInt(2));
    });

    describe("purchaseTickets", () => {
        it("Throws an exception if accoundId is less than 1", () => {
            expect(() => {
                ticketService.purchaseTickets(-1, { type: ticketTypeRequest.getTicketType, noOfTickets: ticketTypeRequest.getNoOfTickets });
            }).toThrowError(InvalidPurchaseException, "Insufficient fund");
        });
    });
});
