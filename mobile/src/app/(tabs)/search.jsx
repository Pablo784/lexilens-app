import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { useTheme } from "../../context/ThemeContext";
import { usePrivacy } from "../../context/PrivacyContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Camera,
  Image as ImageIcon,
  Search as SearchIcon,
  X,
  Lightbulb,
  ExternalLink,
  ShieldAlert,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import KeyboardAvoidingAnimatedView from "../../components/KeyboardAvoidingAnimatedView";
import PrivacyConsentModal from "../../components/PrivacyConsentModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";

const HISTORY_KEY = "@lexilens_history";

export default function SearchScreen() {
  const { colors } = useTheme();
  const { hasConsent, setConsent } = usePrivacy();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usageScenarios, setUsageScenarios] = useState([]);
  const [exampleSentence, setExampleSentence] = useState("");
  const [showConsentModal, setShowConsentModal] = useState(false);

  // Load word from params if coming from history
  useEffect(() => {
    if (params.word) {
      setWord(params.word);
      fetchDefinition(params.word);
    }
  }, [params.word]);

  const saveToHistory = async (wordData) => {
    try {
      const storedHistory = await AsyncStorage.getItem(HISTORY_KEY);
      let history = storedHistory ? JSON.parse(storedHistory) : [];

      // Don't add duplicates - remove if exists
      history = history.filter(
        (item) => item.word.toLowerCase() !== wordData.word.toLowerCase(),
      );

      // Add to beginning
      history.unshift({
        word: wordData.word,
        phonetic: wordData.phonetic || "",
        partOfSpeech: wordData.meanings[0]?.partOfSpeech || "",
        timestamp: Date.now(),
      });

      // Keep only last 50 items
      history = history.slice(0, 50);

      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save to history:", error);
    }
  };

  const generateUsageScenarios = async (wordForScenarios, definitionText) => {
    if (!hasConsent) return;

    try {
      const response = await fetch("/integrations/gpt-vision/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `For the word "${wordForScenarios}" with definition: "${definitionText}", provide exactly 3 common real-world scenarios where this word would be used. Format as a simple numbered list with each scenario on a new line. Keep each scenario to one short sentence (10-15 words max). Start each line with just the number and period.`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const scenarios = data.choices?.[0]?.message?.content?.trim();
      if (scenarios) {
        // Parse the numbered list
        const scenarioList = scenarios
          .split("\n")
          .filter((line) => line.trim())
          .map((line) => line.replace(/^\d+\.\s*/, "").trim())
          .filter((line) => line.length > 0)
          .slice(0, 3);
        setUsageScenarios(scenarioList);
      }
    } catch (error) {
      console.error("Failed to generate scenarios:", error);
    }
  };

  const generateExampleSentence = async (wordForSentence, definitionText) => {
    if (!hasConsent) return;

    try {
      const response = await fetch("/integrations/gpt-vision/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Create one natural, everyday example sentence using the word "${wordForSentence}" (definition: ${definitionText}). Make it relatable and conversational. Return only the sentence, nothing else.`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const sentence = data.choices?.[0]?.message?.content?.trim();
      if (sentence) {
        setExampleSentence(sentence.replace(/^["']|["']$/g, ""));
      }
    } catch (error) {
      console.error("Failed to generate sentence:", error);
    }
  };

  const fetchDefinition = async (searchWord) => {
    if (!searchWord.trim()) return;
    setLoading(true);
    setDefinition(null);
    setUsageScenarios([]);
    setExampleSentence("");

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord.trim().toLowerCase()}`,
      );
      if (!response.ok) {
        throw new Error("Word not found");
      }
      const data = await response.json();
      setDefinition(data[0]);

      // Save to history
      await saveToHistory(data[0]);

      // Get first meaning and definition
      const firstMeaning = data[0].meanings[0];
      const firstDefinition = firstMeaning?.definitions[0]?.definition || "";

      // Generate usage scenarios
      generateUsageScenarios(searchWord, firstDefinition);

      // Generate example sentence
      generateExampleSentence(searchWord, firstDefinition);
    } catch (error) {
      Alert.alert("Error", "Could not find definition for this word.");
    } finally {
      setLoading(false);
    }
  };

  const searchImagesOnline = (searchWord) => {
    const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchWord)}`;
    Linking.openURL(url);
  };

  const handleCamera = async () => {
    if (!hasConsent) {
      setShowConsentModal(true);
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need camera access to scan words.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      processImage(result.assets[0].base64);
    }
  };

  const handleGallery = async () => {
    if (!hasConsent) {
      setShowConsentModal(true);
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need gallery access to pick photos.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      processImage(result.assets[0].base64);
    }
  };

  const processImage = async (base64) => {
    setLoading(true);
    try {
      const response = await fetch("/integrations/gpt-vision/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Identify the main English word in this image. Return ONLY the word itself, nothing else.",
                },
                {
                  type: "image_url",
                  image_url: { url: `data:image/jpeg;base64,${base64}` },
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const identifiedWord = data.choices?.[0]?.message?.content
        ?.trim()
        .replace(/[^a-zA-Z]/g, "");

      if (identifiedWord) {
        setWord(identifiedWord);
        fetchDefinition(identifiedWord);
      } else {
        throw new Error("Could not identify word");
      }
    } catch (error) {
      Alert.alert(
        "Analysis Failed",
        "Sorry, I couldn't find a word in that image.",
      );
      setLoading(false);
    }
  };

  const handleAcceptConsent = () => {
    setConsent(true);
    setShowConsentModal(false);
  };

  const handleDeclineConsent = () => {
    setConsent(false);
    setShowConsentModal(false);
    Alert.alert(
      "AI Features Disabled",
      "You can still search for word definitions manually. AI features (image scanning, example sentences, usage scenarios) are disabled. You can change this in Settings.",
    );
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

      <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontSize: 34,
              fontWeight: "bold",
              color: colors.text,
              marginBottom: 8,
            }}
          >
            LexiLens
          </Text>
          <Text style={{ fontSize: 17, color: "#8E8E93", marginBottom: 30 }}>
            Visual Dictionary
          </Text>

          {!hasConsent && (
            <View
              style={{
                backgroundColor: "#FFF3CD",
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ShieldAlert
                size={24}
                color="#856404"
                style={{ marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#856404",
                    fontWeight: "600",
                    marginBottom: 4,
                  }}
                >
                  AI Features Disabled
                </Text>
                <Text style={{ fontSize: 13, color: "#856404" }}>
                  Enable in Settings to use image scanning and AI-powered
                  features
                </Text>
              </View>
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 12,
              marginBottom: 16,
              height: 50,
              backgroundColor: colors.surface,
            }}
          >
            <SearchIcon size={20} color="#8E8E93" style={{ marginLeft: 12 }} />
            <TextInput
              style={{
                flex: 1,
                paddingHorizontal: 12,
                fontSize: 16,
                height: "100%",
                color: colors.text,
              }}
              placeholder="What word do you need a definition of?"
              placeholderTextColor="#8E8E93"
              value={word}
              onChangeText={setWord}
              onSubmitEditing={() => fetchDefinition(word)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {word.length > 0 && (
              <TouchableOpacity
                onPress={() => setWord("")}
                style={{ padding: 8 }}
              >
                <X size={18} color="#8E8E93" />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ flexDirection: "row", gap: 12, marginBottom: 30 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 14,
                borderRadius: 12,
                backgroundColor: colors.primary,
              }}
              onPress={handleCamera}
            >
              <Camera size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text
                style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 15 }}
              >
                Scan Image
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 14,
                borderRadius: 12,
                backgroundColor: colors.surface,
              }}
              onPress={handleGallery}
            >
              <ImageIcon
                size={22}
                color={colors.primary}
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "600",
                  fontSize: 15,
                }}
              >
                Upload Photo
              </Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={{ marginTop: 40 }}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text
                style={{
                  textAlign: "center",
                  color: colors.text,
                  marginTop: 12,
                }}
              >
                Looking it up...
              </Text>
            </View>
          ) : definition ? (
            <View
              style={{
                borderRadius: 20,
                padding: 24,
                backgroundColor: colors.surface,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 3,
              }}
            >
              {/* Word Title */}
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    color: colors.text,
                    textTransform: "capitalize",
                  }}
                >
                  {definition.word}
                </Text>
                {definition.phonetic && (
                  <Text
                    style={{ fontSize: 18, color: "#8E8E93", marginTop: 4 }}
                  >
                    {definition.phonetic}
                  </Text>
                )}
              </View>

              {/* Search for images online suggestion for nouns */}
              {definition.meanings[0]?.partOfSpeech
                ?.toLowerCase()
                .includes("noun") && (
                <TouchableOpacity
                  onPress={() => searchImagesOnline(definition.word)}
                  style={{
                    marginBottom: 20,
                    padding: 16,
                    backgroundColor: colors.background,
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.primary,
                        fontWeight: "600",
                        marginBottom: 4,
                      }}
                    >
                      Want to see what it looks like?
                    </Text>
                    <Text style={{ fontSize: 13, color: "#8E8E93" }}>
                      Search for images of "{definition.word}" online
                    </Text>
                  </View>
                  <ExternalLink size={20} color={colors.primary} />
                </TouchableOpacity>
              )}

              {/* Example Sentence */}
              {exampleSentence && (
                <View
                  style={{
                    marginBottom: 24,
                    padding: 16,
                    backgroundColor: colors.background,
                    borderRadius: 12,
                    borderLeftWidth: 4,
                    borderLeftColor: colors.primary,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.primary,
                      fontWeight: "600",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    Example Sentence
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.text,
                      lineHeight: 24,
                      fontStyle: "italic",
                    }}
                  >
                    "{exampleSentence}"
                  </Text>
                </View>
              )}

              {/* Definitions */}
              {definition.meanings.map((meaning, index) => (
                <View key={index} style={{ marginBottom: 24 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: colors.primary,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      marginBottom: 8,
                    }}
                  >
                    {meaning.partOfSpeech}
                  </Text>
                  {meaning.definitions.slice(0, 2).map((def, defIndex) => (
                    <View key={defIndex} style={{ marginBottom: 12 }}>
                      <Text
                        style={{
                          fontSize: 17,
                          lineHeight: 24,
                          color: colors.text,
                        }}
                      >
                        • {def.definition}
                      </Text>
                      {def.example && (
                        <Text
                          style={{
                            fontSize: 15,
                            color: "#8E8E93",
                            fontStyle: "italic",
                            marginTop: 4,
                            paddingLeft: 12,
                          }}
                        >
                          "{def.example}"
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              ))}

              {/* Usage Scenarios */}
              {usageScenarios.length > 0 && (
                <View
                  style={{
                    marginTop: 8,
                    padding: 16,
                    backgroundColor: colors.background,
                    borderRadius: 12,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Lightbulb
                      size={18}
                      color={colors.primary}
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.primary,
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Common Usage Scenarios
                    </Text>
                  </View>
                  {usageScenarios.map((scenario, index) => (
                    <Text
                      key={index}
                      style={{
                        fontSize: 15,
                        color: colors.text,
                        lineHeight: 22,
                        marginBottom: 8,
                      }}
                    >
                      {index + 1}. {scenario}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View style={{ marginTop: 100, paddingHorizontal: 40 }}>
              <Text
                style={{ color: "#8E8E93", textAlign: "center", fontSize: 16 }}
              >
                What word do you need a definition of?
              </Text>
              <Text
                style={{
                  color: "#8E8E93",
                  textAlign: "center",
                  fontSize: 14,
                  marginTop: 12,
                }}
              >
                Try scanning an object or text with your camera!
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingAnimatedView>
    </View>
  );
}
