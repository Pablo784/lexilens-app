import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PRIVACY_CONSENT_KEY = "@lexilens_privacy_consent";

const PrivacyContext = createContext({
  hasConsent: false,
  setConsent: () => {},
  checkConsent: () => {},
});

export const PrivacyProvider = ({ children }) => {
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkConsent();
  }, []);

  const checkConsent = async () => {
    try {
      const consent = await AsyncStorage.getItem(PRIVACY_CONSENT_KEY);
      setHasConsent(consent === "true");
    } catch (error) {
      console.error("Failed to check privacy consent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setConsent = async (value) => {
    try {
      await AsyncStorage.setItem(PRIVACY_CONSENT_KEY, value.toString());
      setHasConsent(value);
    } catch (error) {
      console.error("Failed to save privacy consent:", error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <PrivacyContext.Provider value={{ hasConsent, setConsent, checkConsent }}>
      {children}
    </PrivacyContext.Provider>
  );
};

export const usePrivacy = () => useContext(PrivacyContext);
