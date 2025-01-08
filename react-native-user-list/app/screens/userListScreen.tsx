import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import UserCard from "../components/userCard";
import { useTailwind } from "tailwind-rn";
import { RootState, AppDispatch } from "../redux/store"; // Adjust paths as necessary
import { User } from "../types/types"; // Define the User type in your types file

const UserListScreen: React.FC = () => {
  const tailwind = useTailwind();
  const dispatch = useDispatch<AppDispatch>();
  const { data: users, loading } = useSelector(
    (state: RootState) => state.users
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [paginationLimit, setPaginationLimit] = useState<number>(5);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const filtered = users.filter((user: User) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setVisibleUsers(filtered.slice(0, paginationLimit));
  }, [users, searchQuery, paginationLimit]);

  const handleLoadMore = () => {
    setPaginationLimit((prev) => prev + 5);
  };

  const renderItem = ({ item }: { item: User }) => <UserCard user={item} />; // Correct typing

  return (
    <View style={tailwind("flex-1 p-4 bg-gray-100")}>
      <TextInput
        style={tailwind("mb-4 p-3 border border-gray-300 rounded-lg bg-white")}
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <View>
          <Text style={tailwind("text-center text-gray-500")}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={visibleUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      {paginationLimit < users.length && (
        <View style={tailwind("mt-4")}>
          <Button title="Load More" onPress={handleLoadMore} />
        </View>
      )}
    </View>
  );
};

export default UserListScreen;
