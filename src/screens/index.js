import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RosterData from './roster';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const FlightView = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const group = RosterData.reduce((groups, item) => {
      const date = item.Date;
      if (isNaN(item.Time_Depart)) {
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
      }
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(group).map((date, index) => {
      return {
        date,
        items: group[date],
      };
    });
    setData(groupArrays);
  }, []);

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.itemSeparatorStyle} />
    );
  };

  const getIconName = item => {
    const lowerCaseItem = item.toLowerCase();
    switch (lowerCaseItem) {
      case 'flight':
        return 'plane';
      case 'standby':
        return 'paste';
      case 'layover':
        return 'suitcase';
      default:
        return 'question';
    }
  };

  const ItemView = ({item}) => {
    //Item view
    return (
      <>
        <View style={styles.headerFooterStyle}>
          <Text style={[styles.textStyle, {fontSize: 12}]}>
            {getDate(item.date)}
          </Text>
        </View>
        <View style={styles.listContainer}>
          {item?.items?.map((flightData, index) => {
            if (flightData?.DutyCode.toLowerCase() !== 'off') {
              return (
                <View
                  key={flightData.Date + index.toString()}
                  style={styles.innerList}>
                  <Icon
                    name={getIconName(flightData.DutyCode)}
                    size={30}
                    color="#000"
                  />
                  <View style={styles.departureStyle}>
                    {flightData?.DutyCode.toLowerCase() === 'layover' && (
                      <View style={styles.dutyCodeViewStyle}>
                        <Text style={styles.textStyle}>
                          {flightData?.DutyCode}
                        </Text>

                        <Text style={styles.greyTextStyle}>
                          {flightData.Departure}
                        </Text>
                      </View>
                    )}
                    {flightData?.DutyCode.toLowerCase() !== 'layover' && (
                      <>
                        <Text style={styles.textStyle}>
                          {flightData.Departure}
                        </Text>
                        <Text style={styles.textStyle}>
                          {' '}
                          - {flightData.Destination}
                        </Text>
                      </>
                    )}
                  </View>

                  <View style={styles.timeStyle}>
                    {flightData?.DutyCode.toLowerCase() === 'standby' && (
                      <Text style={styles.greyTextStyle}>
                        {flightData.DutyID}
                      </Text>
                    )}
                    <View style={styles.timeInnerStyle}>
                      {flightData?.DutyCode.toLowerCase() !== 'layover' && (
                        <Text style={styles.redColor}>
                          {flightData.Time_Depart} -{' '}
                        </Text>
                      )}
                      <Text style={styles.redColor}>
                        {flightData.Time_Arrive}{' '}
                        {flightData?.DutyCode.toLowerCase() === 'layover' &&
                          'hours'}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }
          })}
        </View>
      </>
    );
  };

  const EmptyListMessage = () => {
    return (
      // Empty Data Text
      <Text style={styles.emptyListStyle}>No Data Found</Text>
    );
  };

  const getDate = date => {
    const pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const arrayDate = date.match(pattern);
    let dt = new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);
    const monthName = dt.toLocaleString('default', {month: 'short'});
    const weekName = dt.toLocaleString('default', {weekday: 'short'});
    return `${weekName} ${dt.getDate()} ${monthName}. ${dt.getFullYear()}`;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.date + index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListEmptyComponent={EmptyListMessage}
      />
    </SafeAreaView>
  );
};

export default FlightView;
