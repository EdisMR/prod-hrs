export interface sumarizeInterface {
	month:string,
	year:string,
	daysRegisteredQuantity:number,
	daysRegisteredTotal:number,

	costa_rica:{
		targetHours:number,
		debtHours:number,
		exceedHours:number,
		productivity:string
	},
	new_albany:{
		targetHours:number,
		debtHours:number,
		exceedHours:number,
		productivity:string
	}
}