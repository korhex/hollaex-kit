import { ORDERBOOK_CONSTANTS } from '../actions/orderbookAction';

const INITIAL_QUICK_TRADE = {
	fetching: false,
	data: {
		symbol: '',
		price: 0,
		side: '',
		size: 0,
		filled: false,
	},
	error: '',
}

const INITIAL_QUOTE = {
	fetching: false,
	data: {
		iat: 0,
		exp: 0,
		symbol: '',
		price: 0,
		side: '',
		size: 0,
	},
	token: '',
	error: '',
	order: {
		fetching: false,
		completed: false,
		error: '',
		data: {},
	}
}

const INITIAL_STATE = {
	fetched: false,
	fetching: false,
	trades: [],
	error: null,
	symbol: 'btc',
	price: 0,
	prices: {
		fiat: 1,
	},
	asks: [],
	bids: [],
	orderbookReady: false,
	quickTrade: INITIAL_QUICK_TRADE,
	quoteData: INITIAL_QUOTE,
};

export default function reducer(state = INITIAL_STATE, { payload, type }) {
	switch(type) {

		case 'CHANGE_SYMBOL':
			return {
				...state,
				symbol: payload.symbol,
			};
		// getOrderbook
		case 'GET_ORDERBOOK_PENDING': {
			return {...state, fetching: true, fetched: false, error: null}
		}
		case 'GET_ORDERBOOK_REJECTED': {
			// alert('Error: ' + payload)
			return {...state, fetching: false, error: payload}
		}
		case 'GET_ORDERBOOK_FULFILLED': {
			let bids = payload.data.bids
			let asks = payload.data.asks
			let allBids = 0 // accumulative bids amounts
			let allAsks = 0 // accumulative asks amounts
			for(let i=0; i<bids.length; i++) {
				if(bids[i]){
					allBids += bids[i][1]
					bids[i][2] = allBids
				}
				if(asks[i]){
					allAsks += asks[i][1]
					asks[i][2] = allAsks
				}
			}
			return {...state, fetching: false, fetched: true, bids, asks}
		}

		// setOrderbook
		case 'SET_ORDERBOOK': {
			const { bids, asks } = payload;
			return {
				...state,
				fetching: false,
				fetched: true,
				bids,
				asks,
				orderbookReady: true
			}
		}

		// getTrades
		case 'GET_TRADES_PENDING': {
			return {...state, fetching: true, fetched: false, error: null}
		}
		case 'GET_TRADES_REJECTED': {
			// alert('Error: ' + payload)
			return {...state, fetching: false, error: payload}
		}
		case 'GET_TRADES_FULFILLED': {
			return {...state, fetching: false, fetched: true, trades: payload.data}
		}

		// addTrades
		case 'ADD_TRADES': {
			const price = payload[0].price;
			const symbol = payload[0].symbol;
			const prices = { ...state.prices }
			prices[state.symbol] = price;

			return {
				...state,
				fetching: false,
				fetched: true,
				trades: payload.concat(state.trades),
				price,
				prices,
			}
		}

		case ORDERBOOK_CONSTANTS.QUICK_TRADE_PENDING:
			return {
				...state,
				quickTrade: {
					...INITIAL_QUICK_TRADE,
					fetching: true,
					data: {
						price: state.quickTrade.data.price,
					},
				}
			};
		case ORDERBOOK_CONSTANTS.QUICK_TRADE_FULFILLED:
			return {
				...state,
				quickTrade: {
					...INITIAL_QUICK_TRADE,
					fetching: false,
					data: payload,
					error: payload.filled ? '' : 'Order is not filled',
				}
			};
		case ORDERBOOK_CONSTANTS.QUICK_TRADE_REJECTED:
			return {
				...state,
				quickTrade: {
					...INITIAL_QUICK_TRADE,
					fetching: false,
					error: payload,
				}
			};

		case ORDERBOOK_CONSTANTS.TRADE_QUOTE_REQUEST_PENDING:
			return {
				...state,
				quoteData: {
					...INITIAL_QUOTE,
					fetching: true,
					data: {
						...INITIAL_QUOTE.data,
						price: state.quoteData.data.price,
					},
				}
			};
		case ORDERBOOK_CONSTANTS.TRADE_QUOTE_REQUEST_FULFILLED:
			return {
				...state,
				quoteData: {
					...INITIAL_QUOTE,
					fetching: false,
					data: payload.data,
					token: payload.token,
				}
			};
		case ORDERBOOK_CONSTANTS.TRADE_QUOTE_REQUEST_REJECTED:
			return {
				...state,
				quoteData: {
					...INITIAL_QUOTE,
					fetching: false,
					...payload,
					data: {
						...INITIAL_QUOTE.data,
						...payload.data,
					},
					error: payload.message,
				}
			};

		case ORDERBOOK_CONSTANTS.TRADE_QUOTE_PERFORM_PENDING:
			return {
				...state,
				quoteData: {
					...state.quoteData,
					order: {
						fetching: true,
						completed: false,
						error: '',
						data: {},
					}
				}
			};
		case ORDERBOOK_CONSTANTS.TRADE_QUOTE_PERFORM_FULFILLED:
			return {
				...state,
				quoteData: {
					...state.quoteData,
					order: {
						fetching: false,
						completed: true,
						data: payload,
					}
				}
			};
		case ORDERBOOK_CONSTANTS.TRADE_QUOTE_PERFORM_REJECTED:
			return {
				...state,
				quoteData: {
					...state.quoteData,
					order: {
						fetching: false,
						completed: true,
						error: payload,
					}
				}
			};

		case 'LOGOUT':
			return INITIAL_STATE;
		default:
			return state;
	}
}
