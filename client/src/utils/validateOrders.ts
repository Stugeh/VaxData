import { OrganizedOrders } from '../types';

// TODO write type guards for all fields
const validateData = (data: unknown): OrganizedOrders => data as OrganizedOrders;

export default validateData;
