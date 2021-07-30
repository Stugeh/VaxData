import {OrganizedOrders} from '../types';

const validateData = (data: unknown): OrganizedOrders => {
    // TODO write type guards for all fields
    return data as OrganizedOrders;
};

export default validateData;