const Input = ({ type = 'text', placeholder = 'Add placeholder', className, register, name, readonly, error, disabled, id, defaultValue }: any) => {
    return (
        <div>
            <input
                type={type}
                {...register(name)}
                className={`${error && 'has-error'} form-input ${className} `}
                placeholder={placeholder}
                readOnly={readonly}
                defaultValue={defaultValue}
                disabled={disabled}
                id={id}
            />
            {error && <div className="mt-1 ml-[2px] block text-sm text-danger">{error.message}</div>}
        </div>
    );
};

export default Input;
