export
    const selectStyle = {
        control: base => ({
            ...base,
            border: 0,
            padding: 0,
            margin: 0,
            marginTop: -11,
            marginLeft:"-15px",
            fontSize: 8,
            borderBottom: '1px dotted grey',
            // This line disable the blue border
            boxShadow: "none"
        }),
        option: (provided, state) => ({
            ...provided,
            border: 0,
            fontSize: 8,
            padding: 0,
        }),
    };

export
    const currencySelectStyle = {
        control: base => ({
            ...base,
            border: 0,
            padding: 0,
            margin: 0,
            marginLeft:"-25px",
            marginTop:"-5px",
            fontSize: 12,
            borderBottom: '1px dotted grey',
            // This line disable the blue border
            boxShadow: "none"
        }),
        option: (provided, state) => ({
            ...provided,
            border: 0,
            fontSize: 12,
            padding: 0,
        }),
    };  