import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";

export default class TicketService {
    /**
     * Should only have private methods other than the one below.
     */
    constructor() {
        const calculateAmountToPay = (...ticketTypeRequests) => {
            return ticketTypeRequests.reduce((amount, currentTicketTypeRequest) => {
                // Calculate Adult fare
                if (currentTicketTypeRequest.getTicketType == this.#Fares[0].ticketType) {
                    amount = amount + currentTicketTypeRequest.getNoOfTickets() * this.#Fares[0].price;
                }

                // Calculate Child fare
                if (currentTicketTypeRequest.getTicketType == this.#Fares[1].ticketType) {
                    amount = amount + currentTicketTypeRequest.getNoOfTickets() * this.#Fares[1].price;
                }

                // Calculate Infant fare
                if (currentTicketTypeRequest.getTicketType == this.#Fares[2].ticketType) {
                    amount = amount + currentTicketTypeRequest.getNoOfTickets() * this.#Fares[2].price;
                }

                return amount;
            }, 0);
        };

        const getTotalNoOfTickets = (...ticketTypeRequests) => {
            return ticketTypeRequests.reduce((total, ticketTypeRequestItem) => {
                total = total + ticketTypeRequestItem.getNoOfTickets();
            }, 0);
        };

        const validatePurchase = (...ticketTypeRequests) => {
            ticketTypeRequests.map((ticketTypeRequestItem) => {
                if (ticketTypeRequestItem.getTicketType == this.#Fares[0].ticketType) return true;
            });

            return false;
        };
    }

    purchaseTickets(accountId, ...ticketTypeRequests) {
        // throws InvalidPurchaseException
        if (accountId <= 0) {
            throw new InvalidPurchaseException("Insufficient fund");
        }

        if (this.getTotalNoOfTickets(ticketTypeRequests) > 20) {
            throw new InvalidPurchaseException("Maximum tickets purchase allowed exceeded, you can't buy more than 20");
        }

        if (this.validatePurchase(ticketTypeRequests)) {
            const ticketPaymentService = new TicketPaymentService();
            ticketPaymentService.makePayment(accountId, this.calculateAmountToPay(ticketTypeRequests));
        } else {
            throw new InvalidPurchaseException("At least one adult ticket must be purchased for this to go through");
        }
    }

    #Fares = [
        { ticketType: "ADULT", price: 20 },
        { ticketType: "CHILD", price: 10 },
        { ticketType: "INFANT", price: 0 },
    ];
}
