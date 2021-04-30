export let in1Day = new Date()
in1Day.setDate(in1Day.getDate() + 1);

export let in3Days = new Date()
in3Days.setDate(in3Days.getDate() + 3);

export let expired = new Date()
expired.setDate(expired.getDate() - 3);

export const sampleData = [
    {
        "id": "1",
        "pairs": [
            {
                "name": "similarite_nom",
                "values": ["TIENE", "TIENE"]
            },
            {
                "name": "similarite_prenom",
                "values": ["ANDREA", "LEANDRE"]
            },
            {
                "name": "similarite_dateNaissance",
                "values": ["24/12/2002",]
            },
            {
                "name": "similarite_codeCommuneNaissance",
                "values": ["99326", "91228"]
            },
            {
                "name": "similarite_sexe",
                "values": ["1", "0"]
            }
        ],
        "score": 0.5359286694101509,
        "status": null
    },
    {
        "id": "2",
        "pairs": [
            {
                "name": "similarite_nom",
                "values": ["LONGCHE", "LONGCHAMP"]
            },
            {
                "name": "similarite_prenom",
                "values": ["RAPHAEL", "ISMAEL"]
            },
            {
                "name": "similarite_dateNaissance",
                "values": ["24/12/2002", "24/12/2000"]
            },
            {
                "name": "similarite_codeCommuneNaissance",
                "values": ["33318", "06085"]
            },
            {
                "name": "similarite_sexe",
                "values": ["1", "1"]
            }
        ],
        "score": 0,
        "status": "nok"
    },
    {
        "id": "3",
        "pairs": [
            {
                "name": "similarite_nom",
                "values": ["LONGCHE", "LONGCHE"]
            },
            {
                "name": "similarite_prenom",
                "values": ["MELVIN", "MELVIN"]
            },
            {
                "name": "similarite_dateNaissance",
                "values": ["24/12/2002", "24/12/2002"]
            },
            {
                "name": "similarite_codeCommuneNaissance",
                "values": ["33318", "33318"]
            },
            {
                "name": "similarite_sexe",
                "values": ["0", "0"]
            }
        ],
        "score": 3.2,
        "status": "ok"
    },
    {
        "id": "3",
        "pairs": [
            {
                "name": "similarite_nom",
                "values": ["CAMPET", "CAMPET"]
            },
            {
                "name": "similarite_prenom",
                "values": ["ALEX", "ALEX"]
            },
            {
                "name": "similarite_dateNaissance",
                "values": ["23/12/2002", "24/12/2002"]
            },
            {
                "name": "similarite_codeCommuneNaissance",
                "values": ["33318", "33318"]
            },
            {
                "name": "similarite_sexe",
                "values": ["0", "0"]
            }
        ],
        "score": 3.1,
        "status": "?"
    }
]


export let shortMenu = [
    {
        "id": "1",
        "name": 'appariement_qualite_ij_apprenti_champ_2018_2019_ij_sia_apprenti_01122018_31122018.xml', href: '#',
        samples: []
    },
    {
        "id": "2",
        "name": 'XML 1',
        samples: [
            {
                "id": "1",
                expireDate: in1Day.toISOString(),
                count: 1000,
                minScore: 0,
                maxScore: 5,
                date: expired.toISOString()
            },
            {
                "id": "2",


                expireDate: in3Days.toISOString(),
                count: 1,
                minScore: 3.2,
                maxScore: 5,
                date: expired.toISOString()
            },
            {
                "id": "3",


                expireDate: in1Day.toISOString(),
                count: 32,
                minScore: 1,
                maxScore: 3.4,
                date: expired.toISOString()
            },
            {
                "id": "4",


                expireDate: expired.toISOString(),
                count: 897,
                minScore: 2.33,
                maxScore: 5.55,
                date: expired.toISOString()
            },
        ],
    },
    {
        "id": "3",
        "name": 'appariement_qualite_ij_foo_champ_2018_2019_ij_sia_bar_01122018_3114318.xml',
        samples: [
            {
                "id": "10", expireDate: in1Day.toISOString(), count: 1000, minScore: 0, maxScore: 5,
                date: expired.toISOString()
            },
            {
                "id": "5",


                expireDate: in3Days.toISOString(),
                count: 1,
                minScore: 3.2,
                maxScore: 5,
                date: expired.toISOString()
            },
            {
                "id": "6",


                expireDate: in1Day.toISOString(),
                count: 32,
                minScore: 1,
                maxScore: 3.4,
                date: expired.toISOString()
            },
            {
                "id": "7",


                expireDate: expired.toISOString(),
                count: 897,
                minScore: 2.33,
                maxScore: 5.55,
                date: expired.toISOString()
            },
        ],
    },
    {
        "id": "4",
        "name": 'XML',
        samples: [
            {
                "id": "8", expireDate: in1Day.toISOString(), count: 1000, minScore: 0, maxScore: 5,
                date: expired.toISOString()
            },
            {
                "id": "9",


                expireDate: in3Days.toISOString(),
                count: 1,
                minScore: 3.2,
                maxScore: 5,
                date: expired.toISOString()
            },
            {
                "id": "14",


                expireDate: in1Day.toISOString(),
                count: 32,
                minScore: 1,
                maxScore: 3.4,
                date: expired.toISOString()
            },
            {
                "id": "16",


                expireDate: expired.toISOString(),
                count: 897,
                minScore: 2.33,
                maxScore: 5.55,
                date: expired.toISOString()
            },
        ],
    },

];

export let longMenu = [].concat(shortMenu, shortMenu, shortMenu, shortMenu, shortMenu, shortMenu, shortMenu, shortMenu, shortMenu);
