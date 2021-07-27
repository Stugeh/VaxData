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
const stringToObjectArray = (data: string) => {
	const lineArray: string[] = data
		.slice(0, -1) // remove trailing new line from EoF
		.split('\n')  // make an array of lines

	const firstObject = JSON.parse(lineArray[0])
	if (!firstObject.orderNumber || !firstObject.sourceBottle) {
		throw new Error(`invalid object:\n${firstObject}`)
	}

	if (firstObject.orderNumber) {
		return lineArray.map((line) => {
			// turn line into an object
			const rawObject = JSON.parse(line)
			return parseOrder(rawObject)
		})
	}

	return lineArray.map((line) => {
		// turn line into an object
		const rawObject = JSON.parse(line)
		return parseVaccination(rawObject)
	})
}

const getDataFromFiles = (sources: string[]) => {
	const dataArray: Vax[] | Order[] = []
	sources.forEach((source) => {
		fs.readFile(__dirname + source, 'utf-8', (error, data) => {
			console.log('formatting:', source);
			if (error) throw error
			dataArray.push(stringToObjectArray(data));
		});
	});
	return dataArray
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

	const orders: Order[] = getDataFromFiles(orderFiles) as Order[]
	const vaccinations: Vax[] = getDataFromFiles(vaccinationFiles) as Vax[]
	console.log(orders)
}

migration();