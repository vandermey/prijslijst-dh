import React from 'react';
import { styled } from '@mui/material/styles';

// Styled component voor de link
const StyledLink = styled('a')(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: 'inherit',
    '&:hover': {
        textDecoration: 'underline',
        opacity: 0.8
    }
}));

// Styled component voor de text container
const StyledText = styled('text')(({ theme, isOwnSalon }) => ({
    fill: isOwnSalon ? theme.palette.primary.main : '#666',
    fontSize: '12px',
    fontWeight: isOwnSalon ? '700' : '500',
    transition: 'all 0.2s ease',
    '&:hover': {
        opacity: 0.8
    }
}));

const CustomTick = ({ x, y, payload }) => {
    const urls = {
        'Marlooks Haarsalon': 'https://www.marlookshaarsalon.nl/tarieven/',
        'Denise Haarstudio': 'https://www.denisehaarstudio.nl/#prijslijst',
        'You Make My Hair': 'https://www.youmakemyhair.nl/prijzen',
        'Kapsalon Annemarie': 'http://www.kapsalonoeffelt.nl/Openingstijden/prijslijst',
        'Coupe26': 'https://coupe26.nl/tarieven',
        'Kapsalon Gijsbers': 'https://kapsalongijsbers.nl/prijslijst/',
        'Salon R&B': 'https://salonrb.nl/prijslijst/',
        'Ingrids Haarstudio': 'http://www.ingridshaarstudio.net/prijzen',
        "It's More Hairstyling": 'https://itsmorehairstyling.nl/prijslijst/',
        "Haarstation": 'https://www.haar-station.nl/prijslijst/'
    };

    const isOwnSalon = payload.value === 'Denise Haarstudio';

    return (
        <g transform={`translate(${x},${y})`}>
            <StyledText
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                transform="rotate(-45)"
                isOwnSalon={isOwnSalon}
            >
                {urls[payload.value] ? (
                    <StyledLink
                        href={urls[payload.value]}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {payload.value}
                    </StyledLink>
                ) : (
                    payload.value
                )}
            </StyledText>
        </g>
    );
};

export default CustomTick;