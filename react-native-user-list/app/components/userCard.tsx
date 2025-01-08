import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "../types/types"; // Assuming the User type is in a 'types' file

interface UserCardProps {
  user: User; // Accept a 'user' prop of type 'User'
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  // Destructure 'user' prop
  return (
    <View className="p-4 mb-4 bg-white rounded-lg shadow-lg">
      <Text className="font-bold text-lg">{user.name}</Text>
      <Text className="text-gray-500">{user.email}</Text>
      <Text className="mt-2 text-sm">
        {user.address.street}, {user.address.city}, {user.address.zipcode}
      </Text>
    </View>
  );
};

export default UserCard;
