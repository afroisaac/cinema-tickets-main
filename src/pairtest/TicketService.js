import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";

export default class TicketService {
    /**
     * Should only have private methods other than the one below.
     */

    #amountToPay;
    #totalNoOfTickets;

    constructor() {}

    purchaseTickets(accountId, ...ticketTypeRequests) {
        // throws InvalidPurchaseException
        if (accountId <= 0) {
            throw new InvalidPurchaseException("Insufficient fund");
        }
    }

    #Fares = [
        { ticketType: "ADULT", price: 20 },
        { ticketType: "CHILD", price: 10 },
        { ticketType: "INFANT", price: 0 },
    ];
}
