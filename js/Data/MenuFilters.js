var battingFilterMenuMap = {
    "lvl1":[{
        "value":"gameYear",
        "text":"Year",
        "lvl2":[
            {"value":"18", "text":"2018"},
            {"value":"17", "text":"2017"},
            {"value":"16", "text":"2016"}
        ]
    }, {
        "value":"latest",
        "text":"Latest Appearances",
        "lvl2":[
            {"value":"10", "text":"10"},
            {"value":"20", "text":"20"},
            {"value":"30", "text":"30"},
            {"value":"40", "text":"40"},
            {"value":"50", "text":"50"},
            {"value":"60", "text":"60"},
            {"value":"70", "text":"70"},
            {"value":"80", "text":"80"},
            {"value":"90", "text":"90"},
            {"value":"100", "text":"100"}
        ]
    }, {
        "value":"menOnBase",
        "text":"Men On Base",
        "lvl2":[
            {"value":"", "text":"Bases Empty"},
            {"value":"123", "text":"Bases Loaded"},
            {"value":"2;3;12;13;23;123", "text":"Scoring Position"},
            {"value":"1;2;3;12;13;23;123", "text":"On Base"},
            {"value":"1", "text":"On First Only"},
            {"value":"2", "text":"On Second Only"},
            {"value":"3", "text":"On Third Only"},
            {"value":"12", "text":"First & Third"},
            {"value":"13", "text":"First & Second"},
            {"value":"23", "text":"Second & Third"},
            {"value":"1;12;13;123", "text":"On First"},
            {"value":"2;23;12;123", "text":"On Second"},
            {"value":"3;23;13;123", "text":"On Third"},
        ]
    }, {
        "value":"outs",
        "text":"Outs",
        "lvl2":[
            {"value":"5", "text":"Leadoff"},
            {"value":"0", "text":"No Outs"},
            {"value":"1", "text":"One Out"},
            {"value":"2", "text":"Two Outs"},
        ]
    }, {
        "value":"inning",
        "text":"Inning",
        "lvl2":[
            {"value":"1", "text":"First"},
            {"value":"2", "text":"Second"},
            {"value":"3", "text":"Third"},
            {"value":"4", "text":"Fourth"},
            {"value":"5", "text":"Fifth"},
            {"value":"6", "text":"Sixth"},
            {"value":"7", "text":"Seventh"},
            {"value":"8", "text":"Eighth"},
            {"value":"9", "text":"Ninth"},
            {"value":"extras", "text":"Extras"}
        ]
    }, {
        "value":"count",
        "text":"Count",
        "lvl2":[
            {"value":"0-0", "text":"(0-0)"},
            {"value":"0-1", "text":"(0-1)"},
            {"value":"0-2", "text":"(0-2)"},
            {"value":"1-0", "text":"(1-0)"},
            {"value":"1-1", "text":"(1-1)"},
            {"value":"1-2", "text":"(1-2)"},
            {"value":"2-0", "text":"(2-0)"},
            {"value":"2-1", "text":"(2-1)"},
            {"value":"2-2", "text":"(2-2)"},
            {"value":"3-0", "text":"(3-0)"},
            {"value":"3-1", "text":"(3-1)"},
            {"value":"3-2", "text":"(3-2)"}
        ]
    }, {
        "value":"dayOfWeek",
        "text":"Day Of Week",
        "lvl2":[
            {"value":"thur;fri;sat;sun;mon", "text":"Weekend"},
            {"value":"tue;wed", "text":"Weekday"},
            {"value":"fri", "text":"Friday"},
            {"value":"sat", "text":"Saturday"},
            {"value":"sun", "text":"Sunday"},
            {"value":"mon", "text":"Monday"},
            {"value":"tue", "text":"Tuesday"},
            {"value":"wed", "text":"Wednseday"},
            {"value":"thur", "text":"Thursday"}
        ]
    }, {
        "value":"month",
        "text":"Month",
        "lvl2":[
            {"value":"feb", "text":"February"},
            {"value":"mar", "text":"March"},
            {"value":"apr", "text":"April"},
            {"value":"may", "text":"May"},
            {"value":"jun", "text":"June"}
        ]
    }, {
        "value":"opposingTeam",
        "text":"Opposint Team",
        "lvl2":[
            {"value":"conference", "text":"Conference"},
            {"value":"nonConference", "text":"Non Conference"},
            {"value":"manual", "text":"Search Team", "inputBox":"true"}
        ]
    }, {
        "value":"opposingPitcher",
        "text":"Opposing Pitcher",
        "lvl2":[
            {"value":"lefty", "text":"Vs Lefty"},
            {"value":"righty", "text":"Vs Righty"},
            {"value":"starter", "text":"Vs Starter"},
            {"value":"reliever", "text":"Vs Reliever"},
            {"value":"manual", "text":"By Name", "inputBox":"true"}
        ]
    }, {
        "value":"gameScore",
        "text":"Score",
        "lvl2":[
            {"value":"within", "text":"Within", "inputBox":"true"},
            {"value":"winningByMore", "text":"Winning By More Than", "inputBox":"true"},
            {"value":"winningByLess", "text":"Winning By Less Than", "inputBox":"true"},
            {"value":"losingByMore","text":"Losing By More Than", "inputBox":"true"},
            {"value":"losingByLess", "text":"Losing By Less Than", "inputBox":"true"}
        ]
    }]
};

var pitchingFilterMenuMap = {
    "lvl1":[{
        "value":"gameYear",
        "text":"Year",
        "lvl2":[
            {"value":"18", "text":"2018"},
            {"value":"17", "text":"2017"},
            {"value":"16", "text":"2016"}
        ]
    }, {
        "value":"latest",
        "text":"Latest Batters Faced",
        "lvl2":[
            {"value":"10", "text":"10"},
            {"value":"20", "text":"20"},
            {"value":"30", "text":"30"},
            {"value":"40", "text":"40"},
            {"value":"50", "text":"50"},
            {"value":"60", "text":"60"},
            {"value":"70", "text":"70"},
            {"value":"80", "text":"80"},
            {"value":"90", "text":"90"},
            {"value":"100", "text":"100"}
        ]
    }, {
        "value":"menOnBase",
        "text":"Men On Base",
        "lvl2":[
            {"value":"", "text":"Bases Empty"},
            {"value":"123", "text":"Bases Loaded"},
            {"value":"2;3;12;13;23;123", "text":"Scoring Position"},
            {"value":"1;2;3;12;13;23;123", "text":"On Base"},
            {"value":"1", "text":"On First Only"},
            {"value":"2", "text":"On Second Only"},
            {"value":"3", "text":"On Third Only"},
            {"value":"12", "text":"First & Third"},
            {"value":"13", "text":"First & Second"},
            {"value":"23", "text":"Second & Third"}
        ]
    }, {
        "value":"outs",
        "text":"Outs",
        "lvl2":[
            {"value":"5", "text":"Leadoff"},
            {"value":"0", "text":"No Outs"},
            {"value":"1", "text":"One Out"},
            {"value":"2", "text":"Two Outs"},
        ]
    }, {
        "value":"inning",
        "text":"Inning",
        "lvl2":[
            {"value":"1", "text":"First"},
            {"value":"2", "text":"Second"},
            {"value":"3", "text":"Third"},
            {"value":"4", "text":"Fourth"},
            {"value":"5", "text":"Fifth"},
            {"value":"6", "text":"Sixth"},
            {"value":"7", "text":"Seventh"},
            {"value":"8", "text":"Eighth"},
            {"value":"9", "text":"Ninth"},
            {"value":"extras", "text":"Extras"}
        ]
    }, {
        "value":"count",
        "text":"Count",
        "lvl2":[
            {"value":"0-0", "text":"(0-0)"},
            {"value":"0-1", "text":"(0-1)"},
            {"value":"0-2", "text":"(0-2)"},
            {"value":"1-0", "text":"(1-0)"},
            {"value":"1-1", "text":"(1-1)"},
            {"value":"1-2", "text":"(1-2)"},
            {"value":"2-0", "text":"(2-0)"},
            {"value":"2-1", "text":"(2-1)"},
            {"value":"2-2", "text":"(2-2)"},
            {"value":"3-0", "text":"(3-0)"},
            {"value":"3-1", "text":"(3-1)"},
            {"value":"3-2", "text":"(3-2)"}
        ]
    }, {
        "value":"dayOfWeek",
        "text":"Day Of Week",
        "lvl2":[
            {"value":"thur;fri;sat;sun;mon", "text":"Weekend"},
            {"value":"tue;wed", "text":"Weekday"},
            {"value":"fri", "text":"Friday"},
            {"value":"sat", "text":"Saturday"},
            {"value":"sun", "text":"Sunday"},
            {"value":"mon", "text":"Monday"},
            {"value":"tue", "text":"Tuesday"},
            {"value":"wed", "text":"Wednseday"},
            {"value":"thur", "text":"Thursday"}
        ]
    }, {
        "value":"month",
        "text":"Month",
        "lvl2":[
            {"value":"feb", "text":"February"},
            {"value":"mar", "text":"March"},
            {"value":"apr", "text":"April"},
            {"value":"may", "text":"May"},
            {"value":"jun", "text":"June"}
        ]
    }, {
        "value":"opposingTeam",
        "text":"Opposint Team",
        "lvl2":[
            {"value":"conference", "text":"Conference"},
            {"value":"nonConference", "text":"Non Conference"},
            {"value":"manual", "text":"Search Team", "inputBox":"true"}
        ]
    }, {
        "value":"opposingBatter",
        "text":"Opposing Batter",
        "lvl2":[
            {"value":"lefty", "text":"Vs Lefty"},
            {"value":"righty", "text":"Vs Righty"},
            {"value":"starter", "text":"Vs Starter"},
            {"value":"reliever", "text":"Vs Reliever"},
            {"value":"manual", "text":"By Name", "inputBox":"true"}
        ]
    }, {
        "value":"gameScore",
        "text":"Score",
        "lvl2":[
            {"value":"within", "text":"Within", "inputBox":"true"},
            {"value":"winningByMore", "text":"Winning By More Than", "inputBox":"true"},
            {"value":"winningByLess", "text":"Winning By Less Than", "inputBox":"true"},
            {"value":"losingByMore","text":"Losing By More Than", "inputBox":"true"},
            {"value":"losingByLess", "text":"Losing By Less Than", "inputBox":"true"}
        ]
    }]
};
