import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Linking,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Shield, ExternalLink } from "lucide-react-native";

export default function PrivacyConsentModal({ visible, onAccept, onDecline }) {
  const { colors } = useTheme();

  const openPrivacyPolicy = () => {
    Linking.openURL(`${process.env.EXPO_PUBLIC_BASE_URL}/privacy-policy`);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onDecline}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: colors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 20,
            paddingBottom: 40,
            maxHeight: "80%",
          }}
        >
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 20,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.surface,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Shield size={30} color={colors.primary} />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: colors.text,
                marginBottom: 8,
              }}
            >
              Privacy & Data Usage
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#8E8E93",
                textAlign: "center",
              }}
            >
              Please review how LexiLens uses your data
            </Text>
          </View>

          <ScrollView
            style={{ paddingHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.text,
                  marginBottom: 12,
                }}
              >
                What data we collect:
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.text,
                  lineHeight: 22,
                  marginBottom: 8,
                }}
              >
                • <Text style={{ fontWeight: "600" }}>Images:</Text> Photos you
                take or upload for word identification
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.text,
                  lineHeight: 22,
                  marginBottom: 8,
                }}
              >
                • <Text style={{ fontWeight: "600" }}>Text queries:</Text> Words
                you search for definitions
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.text,
                  lineHeight: 22,
                }}
              >
                • <Text style={{ fontWeight: "600" }}>Search history:</Text>{" "}
                Stored locally on your device only
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.text,
                  marginBottom: 12,
                }}
              >
                How we use your data:
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.text,
                  lineHeight: 22,
                  marginBottom: 8,
                }}
              >
                • Images and text are sent to{" "}
                <Text style={{ fontWeight: "600" }}>
                  third-party AI services
                </Text>{" "}
                (OpenAI GPT Vision) for word identification, example sentence
                generation, and usage scenario creation
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.text,
                  lineHeight: 22,
                  marginBottom: 8,
                }}
              >
                • Data is processed temporarily and{" "}
                <Text style={{ fontWeight: "600" }}>not stored</Text> by
                LexiLens servers
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: colors.text,
                  lineHeight: 22,
                }}
              >
                • Third-party AI services (OpenAI) provide{" "}
                <Text style={{ fontWeight: "600" }}>
                  the same or equal level of data protection
                </Text>{" "}
                as stated in our Privacy Policy and as required by Apple's App
                Store Guidelines
              </Text>
            </View>

            <TouchableOpacity
              onPress={openPrivacyPolicy}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 12,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: colors.primary,
                  marginRight: 6,
                }}
              >
                Read Full Privacy Policy
              </Text>
              <ExternalLink size={14} color={colors.primary} />
            </TouchableOpacity>
          </ScrollView>

          <View style={{ paddingHorizontal: 20, gap: 12 }}>
            <TouchableOpacity
              onPress={onAccept}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "#FFFFFF", fontSize: 17, fontWeight: "600" }}
              >
                Accept & Continue
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onDecline}
              style={{
                backgroundColor: colors.surface,
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: colors.text, fontSize: 17, fontWeight: "600" }}
              >
                Decline
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
