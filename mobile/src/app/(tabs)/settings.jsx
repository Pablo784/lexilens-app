import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { usePrivacy } from "../../context/PrivacyContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Moon, Sun, Shield, Trash2, ExternalLink } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrivacyConsentModal from "../../components/PrivacyConsentModal";

const HISTORY_KEY = "@lexilens_history";

export default function SettingsScreen() {
  const { isDark, toggleTheme, colors } = useTheme();
  const { hasConsent, setConsent } = usePrivacy();
  const insets = useSafeAreaInsets();
  const [showConsentModal, setShowConsentModal] = useState(false);

  const handleClearHistory = () => {
    Alert.alert(
      "Clear Search History",
      "Are you sure you want to delete all your search history? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(HISTORY_KEY);
              Alert.alert("Success", "Search history cleared");
            } catch (error) {
              Alert.alert("Error", "Failed to clear history");
            }
          },
        },
      ],
    );
  };

  const openPrivacyPolicy = () => {
    Linking.openURL(`${process.env.EXPO_PUBLIC_BASE_URL}/privacy-policy`);
  };

  const handlePrivacyToggle = (value) => {
    if (value) {
      setShowConsentModal(true);
    } else {
      Alert.alert(
        "Disable AI Features",
        "This will disable image scanning, example sentences, and usage scenarios. You can still search for definitions manually.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Disable",
            style: "destructive",
            onPress: () => setConsent(false),
          },
        ],
      );
    }
  };

  const handleAcceptConsent = () => {
    setConsent(true);
    setShowConsentModal(false);
  };

  const handleDeclineConsent = () => {
    setShowConsentModal(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: insets.top,
      }}
    >
      <PrivacyConsentModal
        visible={showConsentModal}
        onAccept={handleAcceptConsent}
        onDecline={handleDeclineConsent}
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 34,
              fontWeight: "bold",
              color: colors.text,
              marginBottom: 20,
            }}
          >
            Settings
          </Text>

          {/* Appearance Section */}
          <Text
            style={{
              fontSize: 13,
              color: "#8E8E93",
              paddingHorizontal: 16,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Appearance
          </Text>
          <View
            style={{
              borderRadius: 10,
              overflow: "hidden",
              backgroundColor: colors.surface,
              marginBottom: 32,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 16,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {isDark ? (
                  <Moon
                    size={22}
                    color={colors.primary}
                    style={{ marginRight: 12 }}
                  />
                ) : (
                  <Sun
                    size={22}
                    color={colors.primary}
                    style={{ marginRight: 12 }}
                  />
                )}
                <Text style={{ fontSize: 17, color: colors.text }}>
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: "#D1D1D6", true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Privacy & Data Section */}
          <Text
            style={{
              fontSize: 13,
              color: "#8E8E93",
              paddingHorizontal: 16,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Privacy & Data
          </Text>
          <View
            style={{
              borderRadius: 10,
              overflow: "hidden",
              backgroundColor: colors.surface,
              marginBottom: 32,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <Shield
                  size={22}
                  color={colors.primary}
                  style={{ marginRight: 12 }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: colors.text,
                      marginBottom: 2,
                    }}
                  >
                    AI Features
                  </Text>
                  <Text style={{ fontSize: 13, color: "#8E8E93" }}>
                    Image scanning, examples, scenarios
                  </Text>
                </View>
              </View>
              <Switch
                value={hasConsent}
                onValueChange={handlePrivacyToggle}
                trackColor={{ false: "#D1D1D6", true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <TouchableOpacity
              onPress={openPrivacyPolicy}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <Text style={{ fontSize: 17, color: colors.text }}>
                Privacy Policy
              </Text>
              <ExternalLink size={20} color="#8E8E93" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleClearHistory}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
              }}
            >
              <Trash2 size={22} color="#FF3B30" style={{ marginRight: 12 }} />
              <Text style={{ fontSize: 17, color: "#FF3B30" }}>
                Clear Search History
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 13,
                color: "#8E8E93",
                paddingHorizontal: 16,
                textAlign: "center",
              }}
            >
              LEXILENS VISUAL DICTIONARY
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#8E8E93",
                paddingHorizontal: 16,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              Your search history is stored locally on your device and never
              shared with third parties.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
