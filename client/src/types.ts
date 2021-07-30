export type HealthCareDistrict = 'HYKS' | 'KYS' | 'OYS' | 'TAYS' | 'TYKS';

export enum ProducerName {
    Solar = 'SolarBuddhica',
    Zerpfy = 'Zerpfy',
    Antiqua = 'Antiqua'
}

export type Order = {
    orderId: string,
    healthCareDistrict: HealthCareDistrict,
    orderNumber: number,
    responsiblePerson: string,
    injections: number,
    arrived: string,
    vaccine: ProducerName
};

export type OrganizedOrders = {
    [key in ProducerName]: Order[]
};
