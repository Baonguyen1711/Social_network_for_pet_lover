import React, { useState } from 'react'
import { useBackground } from '../message/BackgroundContext'
import { Box, Typography } from '@mui/material'
import { Height } from '@mui/icons-material'
import { reverse } from 'dns'

interface PaletteProps {
    imgSrc: string
}

const Palette: React.FC<PaletteProps> = ({ imgSrc }) => {
    const { isPaletteOpen, palette, setIsPaletteOpen, selectedTheme, setSelectedTheme } = useBackground()
    const [isSelectedColor, setIsSelectedColor] = useState<boolean>(false)
    const [tempSelectedColors, setTempSelectedColors] = useState<number[][]>([])
    const overlayStyles = {
        width: "100vw",
        height: "100vh",
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    const modalStyles = {
        width: '400px',
        padding: '20px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
    };

    const closeButtonStyles = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '16px',
    };

    const isExisted = (color: number[]) => {
        const index = tempSelectedColors.findIndex(subArray => subArray.length === color.length && subArray.every((value, index) => value === color[index]))

        return index
    }

    if (!isPaletteOpen) {
        return null
    }

    return (
        <Box
            component="div"
            sx={{ ...overlayStyles }}
        >
            <Box
                component="div"
                maxWidth="50%"
                height="auto"
                sx={{ ...modalStyles }}
            >
                <button style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '16px',
                }}
                    onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                >
                    x
                </button>
                <img
                    src={imgSrc}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />

                <Typography
                    variant="caption"
                    sx={{
                        fontWeight: "600"
                    }}
                >
                    Please select 3 colors for your theme
                </Typography>

                <Box
                    component="div"
                    width="100%"
                    height="auto"
                    display="flex"
                    justifyContent="space-around"
                    flexWrap="wrap"
                >
                    {
                        palette.map((color, index) => {

                            const [r, g, b] = color
                            const existedIndex = isExisted(color)
                            return (
                                <Box
                                    key={index}
                                    width="40px"
                                    height="40px"
                                    borderRadius="50%"
                                    border={existedIndex !== -1 ? "2px solid blue" : "none"}
                                    margin="10px 15px"
                                    display="flex"
                                    justifyContent="space-between"
                                    sx={{
                                        bgcolor: `rgb(${r},${g},${b})`,
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                                            cursor: 'pointer', // Change cursor to pointer on hover
                                        }
                                    }}
                                    onClick={() => {
                                        debugger;
                                        console.log("selectedColors", tempSelectedColors)
                                        if (existedIndex !== -1) {
                                            const filteredArray = [...tempSelectedColors.filter(ele => ele !== tempSelectedColors[existedIndex])]
                                            setTempSelectedColors(filteredArray)
                                        } else {
                                            setTempSelectedColors((prev) => {
                                                if (prev.length == 0) {
                                                    return [color]
                                                } else {
                                                    return [...prev, color]
                                                }

                                            })
                                        }
                                    }
                                    }
                                >

                                </Box>
                            )
                        })
                    }
                </Box>

                <button

                    style={{ width: "100%", height: "40px", border: "none", backgroundColor: "green", borderRadius: "20px", color: "white", cursor: tempSelectedColors.length === 3 ? "pointer" : "not-allowed" }}
                    onClick={

                        () => {
                            debugger;
                            console.log("tempSelectedColors", tempSelectedColors)
                            setSelectedTheme(tempSelectedColors)
                            setTempSelectedColors([])
                            setIsPaletteOpen(false)
                        }

                    }
                    disabled={tempSelectedColors.length !== 3}
                >
                    Select theme
                </button>

            </Box>
        </Box>

    )
}

export default Palette