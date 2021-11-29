import ExpenditureData from './expenditure_data.json';
import MinistersData from './ministers.json';
import PartyDistributionData from './ministers_by_party.json';
import TotalPartySpendingByYear from './spending_by_party_year.json';

export interface ConstituencyGeodata {
  name: string;
  distance: number;
}

export interface TotalPartySpending {
  year: number;
  total: number;
  party: string;
  _service_contracts: number;
  _employees_salaries: number;
  _travel: number;
  _hospitality: number;
}

export interface PartyData {
  parliament: number;
  party: string;
  name: number;
}

export interface Expenditure {
  year: number;
  quarter: number;
  name: string;
  constituency_name: string;
  constituency_size: number;
  number_of_electors: number;
  _employees_salaries: number;
  _service_contracts: number;
  _travel: number;
  member: number;
  designated_traveller: number;
  dependants: number;
  employees: number;
  member_accommodation_expenses: number;
  member_per_diem_expenses: number;
  member_secondary_residence_expenses: number;
  _hospitality: number;
  _gifts: number;
  _advertising: number;
  _printing?: null;
  householders: number;
  ten_percenters: number;
  other_printing_related_expenses: number;
  _offices?: null;
  constituency_office_leases_insurance_and_utilities: number;
  furniture_furnishing_and_equipment_purchases: number;
  equipment_rentals: number;
  informatics_and_telecommunication_equipment_purchases: number;
  telecommunication_services: number;
  repairs_and_maintenance: number;
  postage_and_courier_services: number;
  materials_and_supplies: number;
  training: number;
  total: number;
  distance: number;
  party: string | null;
}

export interface Minister {
  title?: string | null;
  first_name: string;
  last_name: string;
  constituency: string;
  province: string;
  party?: string | null;
  start_date: string;
  end_date?: string | null;
  parliament: number;
  name: string;
}

// years span from 2012 to 2021 but truncate for performance during development
export const years = [2021, 2020, 2019, 2018, 2017, 2016];

export type IExpenditure = Pick<
  Expenditure,
  | 'name'
  | 'year'
  | 'quarter'
  | 'constituency_name'
  | 'constituency_size'
  | 'number_of_electors'
  | '_employees_salaries'
  | '_service_contracts'
  | '_travel'
  | '_hospitality'
  | 'member'
  | 'designated_traveller'
  | 'total'
  | 'distance'
  | 'party'
>;

export const expenditures: IExpenditure[] = ExpenditureData;

export const ministers: Minister[] = MinistersData;

export const partyDistribution: PartyData[] = PartyDistributionData;

export const totalPartySpending: TotalPartySpending[] =
  TotalPartySpendingByYear;

export const uniqueMinisters = Array.from(
  new Set(ministers.map((m) => m.name)),
);

export const getPartyColorByName = (name: string | null) => {
  return PartyColor(ministers.find((m) => m.name === name)?.party);
};

export const getConstituenciesByName = (name: string | null) => {
  return ministers.filter((m) => m.name === name);
};

export const cmp = (a: number, b: number) => +(a > b) - +(a < b);

export const partyColors: { [key: string]: string } = {
  'Canadian Alliance': '#00a8ff',
  Liberal: '#d71b1e',
  'Bloc Québécois': '#00d9ff',
  NDP: '#ff6600',
  PC: '#f2f2f2',
  Reform: '',
  Independent: '#888888',
  'Ind. CA': '',
  Conservative: '#0f2d52',
  'Independent Bloc Québécois': '#000000',
  'Green Party': '#3d9b35',
  'Indepedent Conservative': '#0000ff',
  'Conversative Indepedent': '#0000ff',
  "People's Party": '#ae00ff',
  'Co-operative Commonwealth Federation': '#ff0000',
};

type ExpenditureType =
  | '_employees_salaries'
  | '_service_contracts'
  | '_travel'
  | '_hospitality';

export const expenditureCategories: {
  title: string;
  color: string;
  key: ExpenditureType;
}[] = [
  {
    title: 'Salaries',
    color: '#f03a47',
    key: '_employees_salaries',
  },
  {
    title: 'Travel',
    color: '#af5b5b',
    key: '_travel',
  },
  {
    title: 'Hospitality',
    color: '#276fbf',
    key: '_hospitality',
  },
  {
    title: 'Contracts',
    color: '#183059',
    key: '_service_contracts',
  },
];

export const PartyColor = (party?: string | null): string => {
  return party ? partyColors[party] ?? 'ffffff' : '#ffffff';
};

export const partyColorsArray = Object.keys(partyColors)
  .sort((a, b) => cmp(a.length, b.length))
  .map((v) => partyColors[v]);

export const partyColorMappings = {
  getIndex: (party: string) => partyColorsArray.indexOf(partyColors[party]),
  range: partyColorsArray,
  domain: partyColorsArray.map((_v, i) => i),
};
