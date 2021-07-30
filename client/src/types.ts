

export type HealthCareDistrict = 'HYKS' | 'KYS' | 'OYS' | 'TAYS' | 'TYKS';

export enum VaccineName {
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
    vaccine: VaccineName
};

export type OrganizedOrders = {
    [key in VaccineName]: Order[]
};
