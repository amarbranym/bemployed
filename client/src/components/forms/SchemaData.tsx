import moment from 'moment';

interface FormData {
    name?: string;
    type?: 'text' | 'date' | 'textarea' | 'select' | 'file' | "address" | "contact" | "email" | "number" | "ref:strapi";
    label?: string;
    rules?: {
        min_length?: number;
        max_length?: number;
        model?: string;
        field?: string;
        options?: { label: string; value: string }[];
    };
    help?: string;
    cols?: number;
    row?: number;
    as?: string;
    rows?: string;
    insideField?: any
}
export interface OptionSechma {
    value: string;
    label: string;
}
const startYear = 2000;
const currentYear = moment().year(); // Fetches the current year
const yearOptions: OptionSechma[] = [];

for (let year = startYear; year <= currentYear; year++) {
    yearOptions.push({ label: ` ${year.toString()}`, value: year.toString() });
}
const genderOptions: OptionSechma[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" }
];
const maritalStatusOptions: OptionSechma[] = [
    { label: "Unmarried", value: "unmarried" },
    { label: "Married", value: "married" },
    { label: "Divorced", value: "divorced" },
];
export const CountryCodeOption: OptionSechma[] = [
    { value: '+91', label: 'India(+91)' },
    { value: '+1', label: 'USA(+1)' },
    { value: '+91', label: 'UK(+44)' },
];
export const ContactTypeOptoin: OptionSechma[] = [
    { value: "primary", label: "Primary" },
    { value: "alternate", label: "Alternate" },
    { value: "work", label: "Work" },
    { value: "home", label: "Home" },

];
export const GenderOption: OptionSechma[] = [

    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Work" },
    { value: "home", label: "Home" },

];
export const personalSchema: FormData[] = [
    // {
    //     name: 'profile',
    //     type: 'file',
    //     label: 'Profile',
    //     rules: {
    //         min_length: 5,
    //         max_length: 80,
    //     },
    //     help: '',
    //     cols: 12,
    //     row: 2,
    // },
    {
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 6,
        row: 1,
    },

    {
        name: 'lastName',
        type: 'text',
        label: 'Last Name',
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'email',
        type: 'email',
        label: 'Email',
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 6,
        row: 1,

    },

    {
        name: 'fatherName',
        type: 'text',
        label: 'Father Name',
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 6,
        row: 1,

    },

    {
        name: 'city',
        type: 'text',
        label: 'City',
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'addressType',
        type: 'text',
        label: 'Address Type',
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'street',
        type: 'textarea',
        label: 'Street',
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 12,
        row: 1,
        rows: "3"

    },

];


export const ContactSchema: FormData[] = [

    {
        name: 'contryCode',
        type: 'select',
        label: 'Country Code',
        rules: {
            options: CountryCodeOption,
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'number',
        type: 'text',
        label: 'Number',
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'contactType',
        type: 'select',
        label: 'Type',

        rules: {
            options: ContactTypeOptoin,

        },
        help: '',
        cols: 12,
        row: 1,

    },

]


export const qualificationSchema: FormData[] = [
    {
        name: 'school',
        type: 'ref:strapi',
        label: 'School',
        rules: {
            model: "schools",
            field: "Name",
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'year',
        type: 'select',
        label: 'Year',
        rules: {
            options: yearOptions,
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'qualification ',
        type: 'ref:strapi',
        label: 'Qualification ',
        rules: {
            model: "qualifications",
            field: "Name",
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'score ',
        type: 'text',
        label: 'Score ',
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 6,
        row: 1,

    },
]


export const experienceSchema: FormData[] = [
    {
        name: 'company',
        type: 'ref:strapi',
        label: 'Company',
        rules: {
            model: "companies",
            field: "Name"
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'designation',
        type: 'ref:strapi',
        label: 'Designation',
        rules: {
            model: "designations",
            field: "Name"
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'duration',
        type: 'number',
        label: 'Duration',
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 6,
        row: 1,
    },
]


export const otherDetails: FormData[] = [
    {
        name: 'skill',
        type: 'ref:strapi',
        label: 'Skills',
        rules: {
            model: "skills",
            field: "name"
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'industry',
        type: 'ref:strapi',
        label: 'Industry',
        rules: {
            model: "industries",
            field: "Name"
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'dob',
        type: 'text',
        label: 'DOB',
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 6,
        row: 1,
    },
    {
        name: 'gender',
        type: 'select',
        label: 'Gender',
        rules: {
            options: genderOptions
        },
        help: '',
        cols: 6,
        row: 1,
    },
    {
        name: 'maritalStatus',
        type: 'select',
        label: 'Marital Status',
        rules: {
            options: maritalStatusOptions
        },
        help: '',
        cols: 6,
        row: 1,
    },
]