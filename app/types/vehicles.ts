export type VechicleMake = {
    Make_ID: number;
    Make_Name: string
}

export type ClientMakeDropdownProps = {
    initialMakes?: VechicleMake[];
    label?: string;
}

export type SSRMakeDropdownProps = {
    initialMakes: VechicleMake[];
};

export type MakeDropdownProps = {
    makes: VechicleMake[];
    selectedMake: string;
    onChange: (value: string) => void;
};

