import { Text, View } from "react-native";
import UserListScreen from "./screens/userListScreen";
import "../global.css";

export default function Index() {
  return (
    <View className="flex-1 flex flex-col items-center justify-center">
      <UserListScreen />
    </View>
  );
}
