import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import db from './config';
import AppHeader from './components/AppHeader';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      teamsRank: [],
    };
  }

  showTeamRanks = () => {
    var teams = [];
    var teamRef = db.ref('teams/');
    teamRef.on('value', (data) => {
      var teamList = data.val();
      for (var team in teamList) {
        if (teamList[team]['isButtonPressed'] === true) {
          teamList[team]['teamName'] = team;
          teams.push(teamList[team]);
        }
      }
      teams.sort(function (team1, team2) {
        return team1.timestamp - team2.timestamp;
      });
      this.setState({ teamsRank: teams });
      teams = [];
    });
  };

  resetDb = () => {
    var restDatabase = db.ref('teams/').set({
      red: {
        isButtonPressed: false,
        timestamp: 0,
        enabled: true,
      },
      green: {
        isButtonPressed: false,
        timestamp: 0,
        enabled: true,
      },
      blue: {
        isButtonPressed: false,
        timestamp: 0,
        enabled: true,
      },
      yellow: {
        isButtonPressed: false,
        timestamp: 0,
        enabled: true,
      },
    });
    this.setState({ teamsRank: [] });
  };

  componentDidMount() {
    this.showTeamRanks();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {this.state.teamsRank.map((team) => (
            <View
              style={{
                width: 170,
                height: 50,
                borderWidth: 2,
                margin: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: team.teamName,
              }}>
              <Text
                style={{
                  fontFamily: 'Century Gothic',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {team.teamName.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: 'lightgreen',
              padding: 10,
              width: 90,
              height: 35,
              justifyContent: 'center',
              left: 130,
              top: -90,
              borderRadius: 5,
            }}
            onPress={this.resetDb}>
            <Text
              style={{
                fontFamily: 'Century Gothic',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Reset
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Century Gothic',
              fontWeight: 'bold',
              fontSize:20,
              textAlign: 'center',
              marginTop: -480,
            }}>
            Teams
          </Text>
        </View>
      </View>
    );
  }
}
