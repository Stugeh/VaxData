// import VaccineOrder from '../models/order';
// import Vaccination from '../models/vaccination';
import { /* Vaccination as Vax, */ VaccineOrder as Order } from '../types'
import fs from 'fs';

require('express-async-errors');

const orderFiles = [
	'/../data/Antiqua.source',
	'/../data/SolarBuddhica.source',
	'/../data/Zerpfy.source',
];

const allOrders: Order[] = []

orderFiles.forEach((filename) => {
	fs.readFile(__dirname + filename, 'utf-8', (error, data) => {
		console.log('formatting:', filename)
		if (error) { throw error; }

		// format the data to a json string
		const orderObjects: Order[] = data
			.slice(0, -1)
			.split('\n')
			.map((line) => {
				try {
					const rawObject = JSON.parse(line)
					return {
						orderId: rawObject.id,
						healthCareDistrict: rawObject.healthCareDistrict,
						orderNumber: rawObject.orderNumber,
						responsiblePerson: rawObject.responsiblePerson,
						injections: rawObject.injections,
						arrived: rawObject.arrived,
						vaccine: rawObject.vaccine,
					}
				} catch (e) {
					throw new Error(e)
				}
			})
		allOrders.push(orderObjects[0])
		console.log(...orderObjects)
	});
	console.log(allOrders)
});
//
// const populateOrders = () => {

// };

// const populateVaccinations = () => {

// };