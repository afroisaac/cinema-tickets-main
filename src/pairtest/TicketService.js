import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

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
        let totalSeats = 0;
        ticketTypeRequests.forEach((request) => {
            let fare = this.#Fares.find((ticket) => ticket.ticketType === request.getTicketType());
            totalNoOfTickets += request.getNoOfTickets();
            totalAmount += fare.price * request.getNoOfTickets();
            totalSeats += fare.seat * request.getNoOfTickets();
        });

        if (parseInt(totalNoOfTickets) > parseInt(this.#maxTicketAllowed)) {
            throw new InvalidPurchaseException("Maximum number of allowed tickets of 20 in a single purchase exceeded");
        }

        const ticketPaymentService = new TicketPaymentService();
        try {
            ticketPaymentService.makePayment(accountId, totalAmount);
            try {
                const seatReservationService = new SeatReservationService();
                seatReservationService.reserveSeat(accountId, totalSeats);
            } catch (ex) {
                console.log(ex.message);
            }
        } catch (ex) {
            console.log(ex.message);
        }
        //return totalAmount;
        //return totalSeats;
    }

    #Fares = [
        { ticketType: "ADULT", price: 20, seat: 1 },
        { ticketType: "CHILD", price: 10, seat: 1 },
        { ticketType: "INFANT", price: 0, seat: 0 },
    ];
    #maxTicketAllowed = 20;
}

// Sample implementation of the TicketService Class. The can be imported in another file and this implementation do in that separate file
let ticketService = new TicketService();
const request = [new TicketTypeRequest("ADULT", 2), new TicketTypeRequest("CHILD", 4)];
ticketService.purchaseTickets(1, ...request);
