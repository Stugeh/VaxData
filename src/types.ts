export enum Gender {
    'Male' = 'male',
    'Female' = 'female',
    'Other' = 'nonbinary'
}

export type VaccineName = 'SolarBuddhica' | 'Zerpfy' | 'Antiqua';

export type HealthCareDistrict = 'HYKS' | 'KYS' | 'OYS' | 'TAYS' | 'TYKS';

export type VaccineOrder = {
    id: string,
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
