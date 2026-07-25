export interface TeamMember {
  name: string;
  titleKey: 'team.fadi_title' | 'team.anel_title';
  bioKey: 'team.fadi_desc' | 'team.anel_desc';
  phone: string;
  email: string;
  address: string;
  mapUrl: string;
  image: string;
}

// This is the shared source for the existing Contact, Home, About, and Team
// presentations. Keep the contact details aligned with the Contact page.
export const teamMembers: TeamMember[] = [
  {
    name: 'Fadi Rabah',
    titleKey: 'team.fadi_title',
    bioKey: 'team.fadi_desc',
    phone: '070-939 51 11',
    email: 'fadi.rabah@reqcon.se',
    address: 'Tullgårdsgatan 10, 116 68 Stockholm',
    mapUrl: 'https://maps.google.com/?q=Tullgårdsgatan+10,+Stockholm',
    image: '/images/team/fadi_rabah.jpg',
  },
  {
    name: 'Anel Pasic',
    titleKey: 'team.anel_title',
    bioKey: 'team.anel_desc',
    phone: '070-853 19 21',
    email: 'anel.pasic@reqcon.se',
    address: 'Gustaf Dalénsgatan 30 (Hisinge Hus), 417 24 Göteborg',
    mapUrl: 'https://maps.google.com/?q=Gustaf+Dalénsgatan+30,+Göteborg',
    image: '/images/team/anel_pasic.jpg',
  },
];
