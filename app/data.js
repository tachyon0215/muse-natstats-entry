// Nippon in Numbers — data layer. All figures are published Japanese official
// statistics (Statistics Bureau of Japan, Cabinet Office, MHLW, Bank of Japan),
// rounded where a series is labelled "rounded". No figure is invented for show:
// every table names its source and reference year beside it.

export const POPULATION_TREND = [
  // Census totals (millions), 1970-2020; 2024 is the Oct 1 population estimate.
  { year: 1970, value: 104.67 }, { year: 1975, value: 111.94 },
  { year: 1980, value: 117.06 }, { year: 1985, value: 121.05 },
  { year: 1990, value: 123.61 }, { year: 1995, value: 125.57 },
  { year: 2000, value: 126.93 }, { year: 2005, value: 127.77 },
  { year: 2010, value: 128.06 }, { year: 2015, value: 127.09 },
  { year: 2020, value: 126.15 }, { year: 2024, value: 123.80 },
];

export const AGE_GROUPS_2024 = [
  // Population by broad age group, Oct 1 2024 estimate (millions / share %).
  { label: "0–14 years", value: 13.83, share: 11.2 },
  { label: "15–64 years", value: 73.73, share: 59.6 },
  { label: "65 years and over", value: 36.24, share: 29.3 },
  { label: "75 years and over", value: 20.78, share: 16.8 },
];

export const VITALS = [
  // Vital statistics (MHLW). Births/deaths/marriages are registered counts.
  { year: 2015, births: 1005656, deaths: 1290444, marriages: 635156 },
  { year: 2018, births: 918400, deaths: 1362470, marriages: 586481 },
  { year: 2020, births: 840835, deaths: 1372755, marriages: 525507 },
  { year: 2021, births: 811622, deaths: 1439856, marriages: 501138 },
  { year: 2022, births: 770759, deaths: 1569050, marriages: 504930 },
  { year: 2023, births: 727277, deaths: 1575854, marriages: 474741 },
  { year: 2024, births: 720988, deaths: 1618426, marriages: 499999 },
];

export const GDP_TREND = [
  // Nominal GDP, trillion yen, Cabinet Office national accounts (rounded).
  { year: 2015, value: 538 }, { year: 2016, value: 545 },
  { year: 2017, value: 557 }, { year: 2018, value: 561 },
  { year: 2019, value: 561 }, { year: 2020, value: 543 },
  { year: 2021, value: 560 }, { year: 2022, value: 567 },
  { year: 2023, value: 592 }, { year: 2024, value: 609 },
];

export const CPI_TREND = [
  // Consumer price index, all items, annual change % (Statistics Bureau).
  { year: 2015, value: 0.8 }, { year: 2016, value: -0.1 },
  { year: 2017, value: 0.5 }, { year: 2018, value: 1.0 },
  { year: 2019, value: 0.5 }, { year: 2020, value: 0.0 },
  { year: 2021, value: -0.2 }, { year: 2022, value: 2.5 },
  { year: 2023, value: 3.2 }, { year: 2024, value: 2.5 },
];

export const UNEMPLOYMENT_TREND = [
  // Unemployment rate, annual average % (Labour Force Survey).
  { year: 2015, value: 3.4 }, { year: 2016, value: 3.1 },
  { year: 2017, value: 2.8 }, { year: 2018, value: 2.4 },
  { year: 2019, value: 2.4 }, { year: 2020, value: 2.8 },
  { year: 2021, value: 2.8 }, { year: 2022, value: 2.6 },
  { year: 2023, value: 2.6 }, { year: 2024, value: 2.5 },
];

export const HOUSEHOLD_SPENDING_2024 = [
  // Average monthly consumption expenditure of two-or-more-person households,
  // 2024: 300,243 yen in total (Family Income and Expenditure Survey, rounded shares).
  { label: "Food", share: 27.9 }, { label: "Housing", share: 6.1 },
  { label: "Fuel, light & water", share: 7.7 }, { label: "Furniture & household goods", share: 3.9 },
  { label: "Clothing & footwear", share: 3.5 }, { label: "Medical care", share: 4.9 },
  { label: "Transport & communication", share: 14.6 }, { label: "Education", share: 3.4 },
  { label: "Culture & recreation", share: 10.4 }, { label: "Other (incl. pocket money & gifts)", share: 17.6 },
];

export const LIFE_EXPECTANCY = [
  // Life expectancy at birth, years (MHLW abridged life tables).
  { year: 1990, men: 75.92, women: 81.90 }, { year: 2000, men: 77.72, women: 84.60 },
  { year: 2010, men: 79.55, women: 86.30 }, { year: 2015, men: 80.75, women: 87.05 },
  { year: 2020, men: 81.56, women: 87.71 }, { year: 2023, men: 81.09, women: 87.14 },
];

export const INDICATORS = {
  population: { title: "Total population", unit: "million people", series: POPULATION_TREND, source: "Population Census & Population Estimates, Statistics Bureau of Japan" },
  gdp: { title: "Nominal GDP", unit: "trillion yen", series: GDP_TREND, source: "National Accounts, Cabinet Office (rounded)" },
  cpi: { title: "Consumer prices (annual change)", unit: "% per year", series: CPI_TREND, source: "Consumer Price Index, Statistics Bureau of Japan" },
  unemployment: { title: "Unemployment rate", unit: "% of labour force", series: UNEMPLOYMENT_TREND, source: "Labour Force Survey, Statistics Bureau of Japan" },
  births: { title: "Live births", unit: "babies per year", series: VITALS.map(v => ({ year: v.year, value: v.births })), source: "Vital Statistics, Ministry of Health, Labour and Welfare" },
};

export const PREFECTURES = [
  // 2020 Population Census, persons (rounded to nearest hundred in this table).
  // region, name, population, area km2
  ["Hokkaido", "Hokkaido", 5224614, 83424], ["Tohoku", "Aomori", 1237984, 9646],
  ["Tohoku", "Iwate", 1210534, 15275], ["Tohoku", "Miyagi", 2301996, 7282],
  ["Tohoku", "Akita", 959555, 11638], ["Tohoku", "Yamagata", 1068027, 9323],
  ["Tohoku", "Fukushima", 1833152, 13784], ["Kanto", "Ibaraki", 2867009, 6097],
  ["Kanto", "Tochigi", 1933146, 6408], ["Kanto", "Gunma", 1939110, 6362],
  ["Kanto", "Saitama", 7344765, 3798], ["Kanto", "Chiba", 6284480, 5158],
  ["Kanto", "Tokyo", 14047594, 2194], ["Kanto", "Kanagawa", 9237337, 2416],
  ["Chubu", "Niigata", 2201272, 12584], ["Chubu", "Toyama", 1034814, 4248],
  ["Chubu", "Ishikawa", 1132181, 4186], ["Chubu", "Fukui", 766863, 4191],
  ["Chubu", "Yamanashi", 812056, 4465], ["Chubu", "Nagano", 2048011, 13562],
  ["Chubu", "Gifu", 1978742, 10621], ["Chubu", "Shizuoka", 3633202, 7777],
  ["Chubu", "Aichi", 7542415, 5173], ["Kansai", "Mie", 1770254, 5774],
  ["Kansai", "Shiga", 1413610, 4017], ["Kansai", "Kyoto", 2578087, 4612],
  ["Kansai", "Osaka", 8837685, 1905], ["Kansai", "Hyogo", 5465002, 8401],
  ["Kansai", "Nara", 1324473, 3691], ["Kansai", "Wakayama", 923033, 4725],
  ["Chugoku", "Tottori", 553407, 3507], ["Chugoku", "Shimane", 671126, 6708],
  ["Chugoku", "Okayama", 1888432, 7115], ["Chugoku", "Hiroshima", 2799702, 8480],
  ["Chugoku", "Yamaguchi", 1342059, 6112], ["Shikoku", "Tokushima", 719559, 4147],
  ["Shikoku", "Kagawa", 950244, 1877], ["Shikoku", "Ehime", 1334841, 5676],
  ["Shikoku", "Kochi", 691527, 7104], ["Kyushu", "Fukuoka", 5135214, 4987],
  ["Kyushu", "Saga", 811442, 2441], ["Kyushu", "Nagasaki", 1312317, 4131],
  ["Kyushu", "Kumamoto", 1738301, 7409], ["Kyushu", "Oita", 1123852, 6341],
  ["Kyushu", "Miyazaki", 1069576, 7735], ["Kyushu", "Kagoshima", 1588256, 9187],
  ["Kyushu", "Okinawa", 1467480, 2281],
].map(([region, name, population, area]) => ({
  region, name, population, area,
  density: Math.round(population / area),
}));

export const GLOSSARY = [
  { term: "Population Census", text: "Japan's full count of everyone usually living in the country, taken every five years since 1920. The 2020 census counted 126,146,099 people." },
  { term: "Total fertility rate", text: "The average number of children a woman would have in her lifetime at current age-specific birth rates. Japan's rate was 1.20 in 2023 and 1.15 in 2024." },
  { term: "Consumer Price Index", text: "Measures the change in prices of a fixed basket of goods and services bought by households. All-items prices rose 2.5% in 2024." },
  { term: "Labour force", text: "Everyone aged 15 and over who is employed or unemployed and seeking work. Japan's labour force averaged 69.57 million in 2024." },
  { term: "Nominal GDP", text: "The value of everything produced in the economy at current prices, before removing inflation. Japan's nominal GDP was about 609 trillion yen in 2024." },
  { term: "Ageing rate", text: "The share of the population aged 65 and over. In Japan it reached 29.3% in 2024, the highest of any large country." },
  { term: "Vital statistics", text: "Registered births, deaths, marriages, divorces and stillbirths, published monthly and yearly by the Ministry of Health, Labour and Welfare." },
  { term: "Household survey", text: "The Family Income and Expenditure Survey samples about 9,000 households to track income and spending; a two-or-more-person household spent on average 300,243 yen a month in 2024." },
];

export const HEADLINES = [
  { label: "Total population (Oct 2024)", value: "123.80 million", note: "Down 898,000 in a year; the 14th straight yearly fall." },
  { label: "Aged 65 and over", value: "29.3%", note: "36.24 million people — a record share of the population." },
  { label: "Live births (2024)", value: "720,988", note: "The lowest since records began in 1899; deaths were 1,618,426." },
  { label: "Nominal GDP (2024)", value: "¥609 trillion", note: "About US$4.0 trillion at the 2024 average exchange rate." },
  { label: "Unemployment (2024 average)", value: "2.5%", note: "Labour force 69.57 million; employed 67.81 million." },
  { label: "Consumer prices (2024)", value: "+2.5%", note: "Third straight year of inflation above 2%; food rose faster." },
  { label: "Life expectancy (2023)", value: "81.1 / 87.1 years", note: "Men / women at birth — among the longest-lived in the world." },
  { label: "Land area", value: "377,975 km²", note: "About 66% is forest; 14,125 islands were counted in 2023." },
];
