import { Dimensions, Platform } from "react-native";

export const theme = {
    background: '#eab308',
    text: '#eab308'
}
export const styles = {
    text: { color: theme.text },
    background: { backgroundColor: theme.background },
}

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === "ios";
export { width, height, ios }