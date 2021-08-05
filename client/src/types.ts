export type HealthCareDistrict = 'HYKS' | 'KYS' | 'OYS' | 'TAYS' | 'TYKS';

export enum Gender {
    'Male' = 'male',
    'Female' = 'female',
    'Other' = 'nonbinary'
}

export enum ProducerName {
    SolarBuddhica = 'SolarBuddhica',
    Zerpfy = 'Zerpfy',
    Antiqua = 'Antiqua'
}

export type Vaccination = {
    vaccinationId: string;
    gender: Gender;
    sourceBottle: string;
    injected: Date;
}

export type Order = {
    orderId: string,
    healthCareDistrict: HealthCareDistrict,
    orderNumber: number,
    responsiblePerson: string,
    injections: number,
    arrived: Date,
    vaccine: ProducerName
    vaccinations: Vaccination[]
};

export type Orders = {
    [key in ProducerName]: Order[]
};

export type UnknownOrders = {
    [key in ProducerName]: unknown[]
}

export type Counts = {
    [key in ProducerName]: {
        orders: number
        vaccinations: number,
        doses: number,
        expired: number
    };
}

export type DateAndOrders = {
    orders: Orders,
    date: Date
}

export type BarChartObject = {
    [key: string]: string | number
}

export type BarChartData = BarChartObject[]
