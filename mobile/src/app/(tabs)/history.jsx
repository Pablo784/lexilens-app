import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Trash2 } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const HISTORY_KEY = "@lexilens_history";

export default function HistoryScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [history, setHistory] = useState([]);

  const loadHistory = useCallback(async () => {
    try {
      const storedHistory = await AsyncStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  }, []);

  useEffect(() => {
    loadHistory();
    // Reload history when screen comes into focus
    const interval = setInterval(loadHistory, 1000);
    return () => clearInterval(interval);
  }, [loadHistory]);

  const clearHistory = useCallback(() => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to delete all search history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem(HISTORY_KEY);
            setHistory([]);
          },
        },
      ],
    );
  }, []);

  const removeItem = useCallback(
    async (timestamp) => {
      const updatedHistory = history.filter(
        (item) => item.timestamp !== timestamp,
      );
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    },
    [history],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: insets.top,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 12,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 34,
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            History
          </Text>
          <Text style={{ fontSize: 15, color: "#8E8E93", marginTop: 4 }}>
            {history.length} {history.length === 1 ? "word" : "words"} searched
          </Text>
        </View>
        {history.length > 0 && (
          <TouchableOpacity
            onPress={clearHistory}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              backgroundColor: colors.surface,
            }}
          >
            <Text style={{ color: "#FF3B30", fontWeight: "600" }}>
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {history.length === 0 ? (
          <View style={{ marginTop: 100, paddingHorizontal: 40 }}>
            <Text
              style={{ color: "#8E8E93", textAlign: "center", fontSize: 16 }}
            >
              No search history yet
            </Text>
            <Text
              style={{
                color: "#8E8E93",
                textAlign: "center",
                fontSize: 14,
                marginTop: 12,
              }}
            >
              Words you search will appear here
            </Text>
          </View>
        ) : (
          history.map((item) => (
            <View
              key={item.timestamp}
              style={{
                borderRadius: 16,
                padding: 16,
                backgroundColor: colors.surface,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  // Navigate back to search with the word
                  router.push({
                    pathname: "/(tabs)/search",
                    params: { word: item.word },
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    color: colors.text,
                    textTransform: "capitalize",
                  }}
                >
                  {item.word}
                </Text>
                {item.phonetic && (
                  <Text
                    style={{ fontSize: 14, color: "#8E8E93", marginTop: 2 }}
                  >
                    {item.phonetic}
                  </Text>
                )}
                {item.partOfSpeech && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.primary,
                      marginTop: 4,
                      textTransform: "uppercase",
                      fontWeight: "600",
                    }}
                  >
                    {item.partOfSpeech}
                  </Text>
                )}
                <Text style={{ fontSize: 12, color: "#8E8E93", marginTop: 8 }}>
                  {new Date(item.timestamp).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeItem(item.timestamp)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: "#FF3B3020",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 12,
                }}
              >
                <Trash2 size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
