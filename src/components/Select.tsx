import Select from 'react-select';

const SelectCustom = ({ options, defaultValue, isSearchable = false, error, disabled = false, isMulti = false, isClearable = false, className, placeholder, value, onChange }: any) => {
    return (
        <>
            <Select
                defaultValue={defaultValue}
                options={options}
                isSearchable={isSearchable}
                isClearable={!!error || isClearable}
                className={`my-react-select-container ${className}`}
                classNamePrefix="my-react-select"
                isDisabled={disabled}
                isMulti={isMulti}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && <div className="mt-1 ml-[2px] block text-sm text-danger">{error?.message}</div>}
        </>
        // <Select
        //     options={options}
        //     value={value}
        //     onChange={handleChange}
        //     isSearchable={isSearchable}
        //     classNamePrefix="my-react-select"
        //     className={`my-react-select-container ${className}`}
        //     placeholder={placeholder}
        //     name={name}
        //     id={name}
        // />
    );
};

export default SelectCustom;
