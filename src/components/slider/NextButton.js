import { TouchableOpacity, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import MyIcon from '../global/MyIcon';
import { SlidesList } from '../../constant/SliderList';
import { Theme } from '../../constant/Theme';
import { useNavigation } from '@react-navigation/native';
import MyButton from '../global/Mybutton';

const theme = Theme();
const NextButton = ({ percentage, scrollRef }) => {
  const navigation = useNavigation();
  const [isLast, setLast] = useState(false);

  useEffect(() => {
    if (percentage < 100 && scrollRef.current) {
      setLast(false);
    } else {
      setLast(true);
    }
  }, [percentage]);

  const handleNextPress = () => {
    if (percentage < 100 && scrollRef.current) {
      const totalListItems = SlidesList.length;
      const scrollToIndex = Math.floor((percentage / 100) * totalListItems);
      scrollRef.current.scrollToIndex({
        index: scrollToIndex,
        animated: true,
      });
    } else {
      navigation.replace('welcomePage');
    }
  };

  return (
    <View style={styles.container}>
      {isLast === false ? (
        <TouchableOpacity style={styles.button} onPress={handleNextPress}>
          <MyIcon
            name="ios-arrow-forward"
            size={30}
            color={theme.palette.white}
          />
        </TouchableOpacity>
      ) : (
        <MyButton
          text="get started"
          onPress={handleNextPress}
          style={{ width: '50%' }}
        />
      )}
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 100,
    // padding: 15,
    width: 70,
    height: 70,
    justifyContent: 'center',
    backgroundColor: theme.palette.primary,
    alignItems: 'center',
  },
});
