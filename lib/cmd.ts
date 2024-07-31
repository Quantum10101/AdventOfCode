export class cmd {
	static CLS = "\x1b[2J\x1b[0;0H";
	
	static color = {
		RESET: "\x1B[0m",
		REVERSE: "\x1B[7m",
		RED: "\x1B[91m",
		RED_BG: "\x1B[101m",
		RED_DARK: "\x1B[31m",
		RED_DARK_BG: "\x1B[41m",
		GREEN: "\x1B[92m",
		GREEN_BG: "\x1B[102m",
		GREEN_DARK: "\x1B[32m",
		GREEN_DARK_BG: "\x1B[42m",
		BLUE: "\x1B[94m",
		BLUE_BG: "\x1B[104m",
		BLUE_DARK: "\x1B[34m",
		BLUE_DARK_BG: "\x1B[44m",
		YELLOW: "\x1B[93m",
		YELLOW_BG: "\x1B[103m",
		YELLOW_DARK: "\x1B[33m",
		YELLOW_DARK_BG: "\x1B[43m",
		MAGENTA: "\x1B[95m",
		MAGENTA_BG: "\x1B[105m",
		MAGENTA_DARK: "\x1B[35m",
		MAGENTA_DARK_BG: "\x1B[45m",
		CYAN: "\x1B[96m",
		CYAN_BG: "\x1B[106m",
		CYAN_DARK: "\x1B[36m",
		CYAN_DARK_BG: "\x1B[46m",
		WHITE: "\x1B[97m",
		WHITE_BG: "\x1B[107m",
		WHITE_DARK: "\x1B[37m",
		WHITE_DARK_BG: "\x1B[47m",
		BLACK: "\x1B[90m",
		BLACK_BG: "\x1B[100m",
		BLACK_DARK: "\x1B[30m",
		BLACK_DARK_BG: "\x1B[40m",
	};
	
	static text = {
		RESET: "\x1B[0m",
		BOLD: "\x1B[1m",
		END_BOLD: "\x1B[22m",
		UNDERLINE: "\x1B[4m",
		END_UNDERLINE: "\x1B[24m",
		ITALICS: "\x1B[3m",
		END_ITALICS: "\x1B[23m",
		STRIKETHROUGH: "\x1B[9m",
		END_STRIKETHROUGH: "\x1B[29m",
	};
	
	static move = {
		UP: (n: number = 1) => `\x1B[${n}A`,
		DOWN: (n: number = 1) => `\x1B[${n}B`,
		RIGHT: (n: number = 1) => `\x1B[${n}C`,
		LEFT: (n: number = 1) => `\x1B[${n}D`
	};
	
	static cursor = {
		SAVE: "\x1B[s",
		RESTORE: "\x1B[u",
		HIDE: "\x1B[?25l",
		SHOW: "\x1B[?25h"
	};
}
