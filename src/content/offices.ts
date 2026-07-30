import { anel, fadi } from './team';

export interface FooterOffice {
  id: 'stockholm' | 'gothenburg';
  name: string;
  addressLines: readonly [string, string];
  email: string;
  phone: string;
  phoneHref: string;
}

export const COMPANY_EMAIL = 'info@reqcon.se';

export const footerOffices: readonly FooterOffice[] = [
  {
    id: 'stockholm',
    name: 'Stockholm',
    addressLines: ['Tullgårdsgatan 10', '116 68 Stockholm'],
    email: COMPANY_EMAIL,
    phone: fadi.phone,
    phoneHref: 'tel:+46709395111',
  },
  {
    id: 'gothenburg',
    name: 'Göteborg',
    addressLines: ['Gustaf Dalénsgatan 30', '417 24 Göteborg'],
    email: COMPANY_EMAIL,
    phone: anel.phone,
    phoneHref: 'tel:+46708531921',
  },
];
