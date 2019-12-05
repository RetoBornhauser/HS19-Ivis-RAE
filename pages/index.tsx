import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Pie from '../components/pie'

interface TeamModel {
  id: String
  name: String,
  seasons: SeasonModel[]
}

interface SeasonModel {
  id: String,
  year: Number,
  teamMembers: TeamMemberModel[]
}

interface TeamMemberModel {
  id: String
  name: String,
  birthdate: Date
}


const Index = props => (
  <Layout>
    <h1>Relative Age Effect</h1>
    <ul>
      {props.teams.map(team => (
        <li key={team.id}>
          <a>{team.name}</a>
          <ul>
            {team.seasons.map(season => (
              <li key={season.id}>
                <a>{season.year}</a>
                <ul>
                  <div  style={{ height: 500 }} >
                  {generatePie(season.teamMembers)}
                  </div>
                </ul>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </Layout>
);

const generatePie = (members: TeamMemberModel[]) => {
  if(members.length == 0) {
    return(
      <h2>No Data available for this Season</h2>
    )
  }


  let first = 0
  let second = 0
  let third = 0
  let fourth = 0

  members.forEach(member => {
    let tempDate = new Date(member.birthdate)
    let month = tempDate.getMonth()
    
    if (month < 3) {
      first = first + 1
    }else if (month < 6) {
      second = second + 1
    }else if (month < 9) {
      third = third +1
    }else{
      fourth = fourth +1
    }
    
  });


  

  return (
    <Pie data={[
      {
        "id": "January - March",
        "label": "January - March",
        "value": first,
        "color": "hsl(107, 70%, 50%)"
      },
      {
        "id": "April - June",
        "label": "April - June",
        "value": second,
        "color": "hsl(6, 70%, 50%)"
      },
      {
        "id": "July - September",
        "label": "July - September",
        "value": third,
        "color": "hsl(291, 70%, 50%)"
      },
      {
        "id": "October - December",
        "label": "October - December",
        "value": fourth,
        "color": "hsl(291, 70%, 50%)"
      }
    ]}/>
  )

}



//https://stackoverflow.com/questions/40825276/regex-search-date-in-string
function strToDate(dateStr) {

  let temp = []

  let myString = dateStr; //Could be any String
  let myRegexp = /\d{2}[-.\/]\d{2}(?:[-.\/]\d{2}(\d{2})?)?/g; //Check pattern only
  let validDate = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])?|(?:(?:16|[2468][048]|[3579][26])00)?)))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))(\4)?(?:(?:1[6-9]|[2-9]\d)?\d{2})?$/g; //Check the validity of the date
  temp = myRegexp.exec(myString)
  temp = validDate.exec(temp[0])

  let newDate = temp.splice(0, 1)
  let temp2 = newDate.toString().split(".")
  let to = temp2[1] + "." + temp2[0] + "." + temp2[2]

  let date = new Date(to)
  return date

}


Index.getInitialProps = function () {
  const data = require('../data/players.json')

  const u21: TeamModel = {
    id: "1",
    name: "u21",
    seasons: []

  }

  const u18: TeamModel = {
    id: "2",
    name: "u18",
    seasons: []

  }

  var dataModel = [u21, u18]

  //Create SeasonModel for u21
  for (var i = 2009; i <= 2018; i++) {
    let tempSeason: SeasonModel = {
      id: "",
      year: i,
      teamMembers: []
    }
    tempSeason.id = "u21-" + tempSeason.year.toString()
    dataModel[0].seasons.push(tempSeason)
  }

  //Create SeasonModel for u18
  for (var i = 2009; i <= 2018; i++) {
    let tempSeason: SeasonModel = {
      id: "",
      year: i,
      teamMembers: []
    }
    tempSeason.id = "u18-" + tempSeason.year.toString()
    dataModel[1].seasons.push(tempSeason)
  }





  for (var i = 0; i < data.length; i++) {
    let tempTeamMember: TeamMemberModel = {
      id: "",
      name: data[i].Name,
      birthdate: new Date(1990, 1, 1)
    }


    tempTeamMember.birthdate = strToDate(data[i].Birthdate)


    if (data[i].Team === 'u21') {
      switch (data[i].Season) {
        case 2009:
          dataModel[0].seasons[0].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u21-2009-' + data[i].Name
          break;
        case 2010:
          dataModel[0].seasons[1].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u21-2010-' + data[i].Name
          break;
        case 2011:
          dataModel[0].seasons[2].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u21-2011-' + data[i].Name
          break;
        case 2012:
          dataModel[0].seasons[3].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u21-2012-' + data[i].Name
          break;
        case 2013:
          dataModel[0].seasons[4].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u21-2013-' + data[i].Name
          break;
        case 2014:
          dataModel[0].seasons[5].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u21-2014-' + data[i].Name
          break;
        case 2015:
          dataModel[0].seasons[6].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u21-2015-' + data[i].Name
          break;
        case 2016:
          dataModel[0].seasons[7].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u21-2016-' + data[i].Name
          break;
        case 2017:
          dataModel[0].seasons[8].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u21-2017-' + data[i].Name
          break;
        case 2018:
          dataModel[0].seasons[9].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u21-2018-' + data[i].Name
          break;

      }

    }

    if (data[i].Team === 'u18') {
      switch (data[i].Season) {
        case 2009:
          dataModel[1].seasons[0].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u18-2009-' + data[i].Name
          break;
        case 2010:
          dataModel[1].seasons[1].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u18-2010-' + data[i].Name
          break;
        case 2011:
          dataModel[1].seasons[2].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u18-2011-' + data[i].Name
          break;
        case 2012:
          dataModel[1].seasons[3].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u18-2012-' + data[i].Name
          break;
        case 2013:
          dataModel[1].seasons[4].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u18-2013-' + data[i].Name
          break;
        case 2014:
          dataModel[1].seasons[5].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u18-2014-' + data[i].Name
          break;
        case 2015:
          dataModel[1].seasons[6].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u18-2015-' + data[i].Name
          break;
        case 2016:
          dataModel[1].seasons[7].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u18-2016-' + data[i].Name
          break;
        case 2017:
          dataModel[1].seasons[8].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u18-2017-' + data[i].Name
          break;
        case 2018:
          dataModel[1].seasons[9].teamMembers.push(tempTeamMember)
          tempTeamMember.id = 'u18-2018-' + data[i].Name
          break;


      }

    }

  }

  return {
    teams: dataModel
  };
};

export default Index;