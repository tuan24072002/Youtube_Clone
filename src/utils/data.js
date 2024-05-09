export const API_KEY = 'AIzaSyAuL0kny7GxFbX4VOHA29_SVdMXghY5U0c'
// export const API_KEY = 'AIzaSyDPEtqqfLvg_mfShQPMHMoikGx0YqUPrDU'

export const convert = (value) => {
    if (value >= 1000000000) {
        const formattedValue = Math.floor(value / 100000000) / 10;
        return Number.isInteger(formattedValue) ? formattedValue + " B" : formattedValue.toFixed(1) + " B";
    } else if (value >= 1000000) {
        const formattedValue = Math.floor(value / 100000) / 10;
        return Number.isInteger(formattedValue) ? formattedValue + " M" : formattedValue.toFixed(1) + " M";
    } else if (value >= 1000) {
        const formattedValue = Math.floor(value / 100) / 10;
        return Number.isInteger(formattedValue) ? formattedValue + " K" : formattedValue.toFixed(1) + " K";
    } else {
        return value;
    }
}