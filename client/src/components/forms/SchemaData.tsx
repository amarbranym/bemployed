import { useSelector } from "react-redux";

// const { schools } = useSelector((state: any) => state.student);
// console.log("school", schools)
interface FormData {
    name?: string;
    type?: 'text' | 'date' | 'textarea' | 'select' | 'file' | "address" | "contact" | "email" | "number";
    label?: string;
    rules?: {
        min_length?: number;
        max_length?: number;
    };
    help?: string;
    cols?: number;
    row?: number;
    options?: { key: string; value: string }[];
    as?: string;
    rows?: string;
    insideField?: any
    option?: OptionSechma[]
}
export interface OptionSechma {
    value: string;
    label: string;
}

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
        option: CountryCodeOption,
        rules: {
            min_length: 5,
            max_length: 80,
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
        option: ContactTypeOptoin,

        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 12,
        row: 1,

    },

]


export const qualificationSchema: FormData[] = [
    {
        name: 'school',
        type: 'select',
        label: 'School',
        option: CountryCodeOption,
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'year',
        type: 'select',
        label: 'Year',
        option: CountryCodeOption,
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'qualification ',
        type: 'select',
        label: 'Qualification ',
        option: CountryCodeOption,
        rules: {
            min_length: 5,
            max_length: 80,
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
        type: 'select',
        label: 'Company',
        option: CountryCodeOption,
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 6,
        row: 1,

    },
    {
        name: 'designation',
        type: 'select',
        label: 'Designation',
        option: CountryCodeOption,
        rules: {
            min_length: 5,
            max_length: 80,
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