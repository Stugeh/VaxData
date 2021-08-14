import {
  Vaccination,
  Gender,
  Order,
  ProducerName,
  Orders,
  Counts,
  DataOutput,
} from './types';

export const spreadOrders = (orders:Orders) => [
  ...orders.Antiqua,
  ...orders.SolarBuddhica,
  ...orders.Zerpfy,
];

export const testVax:Vaccination = {
  vaccinationId: 'bf59a0fc-83f0-4940-ad10-e2753c9c0442',
  gender: Gender.Male,
  sourceBottle: '8be72739-96d0-4723-b495-6d9ffe1fdce9',
  injected: new Date('2021-02-21T19:12:08.685533Z'),

};

export const testOrder:Order = {
  orderId: '8be72739-96d0-4723-b495-6d9ffe1fdce9',
  healthCareDistrict: 'HYKS',
  orderNumber: 3095,
  responsiblePerson: 'Valentin Artola',
  vaccine: ProducerName.Zerpfy,
  injections: 5,
  arrived: new Date('2021-02-21T01:45:09.685533Z'),
  vaccinations: [
    testVax,
  ],
};

export const testOrders:Orders = {
  SolarBuddhica: [
    {
      orderId: '08e53940-8fa4-4d89-aff3-8d99bcae4a36',
      healthCareDistrict: 'HYKS',
      orderNumber: 2042,
      responsiblePerson: 'Iivari Wuorenheimo',
      injections: 6,
      arrived: new Date('2021-02-06T06:59:44.674Z'),
      vaccine: ProducerName.SolarBuddhica,
      vaccinations: [
        {
          vaccinationId: 'b74edafd-32b9-4714-bca8-cc26060f4928',
          gender: Gender.Other,
          sourceBottle: '08e53940-8fa4-4d89-aff3-8d99bcae4a36',
          injected: new Date('2021-02-19T05:46:46.674Z'),
        },
      ],
    },
    {
      orderId: '4ca6e82f-dd86-4daa-b305-9151b23da39e',
      healthCareDistrict: 'HYKS',
      orderNumber: 3967,
      responsiblePerson: 'Minja Koulumies',
      injections: 6,
      arrived: new Date('2021-03-02T00:13:11.694Z'),
      vaccine: ProducerName.SolarBuddhica,
      vaccinations: [
        {
          vaccinationId: '612268fc-be8e-4b57-b161-43a9120da384',
          gender: Gender.Female,
          sourceBottle: '4ca6e82f-dd86-4daa-b305-9151b23da39e',
          injected: new Date('2021-03-18T20:50:46.694Z'),
        },
        {
          vaccinationId: '6ec7b033-d118-42c1-a610-160e0790e01d',
          gender: Gender.Other,
          sourceBottle: '4ca6e82f-dd86-4daa-b305-9151b23da39e',
          injected: new Date('2021-03-08T14:54:55.694Z'),
        },
      ],
    },
    {
      orderId: 'ac4546cd-c619-4863-bb52-f502df5d9148',
      healthCareDistrict: 'HYKS',
      orderNumber: 2324,
      responsiblePerson: 'Auvo Kalima',
      injections: 6,
      arrived: new Date('2021-04-12T04:06:11.677Z'),
      vaccine: ProducerName.SolarBuddhica,
      vaccinations: [
        {
          vaccinationId: '2a1f4e84-cf2b-4c70-adf1-624b960dce67',
          gender: Gender.Other,
          sourceBottle: 'ac4546cd-c619-4863-bb52-f502df5d9148',
          injected: new Date('2021-04-12T08:23:45.163Z'),
        },
      ],
    },
  ],

  Antiqua: [
    {
      orderId: '271375e7-9af7-4a57-8777-a4ea8d93251b',
      healthCareDistrict: 'TAYS',
      orderNumber: 4479,
      responsiblePerson: 'Julia Alhava',
      injections: 4,
      arrived: new Date('2021-02-11T10:39:59.699Z'),
      vaccine: ProducerName.Antiqua,
      vaccinations: [
        {
          vaccinationId: 'f82bdccf-95f7- 4645-a0da-9a563ec4efd5',
          gender: Gender.Male,
          sourceBottle: '271375e7-9af7-4a57-8777-a4ea8d93251b',
          injected: new Date('2021-03-12T12:19:45.699Z'),
        }],
    },
    {
      orderId: '96b71e92-d833-4838-bc96-13d4ca8dd7de',
      healthCareDistrict: 'HYKS',
      orderNumber: 2373,
      responsiblePerson: 'Juha Kuusi',
      injections: 4,
      arrived: new Date('2021-01-24T21:36:19.677Z'),
      vaccine: ProducerName.Antiqua,
      vaccinations: [
        {
          vaccinationId: '0f19b14b- 322b-470d-8986-4e2501fea2ce',
          gender: Gender.Male,
          sourceBottle: '96b71e92-d833-4838-bc96-13d4ca8dd7de',
          injected: new Date('2021-02-23T02:56:16.677Z'),
        },
      ],
    },
    {
      orderId: '04dfda8f-b729-41de-8306-8176f1ef753e',
      healthCareDistrict: 'TYKS',
      orderNumber: 4585,
      responsiblePerson: 'Melissa Airila',
      injections: 4,
      arrived: new Date('2021-01-07T18:06:43.700Z'),
      vaccine: ProducerName.Antiqua,
      vaccinations: [{
        vaccinationId: 'afa04a44-6013-4f3a- b12e-296c4a8737eb',
        gender: Gender.Female,
        sourceBottle: '04dfda8f-b729-41de-8306-8176f1ef753e',
        injected: new Date('2021-01-23T14:34:28.700Z'),
      }],
    },
  ],

  Zerpfy: [
    {
      orderId: '010c8d06-46a3-4fd2-9aa0-6b7bb7045a68',
      healthCareDistrict: 'KYS',
      orderNumber: 844,
      responsiblePerson: 'Nyyrikki Laitakari',
      injections: 5,
      arrived: new Date('2021-03-11T19:27:23.661Z'),
      vaccine: ProducerName.Zerpfy,
      vaccinations: [
        {
          vaccinationId: 'd5f8d569-05f0- 494e-a6ae-944c4ac24dee',
          gender: Gender.Female,
          sourceBottle: '010c8d06-46a3-4fd2-9aa0-6b7bb7045a68',
          injected: new Date('2021-03-22T22:40:46.661Z'),
        },
      ],
    },
    {
      orderId: '27912c2c-f10a-4ae4-bef3-8cef4d1746fe',
      healthCareDistrict: 'TAYS',
      orderNumber: 2731,
      responsiblePerson: 'Elvi Kurki-Suonio',
      injections: 5,
      arrived: new Date('2021-03-14T06:21:57.681Z'),
      vaccine: ProducerName.Zerpfy,
      vaccinations: [{
        vaccinationId: '7f2f3d59- e1ed-4593-adde-203bd3d741fa',
        gender: Gender.Female,
        sourceBottle: '27912c2c-f10a-4ae4-bef3-8cef4d1746fe',
        injected: new Date('2021-04-11T08:57:38.739Z'),
      }],
    },
    {
      orderId: '66ddcca5-504f-4510-87aa-47a0b17669a5',
      healthCareDistrict: 'KYS',
      orderNumber: 3849,
      responsiblePerson: 'Ilppo Liro',
      injections: 5,
      arrived: new Date('2021-03-14T17:51:09.692Z'),
      vaccine: ProducerName.Zerpfy,
      vaccinations: [],
    },
  ],
};

export const rawOrders = {
  SolarBuddhica: [
    {
      orderId: '08e53940-8fa4-4d89-aff3-8d99bcae4a36',
      healthCareDistrict: 'HYKS',
      orderNumber: 2042,
      responsiblePerson: 'Iivari Wuorenheimo',
      injections: 6,
      arrived: '2021-02-06T06:59:44.674Z',
      vaccine: 'SolarBuddhica',
      vaccinations: [
        {
          vaccinationId: 'b74edafd-32b9-4714-bca8-cc26060f4928',
          gender: 'nonbinary',
          sourceBottle: '08e53940-8fa4-4d89-aff3-8d99bcae4a36',
          injected: '2021-02-19T05:46:46.674Z',
        },
      ],
    },
    {
      orderId: '4ca6e82f-dd86-4daa-b305-9151b23da39e',
      healthCareDistrict: 'HYKS',
      orderNumber: 3967,
      responsiblePerson: 'Minja Koulumies',
      injections: 6,
      arrived: '2021-03-02T00:13:11.694Z',
      vaccine: 'SolarBuddhica',
      vaccinations: [
        {
          vaccinationId: '612268fc-be8e-4b57-b161-43a9120da384',
          gender: 'female',
          sourceBottle: '4ca6e82f-dd86-4daa-b305-9151b23da39e',
          injected: '2021-03-18T20:50:46.694Z',
        },
        {
          vaccinationId: '6ec7b033-d118-42c1-a610-160e0790e01d',
          gender: 'nonbinary',
          sourceBottle: '4ca6e82f-dd86-4daa-b305-9151b23da39e',
          injected: '2021-03-08T14:54:55.694Z',
        },
      ],
    },
    {
      orderId: 'ac4546cd-c619-4863-bb52-f502df5d9148',
      healthCareDistrict: 'HYKS',
      orderNumber: 2324,
      responsiblePerson: 'Auvo Kalima',
      injections: 6,
      arrived: '2021-04-12T04:06:11.677Z',
      vaccine: 'SolarBuddhica',
      vaccinations: [
        {
          vaccinationId: '2a1f4e84-cf2b-4c70-adf1-624b960dce67',
          gender: 'nonbinary',
          sourceBottle: 'ac4546cd-c619-4863-bb52-f502df5d9148',
          injected: '2021-04-12T08:23:45.163Z',
        },
      ],
    },
  ],

  Antiqua: [
    {
      orderId: '271375e7-9af7-4a57-8777-a4ea8d93251b',
      healthCareDistrict: 'TAYS',
      orderNumber: 4479,
      responsiblePerson: 'Julia Alhava',
      injections: 4,
      arrived: '2021-02-11T10:39:59.699Z',
      vaccine: 'Antiqua',
      vaccinations: [
        {
          vaccinationId: 'f82bdccf-95f7- 4645-a0da-9a563ec4efd5',
          gender: 'male',
          sourceBottle: '271375e7-9af7-4a57-8777-a4ea8d93251b',
          injected: '2021-03-12T12:19:45.699Z',
        }],
    },
    {
      orderId: '96b71e92-d833-4838-bc96-13d4ca8dd7de',
      healthCareDistrict: 'HYKS',
      orderNumber: 2373,
      responsiblePerson: 'Juha Kuusi',
      injections: 4,
      arrived: '2021-01-24T21:36:19.677Z',
      vaccine: 'Antiqua',
      vaccinations: [
        {
          vaccinationId: '0f19b14b- 322b-470d-8986-4e2501fea2ce',
          gender: 'male',
          sourceBottle: '96b71e92-d833-4838-bc96-13d4ca8dd7de',
          injected: '2021-02-23T02:56:16.677Z',
        },
      ],
    },
    {
      orderId: '04dfda8f-b729-41de-8306-8176f1ef753e',
      healthCareDistrict: 'TYKS',
      orderNumber: 4585,
      responsiblePerson: 'Melissa Airila',
      injections: 4,
      arrived: '2021-01-07T18:06:43.700Z',
      vaccine: 'Antiqua',
      vaccinations: [{
        vaccinationId: 'afa04a44-6013-4f3a- b12e-296c4a8737eb',
        gender: 'female',
        sourceBottle: '04dfda8f-b729-41de-8306-8176f1ef753e',
        injected: '2021-01-23T14:34:28.700Z',
      }],
    },
  ],

  Zerpfy: [
    {
      orderId: '010c8d06-46a3-4fd2-9aa0-6b7bb7045a68',
      healthCareDistrict: 'KYS',
      orderNumber: 844,
      responsiblePerson: 'Nyyrikki Laitakari',
      injections: 5,
      arrived: '2021-03-11T19:27:23.661Z',
      vaccine: 'Zerpfy',
      vaccinations: [
        {
          vaccinationId: 'd5f8d569-05f0- 494e-a6ae-944c4ac24dee',
          gender: 'female',
          sourceBottle: '010c8d06-46a3-4fd2-9aa0-6b7bb7045a68',
          injected: '2021-03-22T22:40:46.661Z',
        },
      ],
    },
    {
      orderId: '27912c2c-f10a-4ae4-bef3-8cef4d1746fe',
      healthCareDistrict: 'TAYS',
      orderNumber: 2731,
      responsiblePerson: 'Elvi Kurki-Suonio',
      injections: 5,
      arrived: '2021-03-14T06:21:57.681Z',
      vaccine: 'Zerpfy',
      vaccinations: [{
        vaccinationId: '7f2f3d59- e1ed-4593-adde-203bd3d741fa',
        gender: 'female',
        sourceBottle: '27912c2c-f10a-4ae4-bef3-8cef4d1746fe',
        injected: '2021-04-11T08:57:38.739Z',
      }],
    },
    {
      orderId: '66ddcca5-504f-4510-87aa-47a0b17669a5',
      healthCareDistrict: 'KYS',
      orderNumber: 3849,
      responsiblePerson: 'Ilppo Liro',
      injections: 5,
      arrived: '2021-03-14T17:51:09.692Z',
      vaccine: 'Zerpfy',
      vaccinations: [],
    },
  ],
};

export const testCounts:Counts = {
  Antiqua: {
    arrivedOrders: 10,
    arrivedDoses: 20,
    orders: 30,
    vaccinations: 56,
    doses: 13,
    expiredDoses: 145,
    expiredOrders: 33,
    consumedOrders: 12,
    expiringDoses: 3,
  },
  SolarBuddhica: {
    arrivedOrders: 40,
    arrivedDoses: 23,
    orders: 34,
    vaccinations: 6,
    doses: 1,
    expiredDoses: 14,
    expiredOrders: 3,
    consumedOrders: 2,
    expiringDoses: 35,
  },
  Zerpfy: {
    arrivedOrders: 1012,
    arrivedDoses: 2012,
    orders: 302,
    vaccinations: 256,
    doses: 134,
    expiredDoses: 1645,
    expiredOrders: 334,
    consumedOrders: 124,
    expiringDoses: 32,
  },
};

export const testDataOutput:DataOutput = {
  cumulativeCounts: testCounts,
  countsOnDate: testCounts,
  ordersBeforeDate: testOrders,
  ordersOnDate: {
    SolarBuddhica: [
      {
        orderId: '08e53940-8fa4-4d89-aff3-8d99bcae4a36',
        healthCareDistrict: 'HYKS',
        orderNumber: 2042,
        responsiblePerson: 'Iivari Wuorenheimo',
        injections: 6,
        arrived: new Date('2021-02-06T06:59:44.674Z'),
        vaccine: ProducerName.SolarBuddhica,
        vaccinations: [
          {
            vaccinationId: 'b74edafd-32b9-4714-bca8-cc26060f4928',
            gender: Gender.Other,
            sourceBottle: '08e53940-8fa4-4d89-aff3-8d99bcae4a36',
            injected: new Date('2021-02-19T05:46:46.674Z'),
          },
        ],
      },
    ],
    Antiqua: [],
    Zerpfy: [],
  },
};
