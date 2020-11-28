import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Font } from '../../constants/Design';
import { wp } from '../../utils';

function List({ items, type, itemStyle, ...props }) {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors])

  const listItems = items.map((item, index) => (
    <View key={index}>
      <View key={index} style={[itemStyle, styles.item]}>
        <Text style={styles.itemSymbol}>
          {type === 'numeric' ? `${index + 1}.` : '\u2B24'}
        </Text>
        <Text style={styles.itemText}>{item}</Text>
      </View>
      {index < items.length - 1 && <View style={[styles.delimiter, {
        backgroundColor: colors.border,
      }]} />}
    </View>
  ))

  return (
    <View {...props}>
      {listItems}
    </View>
  )
}

const getStyles = (colors) => StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 12
  },
  itemSymbol: {
    color: colors.text,
    fontFamily: Font.bold,
    fontSize: wp(16),
    lineHeight: wp(20),
    width: 36,
  },
  itemText: {
    color: colors.text,
    fontFamily: Font.regular,
    fontSize: wp(16),
    lineHeight: wp(20),
    flex: 1,
  },
  delimiter: {
    height: 1,
    marginLeft: 36,
  }
})

List.defaultProps = {
  items: [],
  type: 'bullet',
  itemStyle: {}
}

export default List;