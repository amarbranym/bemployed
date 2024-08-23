"use client"
import React, { useEffect, useRef, useState } from 'react'
import "@/styles/customSelect.css"
const Icon = ({ isOpen }: any) => {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="#222" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className={isOpen ? 'translate' : ''}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
};

// CloseIcon component
const CloseIcon = () => {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );
};
const CustomSelect = ({ placeHolder, options, isMulti, isSearchable, onChange, align }: any) => {
    // State variables using React hooks
    const [showMenu, setShowMenu] = useState<any>(false); // Controls the visibility of the dropdown menu
    const [selectedValue, setSelectedValue] = useState<any>(isMulti ? [] : null); // Stores the selected value(s)
    const [searchValue, setSearchValue] = useState<any>(""); // Stores the value entered in the search input
    const searchRef = useRef<any>(); // Reference to the search input element
    const inputRef = useRef<any>();
    const [openSearch, setOpenSearch] = useState<boolean>(false)
    useEffect(() => {
        setSearchValue("");
        if (showMenu && searchRef.current) {
            searchRef.current.focus();
        }
    }, [showMenu]);

    useEffect(() => {
        const handler = (e: any) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
        setOpenSearch(false)

            }
        };

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });

    const handleInputClick = (e: any) => {
        setShowMenu(!showMenu);
        setOpenSearch(!openSearch)
    };

    const getDisplay = () => {
        if (!selectedValue || selectedValue.length === 0) {
            return placeHolder;
        }
        if (isMulti) {
            return (
                <div className="dropdown-tags">
                    {
                        selectedValue.map((option: any, index: any) => (
                            <div key={`${option.value}-${index}`} className="dropdown-tag-item">
                                {option.label}
                                <span onClick={(e) => onTagRemove(e, option)} className="dropdown-tag-close" >
                                    <CloseIcon />
                                </span>
                            </div>
                        ))
                    }
                </div>
            );
        }
        return selectedValue.label;
    };

    const removeOption = (option: any) => {
        return selectedValue.filter((o: any) => o.value !== option.value);
    };

    const onTagRemove = (e: any, option: any) => {
        e.stopPropagation();
        const newValue = removeOption(option);
        setSelectedValue(newValue);
        onChange(newValue);
    };

    const onItemClick = (option: any) => {
        let newValue;
        if (isMulti) {
            if (selectedValue.findIndex((o: any) => o.value === option.value) >= 0) {
                newValue = removeOption(option);
            } else {
                newValue = [...selectedValue, option];
            }
        } else {
            newValue = option;
        }
        setSelectedValue(newValue);
        onChange(newValue);
    };

    const isSelected = (option: any) => {
        if (isMulti) {
            return selectedValue.filter((o: any) => o.value === option.value).length > 0;
        }

        if (!selectedValue) {
            return false;
        }

        return selectedValue.value === option.value;
    };

    const onSearch = (e: any) => {
        setSearchValue(e.target.value);
    };

    const getOptions = () => {
        if (!searchValue) {
            return options;
        }

        return options.filter(
            (option: any) =>
                option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
        );
    };

    return (
        <div className="custom--dropdown-container">

            <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
                {isSearchable && openSearch ? <input className={`dropdown-selected-value ${!selectedValue || selectedValue.length === 0 ? 'placeholder' : ''}`} onChange={onSearch} value={searchValue} ref={searchRef} /> : <div className={`dropdown-selected-value ${!selectedValue || selectedValue.length === 0 ? 'placeholder' : ''}`}  >{getDisplay()}</div>}


                <div className="dropdown-tools">
                    <div className="dropdown-tool">
                        <Icon isOpen={showMenu} />
                    </div>
                </div>
            </div>

            {
                showMenu && (
                    <div className={`dropdown-menu alignment--${align || 'auto'}`}>
                        {/* {
                            isSearchable && (
                                <div className="search-box">
                                    <input className="form-control" onChange={onSearch} value={searchValue} ref={searchRef} />
                                </div>
                            )
                        } */}
                        {
                            getOptions().map((option: any) => (
                                <div onClick={() => onItemClick(option)} key={option.value} className={`dropdown-item ${isSelected(option) && "selected"}`} >
                                    {option.label}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>

    )
}

export default CustomSelect
