export interface ProdHoursBase {
	id: string;
	date_created: string;
	date: string;
	hours: string;
	base: "main" | "extended";
}

export interface organizedHoursByMonth {
	groupId: string,//202403
	year: string,
	month: string,
	monthName: string, //marzo
	registry: ProdHoursBase[]
}