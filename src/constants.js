export const START_TIMER = 'START_TIMER';
export const PAUSE_TIMER = 'PAUSE_TIMER';
export const TIMER_COMPLETED = 'TIMER_COMPLETED';
export const TOGGLE_SOUND = 'TOGGLE_SOUND';
export const CHANGE_MODE = 'CHANGE_MODE';
export const OPEN_SETTINGS = 'OPEN_SETTINGS';
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const TICK = 'TICK';

export const COLORS = {
	white: '0deg 0% 100%',
	gray: {
		100: '185deg 5% 95%',
		300: '190deg 5% 80%',
		500: '196deg 4% 60%',
		700: '220deg 5% 40%',
		900: '220deg 3% 20%'
	},
	primary1: '1deg 87% 69%',
	primary2: '185deg 96% 72%',
	primary3: '284deg 91% 74%',
	secondary: '87deg 59% 49%',
	background: {
		100: '234deg 34% 23%',
		300: '235deg 36% 18%',
		500: '232deg 41% 14%'
	},
	accent: '204deg 100% 50%'
};

export const WEIGHTS = {
	normal: 500,
	medium: 600,
	bold: 800
};

export const BREAKPOINTS = {
	phone: 600,
	tablet: 950,
	laptop: 1300
};

export const QUERIES = {
	phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
	tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
	laptopAndSmaller: `(max-width: ${BREAKPOINTS.laptop / 16}rem)`
};
