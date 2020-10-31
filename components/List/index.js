import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Font } from '../../constants/Design';
import { commonStyles } from '../../style';

function List({ items, type, itemStyle, ...props }) {
  const listItems = items.map((item, index) => (
    <View key={index}>
      <View key={index} style={[itemStyle, styles.item]}>
        <Text style={styles.itemSymbol}>
          {type === 'numeric' ? `${index + 1}.` : '\u2B24'}
        </Text>
        <Text style={styles.itemText}>{item}</Text>
      </View>
      {index < items.length - 1 && <View style={styles.delimiter} />}
    </View>
  ))

  return (
    <View>
      {listItems}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 12
  },
  itemSymbol: {
    ...commonStyles.regularText,
    fontFamily: Font.bold,
    fontSize: 16,
    width: 36,
  },
  itemText: {
    ...commonStyles.regularText,
    fontSize: 16,
    flex: 1,
  },
  delimiter: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 36,
  }
})

List.defaultProps = {
  items: [],
  type: 'bullet',
  itemStyle: {}
}

export default List;