import React, {useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, ResponsiveContainer, Cell } from 'recharts';
import {
    Paper,
    Typography,
    Box,
    Container,
    List,
    ListItem,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    AppBar,
    Toolbar,
    TableRow,
    Link,
} from '@mui/material';

// Kleurenpalet voor consistente styling
const colors = {
    primary: '#2C3E50',    // Donkerblauw voor hoofdtekst en headers
    accent: '#E74C3C',     // Rood voor highlights en accenten
    light: '#ECF0F1',      // Lichtgrijs voor achtergronden
    lighter: '#F8F9FA',    // Nog lichter grijs voor subtiele achtergronden
    white: '#FFFFFF',      // Wit voor achtergronden
    lightText: '#6C757D',  // Lichtgrijs voor secundaire tekst
};

const uitgroeiBehandelingen = {
    dames: [
        { naam: "Haarstation", prijs: 20.50 },
        { naam: 'Marlooks Haarsalon', prijs: 23.50 },
        { naam: 'Denise Haarstudio', prijs: 24.00, isEigen: true },
        { naam: 'You Make My Hair', prijs: 25.00 },
        { naam: 'Kapsalon Annemarie', prijs: 27.50 },
        { naam: 'Coupe26', prijs: 28.50 },
        { naam: 'Kapsalon Gijsbers', prijs: 30.00 },
        { naam: 'Salon R&B', prijs: 31.50 },
        { naam: 'Ingrids Haarstudio', prijs: 33.75 },
        { naam: "It's More Hairstyling", prijs: 35.00 }
    ],
    damesNieuw: [
        { naam: "Haarstation", prijs: 20.50 },
        { naam: 'Marlooks Haarsalon', prijs: 23.50 },
        { naam: 'You Make My Hair', prijs: 25.00 },
        { naam: 'Denise Haarstudio', prijs: 26.50, isEigen: true },
        { naam: 'Kapsalon Annemarie', prijs: 27.50 },
        { naam: 'Coupe26', prijs: 28.50 },
        { naam: 'Kapsalon Gijsbers', prijs: 30.00 },
        { naam: 'Salon R&B', prijs: 31.50 },
        { naam: 'Ingrids Haarstudio', prijs: 33.75 },
        { naam: "It's More Hairstyling", prijs: 35.00 }
    ],
    heren: [
        { naam: "Haarstation", prijs: 18.00 },
        { naam: 'Denise Haarstudio', prijs: 20.00, isEigen: true },
        { naam: 'Marlooks Haarsalon', prijs: 21.50 },
        { naam: 'You Make My Hair', prijs: 22.00 },
        { naam: 'Kapsalon Annemarie', prijs: 24.00 },
        { naam: 'Coupe26', prijs: 25.00 },
        { naam: 'Salon R&B', prijs: 27.50 },
        { naam: 'Kapsalon Gijsbers', prijs: 29.00 },
        { naam: 'Ingrids Haarstudio', prijs: 31.25 },
        { naam: "It's More Hairstyling", prijs: 31.75 }
    ],
    herenNieuw: [
        { naam: "Haarstation", prijs: 18.00 },
        { naam: 'Marlooks Haarsalon', prijs: 21.50 },
        { naam: 'You Make My Hair', prijs: 22.00 },
        { naam: 'Denise Haarstudio', prijs: 22.50, isEigen: true },
        { naam: 'Kapsalon Annemarie', prijs: 24.00 },
        { naam: 'Coupe26', prijs: 25.00 },
        { naam: 'Salon R&B', prijs: 27.50 },
        { naam: 'Kapsalon Gijsbers', prijs: 29.00 },
        { naam: 'Ingrids Haarstudio', prijs: 31.25 },
        { naam: "It's More Hairstyling", prijs: 31.75 }
    ]
};

const kleurBehandelingen = {
    uitgroeiKleuring: [
        { naam: 'Denise Haarstudio', prijs: 31.00, isEigen: true },
        { naam: "Haarstation", prijs: 33.50 },
        { naam: 'Kapsalon Annemarie', prijs: 35.00 },
        { naam: 'Marlooks Haarsalon', prijs: 38.50 },
        { naam: 'You Make My Hair', prijs: 42.00 },
        { naam: 'Kapsalon Gijsbers', prijs: 45.00 },
        { naam: 'Salon R&B', prijs: 45.00 },
        { naam: "It's More Hairstyling", prijs: 47.00 },
        { naam: 'Ingrids Haarstudio', prijs: 50.00 }
    ],
    uitgroeiKleuringNieuw: [
        { naam: "Haarstation", prijs: 33.50 },
        { naam: 'Kapsalon Annemarie', prijs: 35.00 },
        { naam: 'Denise Haarstudio', prijs: 36.00, isEigen: true },
        { naam: 'Marlooks Haarsalon', prijs: 38.50 },
        { naam: 'You Make My Hair', prijs: 42.00 },
        { naam: 'Kapsalon Gijsbers', prijs: 45.00 },
        { naam: 'Salon R&B', prijs: 45.00 },
        { naam: "It's More Hairstyling", prijs: 47.00 },
        { naam: 'Ingrids Haarstudio', prijs: 50.00 }
    ]
};

const highlightsPrijzen = [
    { naam: "Haarstation", highlights: "€35,50", kort: "€35,50", middel: "€52,50", lang: "€60,50", balayage: "", toner: "€18,00", link: "https://www.haar-station.nl/prijslijst/" },
    { naam: "Marlooks Haarsalon", highlights: "€60,00", kort: "", middel: "", lang: "", balayage: "", toner: "€13,50", link: "https://www.marlookshaarsalon.nl/tarieven/" },
    { naam: "You Make My Hair", highlights: "€70,50", kort: "€70,50", middel: "", lang: "€99,00", balayage: "", toner: "€25,00", link: "https://www.youmakemyhair.nl/prijzen" },
    { naam: "Kapsalon Gijsbers", highlights: "€27,75", kort: "", middel: "", lang: "", balayage: "€69,00", toner: "", link: "https://kapsalongijsbers.nl/prijslijst/" },
    { naam: "Salon R&B", highlights: "", kort: "", middel: "", lang: "", balayage: "€95,50", toner: "€16,50", link: "https://salonrb.nl/prijslijst/" },
    { naam: "Ingrids Haarstudio", highlights: "€26,00", kort: "", middel: "", lang: "", balayage: "", toner: "€17,00", link: "http://www.ingridshaarstudio.net/prijzen" },
    { naam: "Coupe26", highlights: "€1,55 per folie", kort: "€1,55 per folie", middel: "€2,00 per folie", lang: "€2,50 per folie", balayage: "", toner: "€17,00", link: "https://coupe26.nl/tarieven" }
];
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
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                transform="rotate(-45)"
                fill={isOwnSalon ? colors.accent : colors.primary}
                style={{
                    fontSize: '12px',
                    fontWeight: isOwnSalon ? '700' : '500',
                    transition: 'all 0.3s ease'
                }}
            >
                {urls[payload.value] ? (
                    <tspan
                        style={{
                            cursor: 'pointer',
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                        onClick={() => window.open(urls[payload.value], '_blank')}
                    >
                        {payload.value}
                    </tspan>
                    ) : (
                    payload.value
                    )}
            </text>
        </g>
    );
};

const ChartWrapper = ({ data, title, analysis }) => (
    <Paper
        elevation={2}
        sx={{
            p: 3,
            mb: 4,
            borderRadius: '8px',
            border: `1px solid ${colors.light}`,
            transition: 'all 0.3s ease',
            '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }
        }}
    >
        <Typography
            variant="h6"
            gutterBottom
            sx={{
                color: colors.primary,
                fontWeight: 600,
                fontSize: '1.1rem',
                mb: 3
            }}
        >
            {title}
        </Typography>

        <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                >
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                    <XAxis
                        dataKey="naam"
                        height={100}
                        tick={<CustomTick />}
                        interval={0}
                        tickMargin={10}
                    />
                    <YAxis
                        label={{
                            value: 'Prijs in Euro',
                            angle: -90,
                            position: 'insideLeft',
                            style: {
                                textAnchor: 'middle',
                                fill: colors.primary
                            }
                        }}
                    />
                    <Bar dataKey="prijs">
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.isEigen ? colors.accent : colors.light}
                                style={{
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseOver={(e) => e.target.style.filter = 'brightness(1.2)'}
                                onMouseOut={(e) => e.target.style.filter = 'brightness(1)'}
                            />
                        ))}
                        <LabelList
                            dataKey="prijs"
                            position="center"
                            formatter={(value) => `€${value.toFixed(2)}`}
                            style={{
                                fill: colors.white,
                                fontWeight: 'bold',
                                fontSize: '12px',
                                textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
                            }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Box>

        <Box
            sx={{
                mt: 2,
                p: 2,
                bgcolor: colors.lighter,
                borderRadius: '4px',
                border: `1px solid ${colors.light}`
            }}
        >
            <Typography variant="body2" sx={{ color: colors.primary }}>
                <strong>Gemiddelde prijs:</strong> €
                {(data.reduce((acc, curr) => acc + curr.prijs, 0) / data.length).toFixed(2)}
            </Typography>
        </Box>

        {analysis && (
            <Box
                sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: colors.lighter,
                    borderRadius: '4px',
                    border: `1px solid ${colors.light}`
                }}
            >
                <List>
                    {analysis.map((point, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={point}
                                primaryTypographyProps={{
                                    sx: { color: colors.primary, fontSize: '0.9rem', lineHeight: 1.2 }
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        )}
    </Paper>
);

const PrijsVergelijkingen = () => {
    const renderSectionTitle = (title) => (
        <Typography
            variant="h5"
            gutterBottom
            sx={{
                color: colors.primary,
                fontWeight: 600,
                mb: 4,
                borderBottom: `2px solid ${colors.light}`,
                pb: 1
            }}
        >
            {title}
        </Typography>
    );

    const renderAnalysisBox = (content) => (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                mb: 4,
                bgcolor: colors.lighter,
                borderLeft: `4px solid ${colors.accent}`,
                borderRadius: '8px'
            }}
        >
            <Typography variant="body1" sx={{ color: colors.primary }}>
                {content}
            </Typography>
        </Paper>
    );

    const tableHeaderStyle = {
        backgroundColor: colors.lighter,
        fontWeight: 600,
        color: colors.primary
    };

    const tableCellStyle = {
        color: colors.primary,
        borderBottom: `1px solid ${colors.light}`
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Navigation */}
            <AppBar position="fixed" sx={{ bgcolor: colors.primary, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box
                        component="img"
                        src="https://www.denisehaarstudio.nl/wp-content/uploads/2023/08/header-logo.png"
                        alt="Denise Haarstudio"
                        sx={{
                            height: 50,
                            mr: 2,
                            filter: 'brightness(0) invert(1)'
                        }}
                    />
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        {[
                            { href: '#basis-knipbehandelingen', text: 'Basis Knipbehandelingen' },
                            { href: '#kleurbehandelingen', text: 'Kleurbehandelingen' },
                            { href: '#nieuwe-prijsstructuur', text: 'Nieuwe Prijsstructuur' },
                            { href: '#prijsimpact', text: 'Prijsimpact' }
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                sx={{
                                    color: colors.white,
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: colors.accent,
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >
                                {item.text}
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ mt: 8, mb: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        color: colors.primary,
                        fontWeight: 600
                    }}
                >
                    Prijsanalyse Kapsalons Boxmeer
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                >
                    Oktober 2024
                </Typography>
            </Box>

            {/* Samenvatting */}
            <Box component="section" mb={8}>
                {renderAnalysisBox(
                    'Bij de start van mijn bedrijf heb ik gekozen voor een relatief laag prijsniveau. ' +
                    'Nu, door een volledige agenda en een klantenstop, is het moment aangebroken om de prijsstructuur te herzien. ' +
                    'Deze analyse toont aan dat er vooral bij kleurbehandelingen ruimte is voor aanpassing. ' +
                    'De nieuwe prijzen gaan in per 1 december 2024. ' +
                    'De grafieken zijn interactief; klik op een salon om hun prijslijst te bekijken. ' +
                    'Hierbij moet wel vermeld worden dat het niet duidelijk is wanneer deze prijslijsten voor het laatst zijn geüpdatet en of de getoonde prijzen nog actueel zijn.'
                )}
            </Box>

            {/* Basis Knipbehandelingen */}
            <Box component="section" mb={8} id="basis-knipbehandelingen">
                {renderSectionTitle('Basis knipbehandelingen')}

                {/* Dames */}
                <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
                    <Box sx={{ flex: 1 }}>
                        <ChartWrapper
                            data={uitgroeiBehandelingen.dames}
                            title="Dames Knippen - Huidige Situatie"
                            analysis={[
                                'Huidige tarief: €24,00 - Gepositioneerd in het middensegment',
                                'Concurrentiepositie: 7 aanbieders hanteren een hoger tarief',
                                'Marktaandeel behouden door scherpe prijsstelling'
                            ]}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <ChartWrapper
                            data={uitgroeiBehandelingen.damesNieuw}
                            title="Dames Knippen - Nieuwe Situatie"
                            analysis={[
                                'Aangepast tarief: €26,50 - Strategische positionering tussen directe concurrenten',
                                'Behoud marktpositie met 6 hoger geprijsde aanbieders',
                                'Nog steeds 6 duurdere aanbieders'
                            ]}
                        />
                    </Box>
                </Box>

                {/* Heren */}
                <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
                    <Box sx={{ flex: 1 }}>
                        <ChartWrapper
                            data={uitgroeiBehandelingen.heren}
                            title="Heren Knippen - Huidige Situatie"
                            analysis={[
                                'Huidig tarief: €20,00 - Sterk concurrerende positie',
                                'Marktpositie: 8 aanbieders hanteren een hoger tarief',
                                'Aantrekkelijke prijsstelling voor mannelijk segment'
                            ]}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <ChartWrapper
                            data={uitgroeiBehandelingen.herenNieuw}
                            title="Heren Knippen - Nieuwe Situatie"
                            analysis={[
                                'Nieuwe prijs €22,50',
                                'Behoud competitieve positie met 6 duurdere aanbieders',
                                'Huidige klantbestand heeft geen problemen met een kleine prijsverhoging'
                            ]}
                        />
                    </Box>
                </Box>
            </Box>
            {/* Kleurbehandelingen & Highlights */}
            <Box component="section" mb={8} id="kleurbehandelingen">
                {renderSectionTitle('Kleurbehandelingen & Highlights')}

                <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
                    <Box sx={{ flex: 1 }}>
                        <ChartWrapper
                            data={kleurBehandelingen.uitgroeiKleuring}
                            title="Uitgroei Kleuring - Huidige Situatie"
                            analysis={[
                                'Huidige prijs €31,00',
                                'Laagste prijs in de markt',
                                'Ruim onder marktgemiddelde van €41,00'
                            ]}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <ChartWrapper
                            data={kleurBehandelingen.uitgroeiKleuringNieuw}
                            title="Uitgroei Kleuring - Nieuwe Situatie"
                            analysis={[
                                'Nieuw tarief: €36,00 - Optimale positionering in middensegment',
                                'Aantrekkelijk geprijsd t.o.v. marktgemiddelde (€41,00)',
                                'Balans tussen toegankelijkheid en winstgevendheid'
                            ]}
                        />
                    </Box>
                </Box>

                {/* Highlights Tabel */}
                <Paper
                    elevation={2}
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: '8px',
                        border: `1px solid ${colors.light}`
                    }}
                >
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            color: colors.primary,
                            fontWeight: 600
                        }}
                    >
                        Highlights Prijsvergelijking
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 3,
                            color: colors.primary
                        }}
                    >
                        Het vergelijken van highlightprijzen is lastig, omdat elke salon zijn eigen prijstheorie volgt.
                        Prijzen variëren sterk en zijn vaak niet transparant online te vinden.
                    </Typography>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={tableHeaderStyle}>Salon</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Highlights Vanaf Prijs</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Kort Haar</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Middel Lang Haar</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Lang Haar</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Balayage</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Toner</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {highlightsPrijzen.map((entry, index) => (
                                    <TableRow
                                        key={`highlights-${index}`}
                                        sx={{
                                            '&:hover': {
                                                bgcolor: colors.lighter
                                            }
                                        }}
                                    >
                                        <TableCell sx={tableCellStyle}>
                                            <Link
                                                href={entry.link}
                                                target="_blank"
                                                sx={{
                                                    color: colors.accent,
                                                    textDecoration: 'none',
                                                    '&:hover': {
                                                        textDecoration: 'underline'
                                                    }
                                                }}
                                            >
                                                {entry.naam}
                                            </Link>
                                        </TableCell>
                                        <TableCell sx={tableCellStyle}>{entry.highlights}</TableCell>
                                        <TableCell sx={tableCellStyle}>{entry.kort}</TableCell>
                                        <TableCell sx={tableCellStyle}>{entry.middel}</TableCell>
                                        <TableCell sx={tableCellStyle}>{entry.lang}</TableCell>
                                        <TableCell sx={tableCellStyle}>{entry.balayage}</TableCell>
                                        <TableCell sx={tableCellStyle}>{entry.toner}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>

            {/* Nieuwe Prijsstructuur */}
            <Box component="section" mb={8} id="nieuwe-prijsstructuur">
                {renderSectionTitle('Nieuwe Prijsstructuur per 1 december 2024')}

                <Paper
                    elevation={2}
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: '8px',
                        border: `1px solid ${colors.light}`
                    }}
                >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={tableHeaderStyle}>Behandeling</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Huidige Prijs</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Nieuwe Prijs</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Verschil</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Stijging %</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[
                                    { behandeling: 'Knippen Dames', huidig: '24.00', nieuw: '26.50', note: 'Wassen, knippen, drogen' },
                                    { behandeling: 'Knippen Heren', huidig: '20.00', nieuw: '22.50', note: 'Wassen, knippen, drogen' },
                                    { behandeling: 'Knippen Kinderen', huidig: '19.00', nieuw: '21.00', note: 'Wassen, knippen, drogen' },
                                    { behandeling: 'Uitgroei kleuring', huidig: '31.00', nieuw: '36.00', note: 'Vanaf prijs' },
                                    { behandeling: 'Highlights Scalp Kort', huidig: '15.00', nieuw: '17.00', note: 'Highlights alleen bij de hoofdhuid' },
                                    { behandeling: 'Highlights Scalp Middel', huidig: '34.00', nieuw: '38.00', note: 'Highlights alleen bij de hoofdhuid' },
                                    { behandeling: 'Highlights Scalp Lang', huidig: '45.00', nieuw: '49.00', note: 'Highlights alleen bij de hoofdhuid' },
                                    { behandeling: 'Highlights Kort', huidig: '27.00', nieuw: '32.00', note: 'Complete highlights kort haar' },
                                    { behandeling: 'Highlights Middel', huidig: '44.00', nieuw: '48.00', note: 'Complete highlights middel haar' },
                                    { behandeling: 'Highlights Lang', huidig: '65.00', nieuw: '71.00', note: 'Complete highlights lang haar' },
                                    { behandeling: 'Blonderen', huidig: '40.00', nieuw: '45.00', note: 'In overleg' },
                                    { behandeling: 'Enkele Folies', huidig: '-', nieuw: '17.00', note: 'Nieuw in prijslijst' },
                                    { behandeling: 'Toner', huidig: '15.00', nieuw: '16.00', note: '' }
                                ].map((item, index) => (
                                    <TableRow key={`prijzen-${index}`}>
                                        <TableCell sx={tableCellStyle}>
                                            {item.behandeling}
                                            <Typography
                                                variant="caption"
                                                display="block"
                                                sx={{ color: colors.lightText }}
                                            >
                                                {item.note}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={tableCellStyle}>
                                            {item.huidig !== '-' ? `€${item.huidig}` : '-'}
                                        </TableCell>
                                        <TableCell sx={tableCellStyle}>€{item.nieuw}</TableCell>
                                        <TableCell sx={tableCellStyle}>
                                            {item.huidig !== '-' &&
                                                `€${(parseFloat(item.nieuw) - parseFloat(item.huidig)).toFixed(2)}`
                                            }
                                        </TableCell>
                                        <TableCell sx={tableCellStyle}>
                                            {item.huidig !== '-' &&
                                                `${((parseFloat(item.nieuw) - parseFloat(item.huidig)) / parseFloat(item.huidig) * 100).toFixed(1)}%`
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{
                        mt: 4,
                        p: 3,
                        bgcolor: colors.lighter,
                        borderRadius: '8px',
                        border: `1px solid ${colors.light}`
                    }}>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{
                                fontWeight: 600,
                                color: colors.primary
                            }}
                        >
                            Belangrijke wijziging highlights behandelingen:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="De highlights behandelingen zijn opgesplitst in twee verschillende concepten. Dit werd al op deze manier toegepast, echter wordt het straks anders op de site gecommuniceerd:"
                                    secondary="- Scalp highlights: alleen bij de hoofdhuid"
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            color: colors.primary,
                                            mb: 1
                                        },
                                        '& .MuiListItemText-secondary': {
                                            color: colors.lightText
                                        }
                                    }}
                                />
                            </ListItem>
                        </List>
                    </Box>
                </Paper>
            </Box>

            {/* Prijsimpact Analyse */}
            <Box component="section" mb={8} id="prijsimpact">
                {renderSectionTitle('Impact op Veelvoorkomende Behandelingen')}

                <Paper
                    elevation={2}
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: '8px',
                        border: `1px solid ${colors.light}`
                    }}
                >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={tableHeaderStyle}>Behandelcombinatie</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Huidige Prijs</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Nieuwe Prijs</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Verschil</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Stijging %</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* Basis behandelingen */}
                                {[
                                    {
                                        behandeling: 'Knippen Dames',
                                        huidig: 24.00,
                                        nieuw: 26.50,
                                        note: 'Basis knipbehandeling inclusief wassen en föhnen'
                                    },
                                    {
                                        behandeling: 'Knippen Heren',
                                        huidig: 20.00,
                                        nieuw: 22.50,
                                        note: 'Basis knipbehandeling inclusief wassen en föhnen'
                                    },
                                    {
                                        behandeling: 'Knippen Kinderen',
                                        huidig: 19.00,
                                        nieuw: 21.00,
                                        note: 'Basis knipbehandeling inclusief wassen'
                                    }
                                ].map((item, index) => (
                                    <TableRow key={`basis-${index}`}>
                                        <TableCell sx={tableCellStyle}>
                                            {item.behandeling}
                                            <Typography variant="caption" display="block" sx={{ color: colors.lightText }}>
                                                {item.note}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={tableCellStyle}>€{item.huidig.toFixed(2)}</TableCell>
                                        <TableCell sx={tableCellStyle}>€{item.nieuw.toFixed(2)}</TableCell>
                                        <TableCell sx={tableCellStyle}>€{(item.nieuw - item.huidig).toFixed(2)}</TableCell>
                                        <TableCell sx={tableCellStyle}>
                                            {((item.nieuw - item.huidig) / item.huidig * 100).toFixed(1)}%
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {/* Uitgebreide behandelingen */}
                                {[
                                    {
                                        behandeling: 'Dames Knippen + Highlights Scalp Kort',
                                        huidig: 24.00 + 15.00,
                                        nieuw: 26.50 + 17.00,
                                        note: 'Highlights alleen bij de hoofdhuid'
                                    },
                                    {
                                        behandeling: 'Dames Knippen + Uitgroei Kleuring',
                                        huidig: 24.00 + 31.00,
                                        nieuw: 26.50 + 36.00,
                                        note: 'Basiskleuring met uitgroeibehandeling'
                                    },
                                    {
                                        behandeling: 'Dames Knippen + Highlights Kort',
                                        huidig: 24.00 + 27.00,
                                        nieuw: 26.50 + 32.00,
                                        note: 'Complete highlights behandeling kort haar'
                                    },
                                    {
                                        behandeling: 'Dames Knippen + Highlights Middel',
                                        huidig: 24.00 + 44.00,
                                        nieuw: 26.50 + 48.00,
                                        note: 'Complete highlights behandeling middellang haar'
                                    },
                                    {
                                        behandeling: 'Dames Knippen + Highlights Lang',
                                        huidig: 24.00 + 65.00,
                                        nieuw: 26.50 + 71.00,
                                        note: 'Complete highlights behandeling lang haar'
                                    },
                                    {
                                        behandeling: 'Dames Knippen + Highlights Kort + Toner',
                                        huidig: 24.00 + 27.00 + 15.00,
                                        nieuw: 26.50 + 32.00 + 16.00,
                                        note: 'Complete highlights behandeling kort haar inclusief toner'
                                    },
                                    {
                                        behandeling: 'Dames Knippen + Highlights Middel + Toner',
                                        huidig: 24.00 + 44.00 + 15.00,
                                        nieuw: 26.50 + 48.00 + 16.00,
                                        note: 'Complete highlights behandeling middellang haar inclusief toner'
                                    },
                                    {
                                        behandeling: 'Dames Knippen + Highlights Lang + Toner',
                                        huidig: 24.00 + 65.00 + 15.00,
                                        nieuw: 26.50 + 71.00 + 16.00,
                                        note: 'Complete highlights behandeling lang haar inclusief toner'
                                    }
                                ].map((item, index) => (
                                    <TableRow key={`complex-${index}`}>
                                        <TableCell sx={tableCellStyle}>
                                            {item.behandeling}
                                            <Typography variant="caption" display="block" sx={{ color: colors.lightText }}>
                                                {item.note}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={tableCellStyle}>€{item.huidig.toFixed(2)}</TableCell>
                                        <TableCell sx={tableCellStyle}>€{item.nieuw.toFixed(2)}</TableCell>
                                        <TableCell sx={tableCellStyle}>€{(item.nieuw - item.huidig).toFixed(2)}</TableCell>
                                        <TableCell sx={tableCellStyle}>
                                            {((item.nieuw - item.huidig) / item.huidig * 100).toFixed(1)}%
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{
                        mt: 3,
                        p: 3,
                        bgcolor: colors.lighter,
                        borderRadius: '8px',
                        border: `1px solid ${colors.light}`
                    }}>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{
                                color: colors.primary,
                                fontWeight: 600
                            }}
                        >
                            Belangrijke opmerkingen:
                        </Typography>
                        <List>
                            <ListItem sx={{ pl: 2 }}>
                                <ListItemText
                                    primary="• Prijzen voor highlights zijn vanaf prijzen; exacte prijs wordt bepaald op uitgroei van haarlengte en hoeveelheid"
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            color: colors.primary
                                        }
                                    }}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="• Er is onderscheid tussen scalp highlights (alleen bij de hoofdhuid) en volledige highlights behandelingen"
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            color: colors.primary
                                        }
                                    }}
                                />
                            </ListItem>
                        </List>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default PrijsVergelijkingen;