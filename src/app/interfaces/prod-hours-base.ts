export interface ProdHoursBase {
	id: string;
	date_created: string;
	date: string;
	hours: number;
	base: "7.25" | "11.25";
}

export interface organizedHours {
	groupId: string,//202403
	year: string,
	month: string,
	monthName: string, //marzo
	registry: ProdHoursBase[]
}


export interface organizedHoursByMonth {
	[key: string]: organizedHours
}