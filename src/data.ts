import { PartyColor } from './components/Parties';
import ExpenditureData from './expenditure_data.json';
import MinistersData from './ministers.json';
import PartyDistributionData from './ministers_by_party.json';

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

export const expenditures: Pick<
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
  | 'member'
  | 'designated_traveller'
  | 'total'
>[] = ExpenditureData;

export const ministers: Minister[] = MinistersData;

export const partyDistribution: PartyData[] = PartyDistributionData;

export const uniqueMinisters = Array.from(
  new Set(ministers.map((m) => m.name)),
);

export const getPartyColorByName = (name: string | null) => {
  return PartyColor(ministers.find((m) => m.name === name)?.party);
};

export const getConstituenciesByName = (name: string | null) => {
  return ministers.filter((m) => m.name === name);
};
