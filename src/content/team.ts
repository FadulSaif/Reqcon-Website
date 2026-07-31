export interface TeamMember {
  name: string;
  titleKey: 'team.fadi_title' | 'team.anel_title';
  bioKey: 'team.fadi_desc' | 'team.anel_desc';
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  mapUrl: string;
  image: string;
}

type TeamProfileTitleKey =
  | TeamMember['titleKey']
  | 'team.fadi_team_title'
  | 'team.anton_title';

type TeamProfileBioKey =
  | TeamMember['bioKey']
  | 'team.anton_desc';

interface TeamProfileImage {
  src: string;
  alt: string;
}

export interface TeamProfileMember {
  id: string;
  name: string;
  titleKey: TeamProfileTitleKey;
  bioKey: TeamProfileBioKey;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  mapUrl: string;
  image: TeamProfileImage;
}

export const fadi: TeamMember = {
  name: 'Fadi Rabah',
  titleKey: 'team.fadi_title',
  bioKey: 'team.fadi_desc',
  phone: '070-939 51 11',
  phoneHref: 'tel:+46709395111',
  email: 'fadi.rabah@reqcon.se',
  address: 'Tullgårdsgatan 10, 116 68 Stockholm',
  mapUrl: 'https://maps.google.com/?q=Tullgårdsgatan+10,+Stockholm',
  image: '/images/team/fadi_rabah.jpg',
};

export const anel: TeamMember = {
  name: 'Anel Pasic',
  titleKey: 'team.anel_title',
  bioKey: 'team.anel_desc',
  phone: '070-853 19 21',
  phoneHref: 'tel:+46708531921',
  email: 'anel.pasic@reqcon.se',
  address: 'Gustaf Dalénsgatan 30 (Hisinge Hus), 417 24 Göteborg',
  mapUrl: 'https://maps.google.com/?q=Gustaf+Dalénsgatan+30,+Göteborg',
  image: '/images/team/anel_pasic.jpg',
};

// Shared regional-manager source used by Contact, About, and the footer.
// Keep this order unchanged because those existing views pair Fadi with
// Stockholm and Anel with Gothenburg.
export const teamMembers: TeamMember[] = [fadi, anel];

// Team-page order is intentional: Anel, Fadi, Anton.
export const teamPageMembers: TeamProfileMember[] = [
  {
    ...anel,
    id: 'anel',
    image: {
      src: anel.image,
      alt: anel.name,
    },
  },
  {
    ...fadi,
    id: 'fadi',
    titleKey: 'team.fadi_team_title',
    image: {
      src: fadi.image,
      alt: fadi.name,
    },
  },
  {
    id: 'anton',
    name: 'Anton af Bjur',
    titleKey: 'team.anton_title',
    bioKey: 'team.anton_desc',
    phone: '073-302 30 35',
    phoneHref: 'tel:+46733023035',
    email: 'Anton@reqcon.se',
    address: fadi.address,
    mapUrl: fadi.mapUrl,
    image: {
      src: '/images/team/anton_af_bjur.png',
      alt: 'Anton af Bjur',
    },
  },
];
