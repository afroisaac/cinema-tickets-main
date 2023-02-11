import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";

export default class TicketService {
    /**
     * Should only have private methods other than the one below.
     */

    purchaseTickets(accountId, ...ticketTypeRequests) {
        // throws InvalidPurchaseException

        if (accountId <= 0) {
            throw new InvalidPurchaseException("Invalid account with insufficient fund");
        }

        let valid = ticketTypeRequests.some((item) => item.getTicketType() === this.#Fares[0].ticketType);

        if (!valid) {
            throw new InvalidPurchaseException("No Adult ticket in this purchase, must contain at least one Adult ticket");
        }

        let totalAmount = 0;
        let totalNoOfTickets = 0;

        ticketTypeRequests.forEach((request) => {
            let fare = this.#Fares.find((ticket) => ticket.ticketType === request.getTicketType());
            totalNoOfTickets += request.getNoOfTickets();
            totalAmount += fare.price * request.getNoOfTickets();
        });

        if (parseInt(totalNoOfTickets) > parseInt(this.#maxTicketAllowed)) {
            throw new InvalidPurchaseException("Maximum number of allowed tickets of 20 in a single purchase exceeded");
        }

        //return totalAmount;
    }

    #Fares = [
        { ticketType: "ADULT", price: 20 },
        { ticketType: "CHILD", price: 10 },
        { ticketType: "INFANT", price: 0 },
    ];
    #maxTicketAllowed = 20;
}
