export let in3Days = new Date()
in3Days.setDate(in3Days.getDate() + 3);

export let shortMenu = [
	{
		id: "1",
		name: 'appariement_qualite_ij_apprenti_champ_2018_2019_ij_sia_apprenti_01122018_31122018.xml', href: '#',
		samples: []
	},
	{
		id: "2",
		name: 'Team',
		samples: [
			{id: "1", name: 'Overview', expireDate: in3Days.toISOString()},
			{id: "2", name: 'Members', href: '#', expireDate: in3Days.toISOString()},
			{id: "3", name: 'Calendar', href: '#', expireDate: in3Days.toISOString()},
			{id: "4", name: 'Settings', href: '#', expireDate: in3Days.toISOString()},
		],
	},
	{
		id: "3",
		name: 'appariement_qualite_ij_foo_champ_2018_2019_ij_sia_bar_01122018_3114318.xml',
		samples: [
			{id: "5", name: 'Overview', href: '#'},
			{id: "6", name: 'Members', href: '#'},
			{id: "7", name: 'Calendar', href: '#'},
			{id: "8", name: 'Settings', href: '#'},
		],
	},
	{
		id: "4",
		name: 'XML',
		samples: [
			{id: "9", name: 'Overview', href: '#'},
			{id: "10", name: 'Members', href: '#'},
			{id: "11", name: 'Calendar', href: '#'},
			{id: "12", name: 'Settings', href: '#'},
		],
	},

];

export let longMenu = [].concat(shortMenu, shortMenu, shortMenu, shortMenu, shortMenu, shortMenu, shortMenu, shortMenu, shortMenu);
