
interface FormData {
    name?: string;
    type?: 'text' | 'date' | 'richtext' | 'select' | 'file' | "address" | "contact";
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
    selectOption?: CountryCodeOptionSechma[]
}
export interface CountryCodeOptionSechma {
    value: string;
    label: string;
    color?: string;
    isFixed?: boolean;
    isDisabled?: boolean;
}

export const CountryCodeOption: CountryCodeOptionSechma[] = [
    { value: '+91', label: 'India(+91)' },
    { value: '+1', label: 'USA(+1)' },
    { value: '+91', label: 'UK(+44)' },
];
export const personalData: FormData[] = [
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
        type: 'text',
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
        name: 'street',
        type: 'text',
        label: 'Street',
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
        cols: 12,
        row: 1,

    },


];


export const ContactData: FormData[] = [

    {
        name: 'contryCode',
        type: 'text',
        label: 'Country Code',
        selectOption: CountryCodeOption,
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
        type: 'text',
        label: 'Type',
        rules: {
            min_length: 5,
            max_length: 80,
        },
        help: '',
        cols: 12,
        row: 1,

    },

]