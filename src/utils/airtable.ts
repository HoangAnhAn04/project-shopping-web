import Airtable from 'airtable';
Airtable.configure({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN });
const base = Airtable.base('appddzxVQk4LWm4HB');
export default base;
