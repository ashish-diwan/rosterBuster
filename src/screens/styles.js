import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerFooterStyle: {
    backgroundColor: 'lightgrey',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? 'bold' : '500',
  },
  greyTextStyle: {
    color: 'grey',
  },
  redColor: {
    color: 'red',
  },
  listContainer: {flex: 1},
  innerList: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'lightGrey',
    padding: 10,
  },
  departureStyle: {
    flexDirection: 'row',
    paddingLeft: 20,
    flex: 0.5,
  },
  timeStyle: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  timeInnerStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#000',
  },
  dutyCodeViewStyle: {flexDirection: 'column'},
});

export default styles;
