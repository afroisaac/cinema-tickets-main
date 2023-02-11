import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import TicketService from "../src/pairtest/TicketService";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException.js";

//jest.mock("../thirdparty/paymentgateway/TicketPaymentService.js");
describe("TicketService", () => {
    let ticketService;
    let request = [];
    beforeEach(() => {
        ticketService = new TicketService();
        request = [new TicketTypeRequest("INFANT", 2), new TicketTypeRequest("CHILD", 4)];
    });

    describe("purchaseTickets", () => {
        it("Throws an exception if accoundId is less than 1", () => {
            expect(() => {
                ticketService.purchaseTickets(-1, ...request);
            }).toThrow(new InvalidPurchaseException("Invalid account with insufficient fund"));
        });

        it("should throw an error if there are no adult tickets in the purchase", () => {
            expect(() => {
                ticketService.purchaseTickets(1, ...request);
            }).toThrow(new InvalidPurchaseException("No Adult ticket in this purchase, must contain at least one Adult ticket"));
        });

        it("should throw an error if the total number of tickets exceed 20", () => {
            expect(() => {
                request.push(new TicketTypeRequest("ADULT", 22));
                ticketService.purchaseTickets(3, ...request);
            }).toThrow(new InvalidPurchaseException("Maximum number of allowed tickets of 20 in a single purchase exceeded"));
        });

        it("should calculate the total amount correctly", () => {
            request.push(new TicketTypeRequest("ADULT", 2));
            // const totalAmount = ticketService.purchaseTickets(1, ...request);
            //expect(totalAmount).toEqual(80);
            // expected total amount is (2 * 0) + (4 * 10) + (2 * 20) = 0 + 40 + 40 = 80
        });

        it("should calculate correctly the total seats to reserve", () => {
            request.push(new TicketTypeRequest("ADULT", 2));
            //const totalSeats = ticketService.purchaseTickets(1, ...request);
            //expect(totalSeats).toEqual(6);
            // expected total no of seats (2 * 0) + (4 * 1) + (2 * 1) = 0 + 4 + 2 = 6
        });
    });
});
