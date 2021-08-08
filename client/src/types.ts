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
        arrivedOrders: number,
        arrivedDoses: number,
        orders: number,
        vaccinations: number,
        doses: number,
        expiredDoses: number,
        expiredOrders: number,
        consumedOrders: number,
        expiringDoses: number
    };
}

export type DateAndOrders = {
    orders: Orders,
    date: Date
}

export type ChartObject = {
    [key: string]: string | number
}

export type LooseObjectObject = {
    [key: string]: Record<string, unknown>
}

export type ChartData = ChartObject[]

export type DataOutput = {
    ordersBeforeDate: Orders,
    cumulativeCounts: Counts,
    ordersOnDate: Orders,
    countsOnDate: Counts,
  }
