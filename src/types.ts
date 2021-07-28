export enum Gender {
    'Male' = 'male',
    'Female' = 'female',
    'Other' = 'nonbinary'
}

export enum VaccineName {
    SOLAR = 'SolarBuddhica',
    ZERPFY = 'Zerpfy',
    ANTIQUA = 'Antiqua'
}

export type HealthCareDistrict = 'HYKS' | 'KYS' | 'OYS' | 'TAYS' | 'TYKS';

export type VaccineOrder = {
    _id?: string;
    __v?: string;
    orderId: string,
    healthCareDistrict: HealthCareDistrict,
    orderNumber: number,
    responsiblePerson: string,
    injections: number,
    arrived: string,
    vaccine: VaccineName
};

export type Vaccination = {
    _id?: string;
    __v?: string;
    vaccinationId: string;
    gender: Gender;
    sourceBottle: string;
    injected: string;
};

export type OrganizedOrders = {
    [key in VaccineName]: VaccineOrder[]
}

export type OrderResponse = {
    orders: VaccineOrder[][],


}
