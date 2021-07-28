import VaccineOrder from '../models/order';
import Vaccination from '../models/vaccination';
import { Vaccination as Vax, VaccineOrder as Order } from '../types'
import fs from 'fs';
import mongoose from 'mongoose';
import { MONGOURL } from '../config';

require('express-async-errors');

interface rawOrder extends Order {
	id: string
}
interface rawVax extends Vax {
	'vaccination-id': string,
	vaccinationDate: string
}

type AllData = {
	orderObjects: Order[]
	vaccinationObjects: Vax[]
}

/**
 * 
 * @param rawObject - Uncleaned up order object
 * @returns - Cleaned order Object
 */
export const parseOrder = (rawObject: rawOrder): Order => (
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



/**
 * 
 * @param rawObject - Uncleaned up vaccination object
 * @returns - Cleaned Vaccination Object
 */
export const parseVaccination = (rawObject: rawVax): Vax => (
	{
		vaccinationId: rawObject['vaccination-id'],
		gender: rawObject.gender,
		sourceBottle: rawObject.sourceBottle,
		injected: rawObject.vaccinationDate,
	}
)


/**
 * 
 * @param keys - An array of keys you expect an object to have
 * @param object - The Object
 * @returns - Boolean
 */
export const hasKeys = (keys: string[], object: { [key: string]: any }) => (
	keys.every(key => object.hasOwnProperty(key))
)

/**
 * 
 * @param lines - An array of lines that are convertible to orders
 * @returns - List of orders
 */
export const linesToOrders = (lines: string[]) => {
	try {
		const keys = [
			'id', 'healthCareDistrict', 'orderNumber',
			'responsiblePerson', 'injections', 'arrived', 'vaccine'
		]
		const orders = lines.map(line => {
			const order = JSON.parse(line)
			if (!hasKeys(keys, order)) throw new Error(`invalid order: ${line}`)
			return parseOrder(order)
		})
		return orders
	} catch (err) {
		throw new SyntaxError()
	}
}

/**
 * 
 * @param lines - An array of lines that are convertible to vaccinations
 * @returns - List of vaccinations
 */
export const linesToVaccinations = (lines: string[]) => {
	try {
		const keys = ['vaccination-id', 'gender', 'sourceBottle', 'vaccinationDate']
		const vaccinations = lines.map(line => {
			const vaccination = JSON.parse(line)
			if (!hasKeys(keys, vaccination)) throw new Error(`invalid vaccination: ${line}`)
			return parseVaccination(vaccination)
		})
		return vaccinations
	} catch (err) {
		throw new SyntaxError()
	}
}

/**
 * 
 * @param sources - an array of strings with the relative paths to data files
 * @returns the compiled data as an array of strings separated by line breaks
 */
export const getDataFromFiles = (sources: string[]) => {
	const allData = sources.flatMap((source) => {
		const data = fs.readFileSync(
			__dirname + source,
			{ encoding: 'utf-8', flag: 'r' },
		)
		// remove trailing new line from EoF and make an array of lines
		return data.slice(0, -1).split('\n')
	})
	return allData
};


const initDb = async ({ orderObjects, vaccinationObjects }: AllData) => {
	mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
		.catch((err) => console.log('err', err))

	await VaccineOrder.deleteMany({})
	await Vaccination.deleteMany({})
	await VaccineOrder.insertMany(orderObjects)
	await Vaccination.insertMany(vaccinationObjects)

	mongoose.connection.close();
}

export const migration = () => {
	const orderFiles = [
		'/../data/Antiqua.source',
		'/../data/SolarBuddhica.source',
		'/../data/Zerpfy.source',
	];
	const vaccinationFiles = [
		'/../data/vaccinations.source'
	]

	const orderData = getDataFromFiles(orderFiles)
	const vaccinationData = getDataFromFiles(vaccinationFiles)

	const orderObjects = linesToOrders(orderData)
	const vaccinationObjects = linesToVaccinations(vaccinationData)

	initDb({ orderObjects, vaccinationObjects })
}

migration();