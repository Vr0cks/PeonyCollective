import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface SellStepBasicInfoProps {
  brand: string;
  setBrand: (text: string) => void;
  modelName: string;
  setModelName: (text: string) => void;
  category: string;
  setCategory: (text: string) => void;
  price: string;
  setPrice: (text: string) => void;
  onNext: () => void;
}

export const SellStepBasicInfo: React.FC<SellStepBasicInfoProps> = ({
  brand,
  setBrand,
  modelName,
  setModelName,
  category,
  setCategory,
  price,
  setPrice,
  onNext,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>1. Temel Bilgiler</Text>

      <Text style={styles.label}>Marka *</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: Hermès, Chanel, Rolex..."
        placeholderTextColor="#999"
        value={brand}
        onChangeText={setBrand}
      />

      <Text style={styles.label}>Model *</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: Birkin 25, Classic Flap, Submariner..."
        placeholderTextColor="#999"
        value={modelName}
        onChangeText={setModelName}
      />

      <Text style={styles.label}>Kategori *</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: Çanta, Saat, Takı..."
        placeholderTextColor="#999"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>İstenen Fiyat (TL) *</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: 250000"
        keyboardType="numeric"
        placeholderTextColor="#999"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>Devam Et</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37', // Gold accent
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#D4AF37',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
