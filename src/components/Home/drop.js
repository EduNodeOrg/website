import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 15;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
            backgroundColor: 'rgba(26, 31, 58, 0.95)',
            border: '2px solid rgba(123, 47, 247, 0.5)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(123, 47, 247, 0.3)',
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setPersonName(value);

        // Redirect to the corresponding page based on the selected item
        if (value === "Learn") {
            navigate('/for-students');
        }
        if (value === "Teach") {
            navigate('/for-teachers');
        }
        // if (value === "Certify") {
        //     navigate('/about-certifications');
        // }
    };

    return (
        <>
            <div>
                <FormControl sx={{ 
                    m: 1, 
                    width: 350,
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid rgba(123, 47, 247, 0.6)',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(123, 47, 247, 0.3)',
                        transition: 'all 0.3s ease',
                    },
                    '& .MuiOutlinedInput-root:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        border: '2px solid rgba(123, 47, 247, 0.8)',
                        boxShadow: '0 6px 25px rgba(123, 47, 247, 0.4)',
                        transform: 'translateY(-2px)',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        border: '2px solid rgba(123, 47, 247, 1)',
                        boxShadow: '0 8px 30px rgba(123, 47, 247, 0.5)',
                    }
                }}>
                    <InputLabel 
                        id="demo-multiple-name-label"
                        sx={{
                            color: '#ffffff',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            '&.Mui-focused': {
                                color: '#7b2ff7',
                            }
                        }}
                    >
                        What is your purpose?
                    </InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                        sx={{
                            color: '#ffffff',
                            backgroundColor: 'transparent',
                            '& .MuiSvgIcon-root': {
                                color: '#7b2ff7',
                            },
                            '& .MuiSelect-select': {
                                color: '#ffffff',
                                fontWeight: '500',
                            }
                        }}
                    >
                        <MenuItem
                            key="Learn"
                            value="Learn"
                            style={getStyles("Learn", personName, theme)}
                            sx={{
                                color: '#ffffff',
                                backgroundColor: 'rgba(123, 47, 247, 0.1)',
                                '&:hover': {
                                    backgroundColor: 'rgba(123, 47, 247, 0.3)',
                                    color: '#ffffff',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(123, 47, 247, 0.4)',
                                    color: '#ffffff',
                                }
                            }}
                        >
                            Learn
                        </MenuItem>
                        <MenuItem
                            key="Teach"
                            value="Teach"
                            style={getStyles("Teach", personName, theme)}
                            sx={{
                                color: '#ffffff',
                                backgroundColor: 'rgba(123, 47, 247, 0.1)',
                                '&:hover': {
                                    backgroundColor: 'rgba(123, 47, 247, 0.3)',
                                    color: '#ffffff',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(123, 47, 247, 0.4)',
                                    color: '#ffffff',
                                }
                            }}
                        >
                            Teach
                        </MenuItem>
                        {/* <MenuItem
                            key="Certify"
                            value="Certify"
                            style={getStyles("Certify", personName, theme)}
                            sx={{
                                color: '#ffffff',
                                backgroundColor: 'rgba(123, 47, 247, 0.1)',
                                '&:hover': {
                                    backgroundColor: 'rgba(123, 47, 247, 0.3)',
                                    color: '#ffffff',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(123, 47, 247, 0.4)',
                                    color: '#ffffff',
                                }
                            }}
                        >
                            Certify
                        </MenuItem> */}
                    </Select>
                </FormControl>
            </div >
        </>
    );
}
