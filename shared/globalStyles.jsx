import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: "#1c1d2d",
    paddingHorizontal: 20,
    paddingTop: 5,
    color: "white",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
  },
  nutritionDisplay: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E303E",
    padding: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  chartWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  chartText: {
    left: 30,
    position: "absolute",
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  nutritionValues: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  nutritionText: {
    color: "white",
    paddingTop: 10,
    fontSize: 17,
  },
  targetView: {
    paddingTop: 12,
  },
  mealsDisplay: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    alignItems: "baseline",
  },
  button: {
    borderWidth: 1,
    borderColor: "#303955",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    top: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  mealsContainer: {
    marginTop: 20,
    width: "100%",
    borderWidth: 2,
    borderColor: "#2E303E",
  },
});

export default globalStyles;
