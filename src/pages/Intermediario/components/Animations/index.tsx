import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const Animations = () => {
  const widthAnimated = useRef(new Animated.Value(10)).current;
  const widthAnimatedPct = widthAnimated.interpolate({
    inputRange: [10, 100],
    outputRange: ['10%', '100%']
  })
  const heightAnimated = useRef(new Animated.Value(50)).current;
  const opacityAnimated = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const widthAnimationAction = Animated.timing(widthAnimated, {
      toValue: 80,
      duration: 3000,
      useNativeDriver: false
    });

    const heightAnimationAction = Animated.timing(heightAnimated, {
      toValue: 200,
      duration: 2000,
      useNativeDriver: false
    });

    const animatedParallel = Animated.parallel([widthAnimationAction, heightAnimationAction]);

    const hideAnimationAction = Animated.timing(opacityAnimated, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true
    });

    const showAnimationAction = Animated.timing(opacityAnimated, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    });

    const blinkAnimatedSequence = Animated.sequence([hideAnimationAction, showAnimationAction]);

    const blinkAnimcationAction = Animated.loop(blinkAnimatedSequence);

    
    Animated.sequence([animatedParallel, blinkAnimcationAction]).start();

  }, [])

  return(
    <View style={styles.container}>
      <Animated.View style={{
        width: widthAnimatedPct,
        height: heightAnimated,
        opacity: opacityAnimated,
        backgroundColor: '#4169e1',
        justifyContent: 'center'
      }}>
        <Text style={{textAlign: 'center', fontSize: 22, color: '#FFF'}}>Loading...</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Animations;