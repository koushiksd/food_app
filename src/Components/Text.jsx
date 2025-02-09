import { Animated, StyleSheet, Text } from "react-native";

const CustomeText= ({ children, style, other }) => {
   
  return (
    <Text style={[styles.text,style]} >
      {children}
    </Text>
  );
};

const CustomeTextAnimated = ({ children, style, other})=>{
  <Animated.Text 
  style={[styles.text,style]}
  {...other}
  >
       {children}
  </Animated.Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize:24,color:'black',fontFamily:'Poppins-Black'
  },
});
export  {CustomeText,CustomeTextAnimated}
