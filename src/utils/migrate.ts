// import VaccineOrder from '../models/order';
// import Vaccination from '../models/vaccination';
import { Vaccination as Vax, VaccineOrder as Order } from '../types'
import fs from 'fs';

require('express-async-errors');

interface rawOrder extends Order {
	id: string
}

const parseOrder = (rawObject: rawOrder): Order => (
	{
		orderId: rawObject.id,
		healthCareDistrict: rawObject.healthCareDistrict,
		orderNumber: rawObject.orderNumber,
		responsiblePerson: rawObject.responsiblePerson,
		injections: rawObject.injections,
		arrived: rawObject.arrived,
		vaccine: rawObject.vaccine,
	}
)


interface rawVax extends Vax {
	id: string
}

const parseVaccination = (rawObject: rawVax): Vax => (
	{
		vaccinationId: rawObject.id,
		gender: rawObject.gender,
		sourceBottle: rawObject.sourceBottle,
		injected: rawObject.injected,
	}
)

/**
 * returns an array of json objects
 * @param data  -String where each new line is a JSON object
 *  */
const stringToObjectArray = (data: string): Order[] | Vax[] => (
	data
		.slice(0, -1) // remove trailing new line from EoF
		.split('\n')  // make an array of lines
		.map((line) => {
			// turn line into an object
			const rawObject = JSON.parse(line)
			if (rawObject.orderNumber) {
				return parseOrder(rawObject)
			}
			if (rawObject.gender && rawObject.sourceBottle) {
				return parseVaccination(rawObject)
			}
			throw new Error('Invalid object: \n' + line)
		})
)

const getDataFromFiles = (sources: string[]): Order[] | Vax[] => {
	return sources.map((source): (Order | Vax) => {
		let dataString = ''
		fs.readFile(__dirname + source, 'utf-8', (error, data) => {
			console.log('formatting:', source);
			if (error) throw error
			dataString = data;
		});
		return stringToObjectArray(dataString);
	});
}

const migration = () => {
	const orderFiles = [
		'/../data/Antiqua.source',
		'/../data/SolarBuddhica.source',
		'/../data/Zerpfy.source',
	];
	const vaccinationFiles = [
		'/../data/vaccinations.source'
	]

	const orders: Order[] = getDataFromFiles(orderFiles)
	const vaccinations: Vax[] = getDataFromFiles(vaccinationFiles)
	console.log(orders)
}

migration();