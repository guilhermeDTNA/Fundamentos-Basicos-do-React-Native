import { StatusBar, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc', 
    flex: 1,
    paddingTop: (StatusBar.currentHeight ?? 10) + 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#ccc',
    marginHorizontal: 10
  },
  section: {
    marginTop: 20, 
    marginBlock: 15
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    color: 'brown'
  },
})